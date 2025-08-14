import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('ft_role')
      if (role !== 'admin') {
        router.replace('/')
      }
    }
  }, [router])

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard.</p>
    </div>
  )
}
