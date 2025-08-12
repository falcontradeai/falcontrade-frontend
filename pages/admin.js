import { useEffect, useState } from 'react'
import { API_BASE, authHeaders } from '@/components/api'

export default function Admin() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name:'', unit:'$/ton', price:'', source:'manual' })
  const [message, setMessage] = useState(null)

  const load = async () => {
    const res = await fetch(`${API_BASE}/commodities`)
    const data = await res.json()
    setItems(data)
  }
  useEffect(()=>{ load() }, [])

  const create = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API_BASE}/commodities`, {
      method:'POST',
      headers: { 'Content-Type':'application/json', ...authHeaders() },
      body: JSON.stringify({ ...form, price: parseFloat(form.price || '0') })
    })
    if (!res.ok) { setMessage('Create failed (are you logged in as admin?)'); return }
    setForm({ name:'', unit:'$/ton', price:'', source:'manual' })
    setMessage('Created'); load()
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-semibold mb-4">Admin — Commodities</h1>
        <form onSubmit={create} className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          <input className="input" placeholder="Unit" value={form.unit} onChange={e=>setForm({...form, unit:e.target.value})} />
          <input className="input" placeholder="Price" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} />
          <input className="input" placeholder="Source" value={form.source} onChange={e=>setForm({...form, source:e.target.value})} />
          <button className="btn btn-primary" type="submit">Add</button>
        </form>
        {message && <div className="text-sm text-gray-600 mt-2">{message}</div>}
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-2">Current List</h2>
        <table className="table">
          <thead><tr><th>Name</th><th>Unit</th><th>Price</th><th>Source</th></tr></thead>
          <tbody>
            {items.map(x => (
              <tr key={x.id}><td>{x.name}</td><td>{x.unit}</td><td>${x.price}</td><td>{x.source}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}