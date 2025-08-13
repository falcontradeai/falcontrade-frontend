import { useEffect, useState } from 'react'
import { API_BASE } from '../components/api'

export default function Market() {
  const [items, setItems] = useState([])
  const [type, setType] = useState('')
  const [category, setCategory] = useState('')
  const [q, setQ] = useState('')

  const load = async () => {
    const params = new URLSearchParams()
    if (type) params.append('type', type)
    if (category) params.append('category', category)
    if (q) params.append('q', q)
    const res = await fetch(`${API_BASE}/market?`+params.toString())
    const data = await res.json()
    setItems(data)
  }

  useEffect(()=>{ load() }, [])

  return (
    <div className="card">
      <h2 className="text-xl">Market</h2>
      <div className="row" style={{marginTop:12}}>
        <select className="select" value={type} onChange={e=>setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="RFQ">Buy Needs (RFQ)</option>
          <option value="OFFER">Sell Offers</option>
        </select>
        <select className="select" value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {["fertilizer","grain","oils","textiles","panels","poultry","fruits","metals"].map(c=>(
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="row" style={{marginTop:12}}>
        <input className="input" placeholder="Search title…" value={q} onChange={e=>setQ(e.target.value)} />
        <button className="btn" onClick={load}>Search</button>
      </div>
      <table className="table" style={{marginTop:12}}>
        <thead><tr><th>Type</th><th>Category</th><th>Title</th><th>Qty</th><th>Incoterm</th><th>Country</th></tr></thead>
        <tbody>
          {items.map(it => (
            <tr key={it.id}>
              <td><span className="badge">{it.type}</span></td>
              <td>{it.category}</td>
              <td><a href={`/listing/${it.id}`}>{it.title}</a></td>
              <td>{it.quantity}</td>
              <td>{it.incoterm}</td>
              <td>{it.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
