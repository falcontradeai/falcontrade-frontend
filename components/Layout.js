import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Layout({ children }) {
  const [hasToken, setHasToken] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('ft_token')
      setHasToken(!!token)
    }
  }, [])

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ft_token');
      window.location.href = '/';
    }
  }
  return (
    <>
      <nav className="flex flex-col gap-2 p-4 bg-card border-b border-border sm:flex-row">
        <Link href="/" className="px-3 py-2 rounded-lg border border-border bg-background">Home</Link>
        <Link href="/market" className="px-3 py-2 rounded-lg border border-border bg-background">Market</Link>
        <Link href="/rfq/new" className="px-3 py-2 rounded-lg border border-border bg-background">Post Need</Link>
        <Link href="/offer/new" className="px-3 py-2 rounded-lg border border-border bg-background">Post Offer</Link>
        <div className="flex-1" />
        {hasToken ? (
          <>
            {/* TODO: Add role-based links such as Admin here when available */}
            <button
              className="px-3 py-2 rounded-lg border border-border bg-background"
              onClick={logout}
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="px-3 py-2 rounded-lg border border-border bg-background"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="px-3 py-2 rounded-lg border border-primary bg-primary text-white"
            >
              Sign up
            </Link>
          </>
        )}
      </nav>
      <div className="max-w-screen-lg mx-auto p-5">{children}</div>
      <footer className="flex justify-center gap-4 mt-10">
        <Link
          href="/about"
          className="px-3 py-2 rounded-lg border border-border bg-background"
        >
          About
        </Link>
        <Link
          href="/pricing"
          className="px-3 py-2 rounded-lg border border-border bg-background"
        >
          Pricing
        </Link>
        <Link
          href="/contact"
          className="px-3 py-2 rounded-lg border border-border bg-background"
        >
          Contact
        </Link>
        <Link
          href="/faq"
          className="px-3 py-2 rounded-lg border border-border bg-background"
        >
          FAQ
        </Link>
      </footer>
    </>
  )
}
