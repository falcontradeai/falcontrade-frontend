export default function Pricing() {
  return (
    <div className="card">
      <h1 className="text-3xl font-bold mb-2">Pricing</h1>
      <p className="text-gray-600 mb-4">Simple plans for FalconTrade.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="text-xl font-semibold mb-2">Free</div>
          <div className="text-3xl font-bold mb-3">$0</div>
          <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1">
            <li>View dashboard</li>
            <li>Manual inputs</li>
          </ul>
        </div>
        <div className="card">
          <div className="text-xl font-semibold mb-2">Pro</div>
          <div className="text-3xl font-bold mb-3">$29/mo</div>
          <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1">
            <li>Alerts & exports</li>
            <li>Persistent settings</li>
          </ul>
        </div>
        <div className="card">
          <div className="text-xl font-semibold mb-2">Enterprise</div>
          <div className="text-3xl font-bold mb-3">Custom</div>
          <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1">
            <li>Team access</li>
            <li>Custom data feeds</li>
          </ul>
        </div>
      </div>
    </div>
  )
}