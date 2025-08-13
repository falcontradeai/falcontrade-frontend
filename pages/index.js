
export default function Home() {
  return (
    <div>
      <section className="relative h-[70vh] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold max-w-3xl">
              AI Trading Intelligence for Commodities & Supply Chains
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/90">
              Forecasts, CIF calculators, and instant alerts across hundreds of commodities — all in one dashboard.
            </p>
            <div className="mt-6 flex gap-3">
              <a className="btn btn-primary" href="/signup">Start free</a>
              <a className="btn" href="/pricing">See pricing</a>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12 grid md-grid-cols-3 md:grid-cols-3 gap-4">
        {[
          ['Live Data', 'Stream prices from global sources focused on Caspian, Black Sea, and MENA routes.'],
          ['AI Forecasts', 'Short‑term price bands and signals trained on regional flows.'],
          ['Landed Cost', 'FX, freight, insurance & customs built into clean CIF analytics.'],
        ].map(([t,d]) => (
          <div key={t} className="card">
            <div className="text-xl font-semibold">{t}</div>
            <p className="text-gray-600 mt-2">{d}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
