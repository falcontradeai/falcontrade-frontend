import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function AdminCommodities() {
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
      <h1>Commodities</h1>
      <p>Stub page for managing commodities.</p>
    </div>
  )
}
