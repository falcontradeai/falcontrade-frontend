import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { API_BASE, authHeaders } from '../../components/api'
import Card from '../../components/Card'
import Button from '../../components/Button'

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

  if (!item) return <Card>Loading…</Card>

  return (
    <Card>
      <h2 className="text-xl font-bold">{item.title}</h2>
      <div className="px-2 py-1 rounded-full bg-background inline-block text-xs">{item.type}</div> <span>{item.category}</span>
      <div className="mt-2">Qty: {item.quantity} · Incoterm: {item.incoterm} · {item.country}{item.city?(', '+item.city):''}</div>
      <pre className="whitespace-pre-wrap bg-background p-3 rounded-lg mt-3">{JSON.stringify(item.details, null, 2)}</pre>

      <h3 className="mt-5 font-bold">Messages</h3>
      <ul>
        {msgs.map(m => <li key={m.id}><b>{m.sender_email}</b>: {m.body}</li>)}
      </ul>

      <form onSubmit={sendMsg} className="mt-3 space-y-3">
        <input className="w-full p-2 border border-border rounded-lg bg-background" placeholder="Write a message…" value={body} onChange={e=>setBody(e.target.value)} />
        <Button type="submit">Send</Button>
      </form>

      <form onSubmit={upload} className="mt-3 space-y-3">
        <input className="w-full p-2 border border-border rounded-lg bg-background" type="file" onChange={e=>setFile(e.target.files[0])} />
        <Button type="submit">Upload document</Button>
      </form>
    </Card>
  )
}
