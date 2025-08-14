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
    <div className="bg-card border border-border rounded-xl p-4 shadow max-w-md mx-auto mt-5">
      <h2 className="text-xl font-bold">Create account</h2>
      <form onSubmit={submit} className="mt-3 space-y-3">
        <input className="w-full p-2 border border-border rounded-lg bg-background" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <input className="w-full p-2 border border-border rounded-lg bg-background" type="password" placeholder="Password (min 6)" value={password} onChange={e=>setPassword(e.target.value)} minLength={6} required />
        <button className="px-3 py-2 rounded-lg border border-border bg-background">Sign up</button>
      </form>
      {msg && <div className="mt-2">{msg}</div>}
    </div>
  )
}
