import { useState } from 'react'
import { API_BASE, authHeaders } from '../../components/api'

export default function NewRFQ() {
  const [form, setForm] = useState({ category:'grain', title:'', quantity:'', incoterm:'', country:'', city:'' })
  const [details, setDetails] = useState({})
  const [msg, setMsg] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API_BASE}/listings`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json', ...authHeaders() },
      body: JSON.stringify({ type:'RFQ', ...form, details })
    })
    const data = await res.json()
    if (!res.ok) { setMsg(data.detail || 'Failed (login?)'); return }
    setMsg('Created RFQ (draft). Ask admin to publish.')
  }

  return (
    <div className="card">
      <h2>Post a Need (RFQ)</h2>
      <form onSubmit={submit} className="space-y-2">
        <div className="row">
          <select className="select" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}>
            {["fertilizer","grain","oils","textiles","panels","poultry","fruits","metals"].map(c=>(<option key={c} value={c}>{c}</option>))}
          </select>
          <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
        </div>
        <div className="row">
          <input className="input" placeholder="Quantity (e.g., 100 MT)" value={form.quantity} onChange={e=>setForm({...form, quantity:e.target.value})} />
          <input className="input" placeholder="Incoterm (FOB/CIF…)" value={form.incoterm} onChange={e=>setForm({...form, incoterm:e.target.value})} />
        </div>
        <div className="row">
          <input className="input" placeholder="Country" value={form.country} onChange={e=>setForm({...form, country:e.target.value})} />
          <input className="input" placeholder="City/Port" value={form.city} onChange={e=>setForm({...form, city:e.target.value})} />
        </div>
        <textarea className="textarea" rows={6} placeholder="Details JSON (e.g., {"grade":"A","moisture":"12%"})" onChange={e=>{
          try { setDetails(JSON.parse(e.target.value||'{}')); } catch {}
        }} />
        <button className="btn">Create RFQ</button>
      </form>
      {msg && <div className="mt-2">{msg}</div>}
    </div>
  )
}
