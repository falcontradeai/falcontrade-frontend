import { useState } from 'react'
import { API_BASE } from '../components/api'
import Card from '../components/Card'
import Button from '../components/Button'

export default function Signup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [company, setCompany] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const [status, setStatus] = useState(null) // 'success' | 'error'

  const submit = async (e) => {
    e.preventDefault()
    setMsg(null)
    setStatus(null)

    // basic client-side validation
    if (company.trim().length < 2) {
      setMsg('Company name must be at least 2 characters')
      setStatus('error')
      return
    }
    if (!/^\d+\s.+/.test(address.trim())) {
      setMsg('Address must include a street number')
      setStatus('error')
      return
    }

    try {
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
      if (!res.ok) {
        let data = {}
        try {
          data = await res.json()
        } catch (err) {}
        setMsg(data.detail || data.error || 'Signup failed')
        setStatus('error')
        return
      }
      setMsg('Signup success — now sign in.')
      setStatus('success')
    } catch (err) {
      setMsg('Network error')
      setStatus('error')
    }
  }

  return (
    <Card className="max-w-lg mx-auto mt-5">
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
        <Button className="w-full" type="submit">
          Sign up
        </Button>
      </form>
      {msg && (
        <div
          className={`mt-2 text-center ${
            status === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {msg}
        </div>
      )}
    </Card>
  )
}
