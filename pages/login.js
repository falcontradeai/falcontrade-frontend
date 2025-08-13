
import { useState } from 'react'
import { API_BASE } from '@/components/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setMsg(null)
    try {
      const body = new URLSearchParams()
      body.append('username', email)
      body.append('password', password)
      const res = await fetch(`${API_BASE}/auth/login`, { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body })
      if (!res.ok) throw new Error('Login failed')
      const data = await res.json()
      localStorage.setItem('ft_token', data.access_token)
      setMsg('Login success — go to Dashboard or Admin.')
    } catch (e) {
      setMsg(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="card max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
        <form onSubmit={submit} className="space-y-3">
          <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button className="btn btn-primary" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
        </form>
        {msg && <div className="text-sm text-gray-700 mt-3">{msg}</div>}
      </div>
    </div>
  )
}
