import { useEffect, useState } from 'react'
import AccessDenied from './access-denied'
import { API_BASE } from '@/components/api'

function authHeaders() {
  if (typeof window === 'undefined') return {}
  const t = localStorage.getItem('ft_token')
  return t ? { Authorization: `Bearer ${t}` } : {}
}

async function fetchJSON(url, opts = {}) {
  const res = await fetch(url, opts)
  const ct = res.headers.get('content-type') || ''
  let data = null
  try { data = ct.includes('application/json') ? await res.json() : await res.text() } catch {}
  return { ok: res.ok, status: res.status, data }
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      // No token? deny immediately.
      if (typeof window === 'undefined' || !localStorage.getItem('ft_token')) {
        if (mounted) { setIsAdmin(false); setLoading(false) }
        return
      }
      const { ok, data } = await fetchJSON(`${API_BASE}/me`, { headers: { ...authHeaders() } })
      if (mounted) {
        setIsAdmin(!!ok && data && data.is_admin === true)
        setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  // While checking, render nothing (prevents any flash of admin UI)
  if (loading) return null

  // Not admin → hard block
  if (!isAdmin) return <AccessDenied />

  // --- Admin content below (only renders for confirmed admins) ---
  return (
    <div className="container">
      <h1 className="text-2xl font-semibold mt-6 mb-4">Admin Dashboard</h1>
      <Tabs />
    </div>
  )
}

function Tabs() {
  const [tab, setTab] = useState('Users')
  const labels = ['Users','Commodities (AI)','Subscriptions','Alerts']
  return (
    <>
      <div className="flex gap-2">
        {labels.map(l => (
          <button key={l} className={'btn ' + (tab===l ? 'btn-primary text-white' : '')} onClick={()=>setTab(l)}>{l}</button>
        ))}
      </div>
      <div className="mt-4">
        {tab==='Users' && <UsersTab/>}
        {tab==='Commodities (AI)' && <CommoditiesAITab/>}
        {tab==='Subscriptions' && <SubsTab/>}
        {tab==='Alerts' && <AlertsTab/>}
      </div>
    </>
  )
}

function UsersTab() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch(`${API_BASE}/users`, { headers: { ...authHeaders() } })
      .then(r => r.json()).then(setUsers).catch(()=>setUsers([]))
  }, [])
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-2">Users</h2>
      <p className="text-xs text-gray-500 mb-3">Passwords are never stored or shown in plain text. Hashes only.</p>
      <table className="table">
        <thead><tr><th>ID</th><th>Email</th><th>Admin</th><th>Password (hash)</th></tr></thead>
        <tbody>
          {users.map(u=>(
            <tr key={u.id}>
              <td>{u.id}</td><td>{u.email}</td><td>{String(u.is_admin)}</td>
              <td className="text-xs break-all">{u.password_hash || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CommoditiesAITab() {
  const [prompt, setPrompt] = useState('Top traded grains in the region')
  const [result, setResult] = useState([])
  const runAI = async () => {
    const { ok, data } = await fetchJSON(`${API_BASE}/commodities/ai-add`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json', ...authHeaders() },
      body: JSON.stringify({ prompt })
    })
    setResult(ok && data?.items ? data.items : [])
  }
  return (
    <div className="card space-y-3">
      <h2 className="text-xl font-semibold">AI Commodity Add</h2>
      <div className="flex gap-2">
        <input className="input" value={prompt} onChange={e=>setPrompt(e.target.value)} />
        <button className="btn btn-primary" onClick={runAI}>Generate</button>
      </div>
      <table className="table">
        <thead><tr><th>Name</th><th>Unit</th><th>Price</th><th>Source</th></tr></thead>
        <tbody>
          {result.map((r,i)=>(
            <tr key={i}><td>{r.name}</td><td>{r.unit}</td><td>{r.price}</td><td>{r.source}</td></tr>
          ))}
        </tbody>
      </table>
      <div className="text-xs text-gray-500 mt-2">Placeholder data — we’ll wire real sources next.</div>
    </div>
  )
}

function SubsTab() {
  const [stats, setStats] = useState(null)
  useEffect(() => {
    fetch(`${API_BASE}/stats/subscriptions`, { headers: { ...authHeaders() } })
      .then(r => r.json()).then(setStats).catch(()=>setStats(null))
  }, [])
  if (!stats) return <div className="card">Loading…</div>
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-2">Subscriptions</h2>
      <ul className="list-disc ml-5">
        <li>Active subscribers: {stats.active}</li>
        <li>MRR (USD): ${stats.mrr_usd}</li>
        <li>ARPU (USD): ${stats.arpu_usd}</li>
      </ul>
    </div>
  )
}

function AlertsTab() {
  const [alerts, setAlerts] = useState([])
  useEffect(() => {
    fetch(`${API_BASE}/alerts/supplychain`, { headers: { ...authHeaders() } })
      .then(r => r.json()).then(d => setAlerts(d.alerts || [])).catch(()=>setAlerts([]))
  }, [])
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-2">Supply Chain Alerts</h2>
      <ul className="list-disc ml-5 space-y-1">
        {alerts.map((a,i)=>(
          <li key={i}><b>{a.headline}</b> — <span className="text-gray-600">{a.detail}</span></li>
        ))}
      </ul>
    </div>
  )
}
