import { useState } from 'react'
import { API_BASE } from '../components/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setMsg(null)
    const body = new URLSearchParams()
    body.append('username', email)
    body.append('password', password)
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    })
    if (!res.ok) { setMsg('Login failed'); return }
    const data = await res.json()
    localStorage.setItem('ft_token', data.access_token)
    localStorage.setItem('ft_role', data.role)
    window.location.href = '/market'
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow max-w-md mx-auto mt-5">
      <h2 className="text-xl font-bold">Sign in</h2>
      <form onSubmit={submit} className="mt-3 space-y-3">
        <input className="w-full p-2 border border-border rounded-lg bg-background" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <input className="w-full p-2 border border-border rounded-lg bg-background" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="px-3 py-2 rounded-lg border border-border bg-background">Sign in</button>
      </form>
      {msg && <div className="mt-2">{msg}</div>}
    </div>
  )
}
