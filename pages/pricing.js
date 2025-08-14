import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || '')

export default function Pricing() {
  const router = useRouter()

  useEffect(() => {
    if (router.query.success) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('subscribed', 'true')
      }
    }
  }, [router.query.success])

  const handleSubscribe = async () => {
    const stripe = await stripePromise
    await stripe?.redirectToCheckout({
      lineItems: [{ price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID, quantity: 1 }],
      mode: 'subscription',
      successUrl: window.location.origin + '/pricing?success=true',
      cancelUrl: window.location.origin + '/pricing',
    })
  }

  return (
    <div className="card">
      <h2 className="text-xl">Pricing</h2>
      <button className="btn" onClick={handleSubscribe}>Subscribe</button>
    </div>
  )
}
