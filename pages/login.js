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
    window.location.href = '/market'
  }

  return (
    <div className="card" style={{maxWidth:500, margin:'20px auto'}}>
      <h2>Sign in</h2>
      <form onSubmit={submit} className="space-y-2">
        <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="btn">Sign in</button>
      </form>
      {msg && <div className="mt-2">{msg}</div>}
    </div>
  )
}
