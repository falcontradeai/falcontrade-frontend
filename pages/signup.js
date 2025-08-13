import { useState } from 'react'
import { API_BASE } from '../components/api'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setMsg(null)
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (!res.ok) { setMsg('Signup failed'); return }
    setMsg('Signup success — now sign in.')
  }

  return (
    <div className="card" style={{maxWidth:500, margin:'20px auto'}}>
      <h2>Create account</h2>
      <form onSubmit={submit} className="space-y-2">
        <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Password (min 6)" value={password} onChange={e=>setPassword(e.target.value)} minLength={6} required />
        <button className="btn">Sign up</button>
      </form>
      {msg && <div className="mt-2">{msg}</div>}
    </div>
  )
}
