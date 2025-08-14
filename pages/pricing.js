// pages/pricing.js
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// simple check icon for feature lists
const CheckIcon = () => (
  <svg
    className="w-4 h-4 text-accent mr-2 mt-0.5 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

// minimal tooltip component using tailwind
const Tooltip = ({ text, children }) => (
  <div className="relative group flex items-start">
    {children}
    <span className="pointer-events-none absolute left-6 top-full z-10 hidden w-48 rounded border border-border bg-card p-2 text-xs group-hover:block">
      {text}
    </span>
  </div>
)

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

  const trackEvent = (action, params) => {
    if (typeof window !== 'undefined') {
      if (window.analytics?.track) {
        window.analytics.track(action, params)
      } else if (window.gtag) {
        window.gtag('event', action, params)
      }
    }
  }

  const handleSubscribe = async () => {
    trackEvent('subscribe', { plan: 'Pro' })
    const stripe = await stripePromise
    await stripe?.redirectToCheckout({
      lineItems: [{ price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID, quantity: 1 }],
      mode: 'subscription',
      successUrl: window.location.origin + '/pricing?success=true',
      cancelUrl: window.location.origin + '/pricing',
    })
  }

  const handleContactSales = (e) => {
    e.preventDefault()
    trackEvent('contact_sales', { plan: 'Enterprise' })
    router.push('/contact')
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Choose your plan</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col shadow-md">
          <h3 className="text-xl font-semibold mb-4">Starter</h3>
          <p className="text-4xl font-bold mb-4">$0<span className="text-base font-normal">/mo</span></p>
          <ul className="flex-1 space-y-2 mb-6">
            <li>
              <Tooltip text="Explore live market listings">
                <CheckIcon />
                <span>Browse marketplace</span>
              </Tooltip>
            </li>
            <li>
              <Tooltip text="Access our library of public reports">
                <CheckIcon />
                <span>Read public reports</span>
              </Tooltip>
            </li>
            <li className="flex items-start">
              <CheckIcon />
              <span>Email support</span>
            </li>
            <li>
              <Tooltip text="Weekly emails highlighting major moves">
                <CheckIcon />
                <span>Basic market alerts</span>
              </Tooltip>
            </li>
            <li>
              <Tooltip text="Insights delivered once a month">
                <CheckIcon />
                <span>Monthly newsletter</span>
              </Tooltip>
            </li>
            <li className="flex items-start">
              <CheckIcon />
              <span>Community forum access</span>
            </li>
          </ul>
          <button className="w-full px-3 py-2 rounded-lg border border-border bg-background cursor-not-allowed" disabled>
            Current
          </button>
        </div>

        <div className="bg-card border-2 border-accent rounded-xl p-6 flex flex-col shadow-md">
          <h3 className="text-xl font-semibold mb-4">Pro</h3>
          <p className="text-4xl font-bold mb-4">$249<span className="text-base font-normal">/mo</span></p>
          <ul className="flex-1 space-y-2 mb-6">
            <li className="flex items-start">
              <CheckIcon />
              <span>Full dashboard access</span>
            </li>
            <li className="flex items-start">
              <CheckIcon />
              <span>Real-time prices & forecasts</span>
            </li>
            <li>
              <Tooltip text="Drill into trends with custom charts">
                <CheckIcon />
                <span>Advanced analytics suite</span>
              </Tooltip>
            </li>
            <li>
              <Tooltip text="Set alerts for the commodities you follow">
                <CheckIcon />
                <span>Custom price alerts</span>
              </Tooltip>
            </li>
            <li>
              <Tooltip text="Integrate with your internal tools">
                <CheckIcon />
                <span>API access</span>
              </Tooltip>
            </li>
            <li className="flex items-start">
              <CheckIcon />
              <span>1 user account</span>
            </li>
            <li className="flex items-start">
              <CheckIcon />
              <span>Priority email support</span>
            </li>
          </ul>
          <button
            className="w-full px-3 py-2 rounded-lg border border-border bg-background hover:bg-accent transition"
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 flex flex-col shadow-md">
          <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
          <p className="text-4xl font-bold mb-4">$599<span className="text-base font-normal">/mo</span></p>
          <ul className="flex-1 space-y-2 mb-6">
            <li className="flex items-start">
              <CheckIcon />
              <span>Everything in Pro</span>
            </li>
            <li className="flex items-start">
              <CheckIcon />
              <span>Up to 5 user accounts</span>
            </li>
            <li className="flex items-start">
              <CheckIcon />
              <span>Dedicated broker & support</span>
            </li>
            <li>
              <Tooltip text="Custom integrations for your workflow">
                <CheckIcon />
                <span>Tailored integrations</span>
              </Tooltip>
            </li>
            <li>
              <Tooltip text="Guaranteed response times">
                <CheckIcon />
                <span>SLA & priority support</span>
              </Tooltip>
            </li>
            <li className="flex items-start">
              <CheckIcon />
              <span>Volume discounts</span>
            </li>
            <li className="flex items-start">
              <CheckIcon />
              <span>Onboarding & training</span>
            </li>
          </ul>
          <a
            href="/contact"
            onClick={handleContactSales}
            className="w-full text-center px-3 py-2 rounded-lg border border-border bg-background hover:bg-accent transition"
          >
            Contact sales
          </a>
        </div>
      </div>
    </div>
  )
}
