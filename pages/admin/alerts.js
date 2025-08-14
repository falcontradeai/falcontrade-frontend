import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import api from '@/components/api'

export default function AdminAlerts() {
  const router = useRouter()
  const [alerts, setAlerts] = useState([])
  const [form, setForm] = useState({ message: '' })

  const isAdmin = () => typeof window !== 'undefined' && localStorage.getItem('role') === 'admin'

  useEffect(() => {
    if (isAdmin()) {
      fetchAlerts()
    } else if (typeof window !== 'undefined') {
      router.replace('/')
    }
  }, [router])

  const fetchAlerts = async () => {
    if (!isAdmin()) return
    const res = await api.get('/admin/alerts')
    setAlerts(res.data || [])
  }

  const createAlert = async (e) => {
    e.preventDefault()
    if (!isAdmin()) return
    await api.post('/admin/alerts', form)
    setForm({ message: '' })
    fetchAlerts()
  }

  const updateAlert = async (id, message) => {
    if (!isAdmin()) return
    await api.put(`/admin/alerts/${id}`, { message })
    fetchAlerts()
  }

  const deleteAlert = async (id) => {
    if (!isAdmin()) return
    await api.delete(`/admin/alerts/${id}`)
    fetchAlerts()
  }

  return (
    <div>
      <h1 className="text-xl font-bold">Alerts</h1>
      <form onSubmit={createAlert} className="mt-4 space-y-2">
        <input
          className="border p-2"
          placeholder="Message"
          value={form.message}
          onChange={e => setForm({ message: e.target.value })}
        />
        <button className="px-3 py-1 border">Create</button>
      </form>
      <ul className="mt-4 space-y-2">
        {alerts.map(alert => (
          <li key={alert.id} className="flex space-x-2 items-center">
            <input
              className="border p-1 flex-1"
              value={alert.message || ''}
              onChange={e =>
                setAlerts(alerts.map(a => a.id === alert.id ? { ...a, message: e.target.value } : a))
              }
            />
            <button className="px-2 py-1 border" onClick={() => updateAlert(alert.id, alert.message)}>Update</button>
            <button className="px-2 py-1 border" onClick={() => deleteAlert(alert.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
