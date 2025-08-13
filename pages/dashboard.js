
import { useEffect, useState } from 'react'
import { API_BASE } from '@/components/api'

function isAuthed() {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem('ft_token')
}

export default function Dashboard() {
  const [commodities, setCommodities] = useState([])
  const [fx, setFx] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('ft_fx') || '1.7' : '1.7'))
  const [freight, setFreight] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('ft_freight') || '45' : '45'))
  const [customs, setCustoms] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('ft_customs') || '10' : '10'))
  const [updatedAt, setUpdatedAt] = useState(null)

  useEffect(() => {
    if (!isAuthed()) return
    fetch(`${API_BASE}/commodities`).then(r => r.json()).then(data => {
      setCommodities(data); setUpdatedAt(new Date().toISOString())
    })
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ft_fx', fx)
      localStorage.setItem('ft_freight', freight)
      localStorage.setItem('ft_customs', customs)
    }
  }, [fx, freight, customs])

  if (!isAuthed()) {
    return (
      <div className="container">
        <div className="card mt-8">
          <div className="text-lg">Please <a className="text-blue-600 underline" href="/login">sign in</a> to view the dashboard.</div>
        </div>
      </div>
    )
  }

  const cifUSD = (price) => {
    const f = parseFloat(freight || '0')
    const ins = price * 0.01
    const cs = price * (parseFloat(customs || '0') / 100)
    return Number(price + f + ins + cs).toFixed(2)
  }
  const cifAZN = (price) => (parseFloat(cifUSD(price)) * parseFloat(fx || '1')).toFixed(2)

  return (
    <div className="container space-y-6 mt-6">
      <div className="badge">API: {API_BASE}</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div><label className="text-sm text-gray-600">FX USD→AZN</label><input className="input" value={fx} onChange={e=>setFx(e.target.value)} /></div>
        <div><label className="text-sm text-gray-600">Freight $/ton</label><input className="input" value={freight} onChange={e=>setFreight(e.target.value)} /></div>
        <div><label className="text-sm text-gray-600">Customs %</label><input className="input" value={customs} onChange={e=>setCustoms(e.target.value)} /></div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-2">Prices</h2>
        <table className="table">
          <thead><tr><th>Commodity</th><th>Unit</th><th>Price</th><th>Source</th><th>CIF (USD)</th><th>CIF (AZN)</th></tr></thead>
          <tbody>
            {commodities.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td><td>{c.unit}</td><td>${c.price}</td><td>{c.source}</td>
                <td>${cifUSD(c.price)}</td><td>{cifAZN(c.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-xs text-gray-500 mt-2">Last updated: {updatedAt ? new Date(updatedAt).toLocaleString() : '—'}</div>
      </div>
    </div>
  )
}
