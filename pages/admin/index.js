import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function AdminDashboard() {
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
    <div className="flex">
      <nav className="w-48 border-r pr-4">
        <ul className="space-y-2">
          <li><Link href="/admin/alerts">Alerts</Link></li>
          <li><Link href="/admin/commodities">Commodities</Link></li>
          <li><Link href="/admin/users">Users</Link></li>
        </ul>
      </nav>
      <div className="flex-1 pl-4">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <p>Select a module from the sidebar.</p>
      </div>
    </div>
  )
}
