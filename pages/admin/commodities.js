import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import api from '@/components/api'

export default function AdminCommodities() {
  const router = useRouter()
  const [commodities, setCommodities] = useState([])
  const [form, setForm] = useState({ name: '' })

  const isAdmin = () => typeof window !== 'undefined' && localStorage.getItem('role') === 'admin'

  useEffect(() => {
    if (isAdmin()) {
      fetchCommodities()
    } else if (typeof window !== 'undefined') {
      router.replace('/')
    }
  }, [router])

  const fetchCommodities = async () => {
    if (!isAdmin()) return
    const res = await api.get('/admin/commodities')
    setCommodities(res.data || [])
  }

  const createCommodity = async (e) => {
    e.preventDefault()
    if (!isAdmin()) return
    await api.post('/admin/commodities', form)
    setForm({ name: '' })
    fetchCommodities()
  }

  const updateCommodity = async (id, name) => {
    if (!isAdmin()) return
    await api.put(`/admin/commodities/${id}`, { name })
    fetchCommodities()
  }

  const deleteCommodity = async (id) => {
    if (!isAdmin()) return
    await api.delete(`/admin/commodities/${id}`)
    fetchCommodities()
  }

  return (
    <div>
      <h1 className="text-xl font-bold">Commodities</h1>
      <form onSubmit={createCommodity} className="mt-4 space-y-2">
        <input className="border p-2" placeholder="Name" value={form.name} onChange={e => setForm({ name: e.target.value })} />
        <button className="px-3 py-1 border">Create</button>
      </form>
      <ul className="mt-4 space-y-2">
        {commodities.map(item => (
          <li key={item.id} className="flex space-x-2 items-center">
            <input
              className="border p-1 flex-1"
              value={item.name || ''}
              onChange={e =>
                setCommodities(commodities.map(c => c.id === item.id ? { ...c, name: e.target.value } : c))
              }
            />
            <button className="px-2 py-1 border" onClick={() => updateCommodity(item.id, item.name)}>Update</button>
            <button className="px-2 py-1 border" onClick={() => deleteCommodity(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
