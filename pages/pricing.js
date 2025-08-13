
export default function Pricing() {
  const plans = [
    { name: 'Starter', price: '$99/mo', features: ['Dashboard access', 'Manual inputs', 'Email support'], cta: 'Get started', href:'/signup' },
    { name: 'Pro',     price: '$499/mo', features: ['AI forecasts', 'Alerts', 'CSV export'], cta: 'Subscribe Pro', href:'/signup' },
    { name: 'Enterprise', price: 'Contact', features: ['Team seats', 'SLA', 'Custom feeds'], cta: 'Talk to sales', href:'/contact' },
  ]
  return (
    <div className="container">
      <div className="card mt-8">
        <h1 className="text-3xl font-bold mb-2">Pricing</h1>
        <p className="text-gray-600 mb-6">Simple monthly subscriptions. Cancel anytime.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map(p => (
            <div key={p.name} className="card">
              <div className="text-xl font-semibold">{p.name}</div>
              <div className="text-3xl font-bold mt-1">{p.price}</div>
              <ul className="text-gray-700 list-disc ml-5 mt-3 space-y-1">
                {p.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <a className="btn btn-primary mt-4" href={p.href}>{p.cta}</a>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-4">Stripe integration next — for now, sign up and we’ll provision access.</div>
      </div>
    </div>
  )
}
