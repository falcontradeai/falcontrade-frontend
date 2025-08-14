import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import api from '@/components/api'

export default function AdminUsers() {
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ email: '', role: '' })

  const isAdmin = () => typeof window !== 'undefined' && localStorage.getItem('role') === 'admin'

  useEffect(() => {
    if (isAdmin()) {
      fetchUsers()
    } else if (typeof window !== 'undefined') {
      router.replace('/')
    }
  }, [router])

  const fetchUsers = async () => {
    if (!isAdmin()) return
    const res = await api.get('/admin/users')
    setUsers(res.data || [])
  }

  const createUser = async (e) => {
    e.preventDefault()
    if (!isAdmin()) return
    await api.post('/admin/users', form)
    setForm({ email: '', role: '' })
    fetchUsers()
  }

  const updateUser = async (id, payload) => {
    if (!isAdmin()) return
    await api.put(`/admin/users/${id}`, payload)
    fetchUsers()
  }

  const deleteUser = async (id) => {
    if (!isAdmin()) return
    await api.delete(`/admin/users/${id}`)
    fetchUsers()
  }

  return (
    <div>
      <h1 className="text-xl font-bold">Users</h1>
      <form onSubmit={createUser} className="mt-4 space-y-2">
        <input className="border p-2" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="border p-2" placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
        <button className="px-3 py-1 border">Create</button>
      </form>
      <ul className="mt-4 space-y-2">
        {users.map(user => (
          <li key={user.id} className="flex space-x-2 items-center">
            <input
              className="border p-1 flex-1"
              value={user.email || ''}
              onChange={e =>
                setUsers(users.map(u => u.id === user.id ? { ...u, email: e.target.value } : u))
              }
            />
            <input
              className="border p-1 w-24"
              value={user.role || ''}
              onChange={e =>
                setUsers(users.map(u => u.id === user.id ? { ...u, role: e.target.value } : u))
              }
            />
            <button className="px-2 py-1 border" onClick={() => updateUser(user.id, { email: user.email, role: user.role })}>Update</button>
            <button className="px-2 py-1 border" onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
