import withSubscription from '../components/withSubscription'
import { useEffect, useState } from 'react'
import { API_BASE } from '../components/api'
import Card from '../components/Card'
import Button from '../components/Button'

function Market() {
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
    <Card>
      <h2 className="text-xl font-bold">Market</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        <select className="w-full p-2 border border-border rounded-lg bg-background" value={type} onChange={e=>setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="RFQ">Buy Needs (RFQ)</option>
          <option value="OFFER">Sell Offers</option>
        </select>
        <select className="w-full p-2 border border-border rounded-lg bg-background" value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {["fertilizer","grain","oils","textiles","panels","poultry","fruits","metals"].map(c=>(
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        <input className="w-full p-2 border border-border rounded-lg bg-background" placeholder="Search title…" value={q} onChange={e=>setQ(e.target.value)} />
        <Button onClick={load}>Search</Button>
      </div>
      <div className="overflow-x-auto mt-3">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="border-b border-border p-2">Type</th>
              <th className="border-b border-border p-2">Category</th>
              <th className="border-b border-border p-2">Title</th>
              <th className="border-b border-border p-2">Qty</th>
              <th className="border-b border-border p-2">Incoterm</th>
              <th className="border-b border-border p-2">Country</th>
            </tr>
          </thead>
          <tbody>
            {items.map(it => (
              <tr key={it.id} className="border-b border-border">
                <td className="p-2"><span className="px-2 py-1 rounded-full bg-background text-xs">{it.type}</span></td>
                <td className="p-2">{it.category}</td>
                <td className="p-2"><a href={`/listing/${it.id}`}>{it.title}</a></td>
                <td className="p-2">{it.quantity}</td>
                <td className="p-2">{it.incoterm}</td>
                <td className="p-2">{it.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default withSubscription(Market)
