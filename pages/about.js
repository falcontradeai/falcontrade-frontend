
export default function About() {
  return (
    <div className="container">
      <div className="card mt-8 space-y-3">
        <h1 className="text-3xl font-bold">About FalconTrade</h1>
        <p className="text-gray-600">
          We’re building the Caspian region’s first AI‑powered B2B trading intelligence platform —
          serving Azerbaijan, Türkiye, Georgia, and Kazakhstan.
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li>Live commodity prices focused on regional routes</li>
          <li>AI forecasts for short‑term price bands</li>
          <li>Landed‑cost calculator (FX, freight, insurance, customs)</li>
          <li>Alerts when profitable opportunities appear</li>
        </ul>
      </div>
    </div>
  )
}
