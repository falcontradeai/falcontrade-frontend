import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function AdminAlerts() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('role')
      if (role !== 'admin') {
        router.replace('/')
      }
    }
  }, [router])

  return (
    <div>
      <h1>Alerts</h1>
      <p>Stub page for managing alerts.</p>
    </div>
  )
}
