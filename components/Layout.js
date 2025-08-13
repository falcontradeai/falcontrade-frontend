
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold">
            FalconTrade <span className="text-gray-400 text-base">v0.2.1</span>
          </Link>
          <nav className="flex gap-2">
            <Link className="btn" href="/">Home</Link>
            <Link className="btn" href="/about">About</Link>
            <Link className="btn" href="/pricing">Pricing</Link>
            <Link className="btn" href="/contact">Contact</Link>
            <Link className="btn" href="/dashboard">Dashboard</Link>
            <Link className="btn" href="/login">Sign in</Link>
            <Link className="btn btn-primary" href="/signup">Sign up</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="py-10 border-t">
        <div className="container text-sm text-gray-500">© {new Date().getFullYear()} FalconTrade</div>
      </footer>
    </div>
  )
}
