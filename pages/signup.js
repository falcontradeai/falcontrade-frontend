
import { useState } from 'react'
import { API_BASE } from '@/components/api'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setMsg(null)
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) throw new Error('Sign up failed')
      setMsg('Account created. You can now sign in.')
    } catch (e) {
      setMsg(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="card max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-semibold mb-4">Create your account</h1>
        <form onSubmit={submit} className="space-y-3">
          <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button className="btn btn-primary" disabled={loading}>{loading?'Creating…':'Sign up'}</button>
        </form>
        {msg && <div className="text-sm text-gray-700 mt-3">{msg}</div>}
      </div>
    </div>
  )
}
