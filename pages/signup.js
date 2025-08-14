import { useState } from 'react'
import { API_BASE } from '../components/api'

export default function Signup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [company, setCompany] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setMsg(null)
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        company,
        address,
      })
    })
    if (!res.ok) { setMsg('Signup failed'); return }
    setMsg('Signup success — now sign in.')
  }

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow max-w-lg mx-auto mt-5">
      <h2 className="text-2xl font-bold text-center">Create account</h2>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <div className="flex space-x-3">
          <input
            className="w-1/2 p-2 border border-border rounded-lg bg-background"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <input
            className="w-1/2 p-2 border border-border rounded-lg bg-background"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
        </div>
        <input
          className="w-full p-2 border border-border rounded-lg bg-background"
          type="text"
          placeholder="Company"
          value={company}
          onChange={e => setCompany(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border border-border rounded-lg bg-background"
          type="text"
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border border-border rounded-lg bg-background"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border border-border rounded-lg bg-background"
          type="password"
          placeholder="Password (min 6)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          minLength={6}
          required
        />
        <button className="w-full px-3 py-2 rounded-lg border border-border bg-background hover:bg-accent transition">
          Sign up
        </button>
      </form>
      {msg && <div className="mt-2 text-center">{msg}</div>}
    </div>
  )
}
