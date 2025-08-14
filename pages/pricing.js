// pages/pricing.js
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
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Choose your plan</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col">
          <h3 className="text-xl font-semibold mb-4">Starter</h3>
          <p className="text-4xl font-bold mb-4">$0<span className="text-base font-normal">/mo</span></p>
          <ul className="flex-1 space-y-2 mb-6">
            <li>Browse marketplace</li>
            <li>Read public reports</li>
            <li>Email support</li>
          </ul>
          <button className="w-full px-3 py-2 rounded-lg border border-border bg-background cursor-not-allowed" disabled>
            Current
          </button>
        </div>

        <div className="bg-card border-2 border-accent rounded-xl p-6 flex flex-col">
          <h3 className="text-xl font-semibold mb-4">Pro</h3>
          <p className="text-4xl font-bold mb-4">$249<span className="text-base font-normal">/mo</span></p>
          <ul className="flex-1 space-y-2 mb-6">
            <li>Full dashboard access</li>
            <li>Real-time prices & forecasts</li>
            <li>1 user account</li>
          </ul>
          <button className="w-full px-3 py-2 rounded-lg border border-border bg-background hover:bg-accent transition" onClick={handleSubscribe}>
            Subscribe
          </button>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 flex flex-col">
          <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
          <p className="text-4xl font-bold mb-4">$599<span className="text-base font-normal">/mo</span></p>
          <ul className="flex-1 space-y-2 mb-6">
            <li>Everything in Pro</li>
            <li>Up to 5 user accounts</li>
            <li>Dedicated broker & support</li>
          </ul>
          <a
            href="/contact"
            className="w-full text-center px-3 py-2 rounded-lg border border-border bg-background hover:bg-accent transition"
          >
            Contact sales
          </a>
        </div>
      </div>
    </div>
  )
}
