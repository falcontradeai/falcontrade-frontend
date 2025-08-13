import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { API_BASE, authHeaders } from '../../components/api'

export default function Listing() {
  const router = useRouter()
  const { id } = router.query
  const [item, setItem] = useState(null)
  const [msgs, setMsgs] = useState([])
  const [body, setBody] = useState('')
  const [file, setFile] = useState(null)

  const load = async () => {
    if (!id) return
    const r1 = await fetch(`${API_BASE}/listings/${id}`)
    if (r1.ok) setItem(await r1.json())
    const r2 = await fetch(`${API_BASE}/listings/${id}/messages`, { headers: { ...authHeaders() } })
    if (r2.ok) setMsgs(await r2.json())
  }

  useEffect(()=>{ load() }, [id])

  const sendMsg = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API_BASE}/listings/${id}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ body })
    })
    if (res.ok) { setBody(''); load() }
    else alert('Login required to message')
  }

  const upload = async (e) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch(`${API_BASE}/listings/${id}/attachments`, {
      method: 'POST',
      headers: { ...authHeaders() },
      body: fd
    })
    if (res.ok) { alert('Uploaded'); setFile(null) } else alert('Upload failed (login?)')
  }

  if (!item) return <div className="card">Loading…</div>

  return (
    <div className="card">
      <h2>{item.title}</h2>
      <div className="badge">{item.type}</div> <span>{item.category}</span>
      <div className="mt-2">Qty: {item.quantity} · Incoterm: {item.incoterm} · {item.country}{item.city?(', '+item.city):''}</div>
      <pre style={{whiteSpace:'pre-wrap', background:'#0b1220', padding:12, borderRadius:10, marginTop:10}}>{JSON.stringify(item.details, null, 2)}</pre>

      <h3 style={{marginTop:20}}>Messages</h3>
      <ul>
        {msgs.map(m => <li key={m.id}><b>{m.sender_email}</b>: {m.body}</li>)}
      </ul>

      <form onSubmit={sendMsg} style={{marginTop:10}}>
        <input className="input" placeholder="Write a message…" value={body} onChange={e=>setBody(e.target.value)} />
        <button className="btn" style={{marginTop:8}}>Send</button>
      </form>

      <form onSubmit={upload} style={{marginTop:10}}>
        <input className="input" type="file" onChange={e=>setFile(e.target.files[0])} />
        <button className="btn" style={{marginTop:8}}>Upload document</button>
      </form>
    </div>
  )
}
