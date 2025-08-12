import { useState } from 'react'
import { API_BASE } from '@/components/api'

export default function Login() {
  const [email, setEmail] = useState('admin@falcontrade.org')
  const [password, setPassword] = useState('admin123')
  const [msg, setMsg] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    const form = new URLSearchParams()
    form.append('username', email)
    form.append('password', password)
    const res = await fetch(`${API_BASE}/auth/login`, { method: 'POST', body: form })
    if (!res.ok) { setMsg('Login failed'); return }
    const data = await res.json()
    localStorage.setItem('ft_token', data.access_token)
    setMsg('Login success — token saved. Go to Admin.')
  }

  return (
    <div className="card max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <div><label className="text-sm text-gray-600">Email</label><input className="input" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><label className="text-sm text-gray-600">Password</label><input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
      {msg && <div className="mt-3 text-sm text-gray-700">{msg}</div>}
    </div>
  )
}