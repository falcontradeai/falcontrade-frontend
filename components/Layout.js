import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="container">
      <header className="py-6 flex items-center justify-between">
        <div className="text-2xl font-semibold">FalconTrade <span className="text-gray-400 text-base">v0.2.1</span></div>
        <nav className="flex gap-3">
          <Link className="btn" href="/">Dashboard</Link>
          <Link className="btn" href="/pricing">Pricing</Link>
          <Link className="btn" href="/admin">Admin</Link>
          <Link className="btn" href="/login">Login</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="py-8 text-center text-sm text-gray-500">© {new Date().getFullYear()} FalconTrade</footer>
    </div>
  )
}