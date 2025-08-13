import Link from 'next/link'

export default function Layout({ children }) {
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
        <Link className="btn" href="/login">Sign in</Link>
        <Link className="btn btn-primary" href="/signup">Sign up</Link>
        <button className="btn" onClick={logout}>Sign out</button>
      </nav>
      <div className="container">{children}</div>
    </>
  )
}
