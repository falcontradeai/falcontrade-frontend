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
      <nav className="nav">
        <Link className="btn" href="/">Home</Link>
        <Link className="btn" href="/market">Market</Link>
        <Link className="btn" href="/rfq/new">Post Need</Link>
        <Link className="btn" href="/offer/new">Post Offer</Link>
        <div style={{flex:1}} />
        {hasToken ? (
          <>
            {/* TODO: Add role-based links such as Admin here when available */}
            <button className="btn" onClick={logout}>Sign out</button>
          </>
        ) : (
          <>
            <Link className="btn" href="/login">Sign in</Link>
            <Link className="btn btn-primary" href="/signup">Sign up</Link>
          </>
        )}
      </nav>
      <div className="container">{children}</div>
    </>
  )
}
