import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function withSubscription(Component) {
  return function WrappedComponent(props) {
    const router = useRouter()

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const subscribed = localStorage.getItem('subscribed')
        if (!subscribed) {
          router.replace('/pricing')
        }
      }
    }, [router])

    return <Component {...props} />
  }
}
