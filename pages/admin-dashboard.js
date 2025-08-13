
import { useEffect, useState } from 'react'
import { API_BASE, authHeaders } from '@/components/api'

function Tab({label, active, onClick}){
  return <button className={"btn " + (active?'btn-primary text-white':'')} onClick={onClick}>{label}</button>
}

export default function AdminDash(){
  const [tab, setTab] = useState('Users')
  return (
    <div className="container">
      <div className="flex gap-2 mt-6">
        {['Users','Commodities (AI)','Subscriptions','Alerts'].map(t => (
          <Tab key={t} label={t} active={tab===t} onClick={()=>setTab(t)} />
        ))}
      </div>
      <div className="mt-4">
        {tab==='Users' && <UsersTab/>}
        {tab==='Commodities (AI)' && <CommoditiesAITab/>}
        {tab==='Subscriptions' && <SubsTab/>}
        {tab==='Alerts' && <AlertsTab/>}
      </div>
    </div>
  )
}

function UsersTab(){
  const [users, setUsers] = useState([])
  const load = async () => {
    const res = await fetch(`${API_BASE}/users`, { headers: { ...authHeaders() } })
    const data = await res.json()
    setUsers(data)
  }
  useEffect(()=>{ load() }, [])

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-2">Users</h2>
      <p className="text-xs text-gray-500 mb-3">For security, passwords are never stored or shown in plain text. We display hashed passwords only.</p>
      <table className="table">
        <thead><tr><th>ID</th><th>Email</th><th>Is Admin</th><th>Password (hash)</th></tr></thead>
        <tbody>
          {users.map(u => (<tr key={u.id}><td>{u.id}</td><td>{u.email}</td><td>{String(u.is_admin)}</td><td className="text-xs break-all">{u.password_hash || '—'}</td></tr>))}
        </tbody>
      </table>
    </div>
  )
}

function CommoditiesAITab(){
  const [prompt, setPrompt] = useState('Top traded grains in the region')
  const [result, setResult] = useState([])
  const runAI = async () => {
    const res = await fetch(`${API_BASE}/commodities/ai-add`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json', ...authHeaders() },
      body: JSON.stringify({ prompt })
    })
    const data = await res.json()
    setResult(data.items || [])
  }
  return (
    <div className="card space-y-3">
      <h2 className="text-xl font-semibold">AI Commodity Add</h2>
      <div className="flex gap-2">
        <input className="input" value={prompt} onChange={e=>setPrompt(e.target.value)} />
        <button className="btn btn-primary" onClick={runAI}>Generate</button>
      </div>
      <div>
        <table className="table">
          <thead><tr><th>Name</th><th>Unit</th><th>Price</th><th>Source</th></tr></thead>
          <tbody>
            {result.map((r,i)=>(<tr key={i}><td>{r.name}</td><td>{r.unit}</td><td>{r.price}</td><td>{r.source}</td></tr>))}
          </tbody>
        </table>
        <div className="text-xs text-gray-500 mt-2">This is a placeholder response; we’ll connect real AI sources next.</div>
      </div>
    </div>
  )
}

function SubsTab(){
  const [stats, setStats] = useState(null)
  useEffect(()=>{
    fetch(`${API_BASE}/stats/subscriptions`, { headers: { ...authHeaders() } })
      .then(r=>r.json()).then(setStats)
  },[])
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-2">Subscriptions</h2>
      {stats ? (
        <ul className="list-disc ml-5">
          <li>Active subscribers: {stats.active}</li>
          <li>MRR (USD): ${stats.mrr_usd}</li>
          <li>ARPU (USD): ${stats.arpu_usd}</li>
        </ul>
      ) : 'Loading…'}
    </div>
  )
}

function AlertsTab(){
  const [alerts, setAlerts] = useState([])
  useEffect(()=>{
    fetch(`${API_BASE}/alerts/supplychain`, { headers: { ...authHeaders() } })
      .then(r=>r.json()).then(d=>setAlerts(d.alerts||[]))
  },[])
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-2">Supply Chain Alerts</h2>
      <ul className="list-disc ml-5 space-y-1">
        {alerts.map((a,i)=>(<li key={i}><b>{a.headline}</b> — <span className="text-gray-600">{a.detail}</span></li>))}
      </ul>
      <div className="text-xs text-gray-500 mt-2">Placeholder alerts; we’ll wire real feeds (ports, customs, freight) next.</div>
    </div>
  )
}
