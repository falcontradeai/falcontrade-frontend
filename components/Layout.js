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
      <nav className="flex flex-col gap-2 p-4 bg-card border-b border-border sm:flex-row">
        <Link href="/" className="px-3 py-2 rounded-lg border border-border bg-background">Home</Link>
        <Link href="/market" className="px-3 py-2 rounded-lg border border-border bg-background">Market</Link>
        <Link href="/rfq/new" className="px-3 py-2 rounded-lg border border-border bg-background">Post Need</Link>
        <Link href="/offer/new" className="px-3 py-2 rounded-lg border border-border bg-background">Post Offer</Link>
        <div className="flex-1" />
        <Link href="/login" className="px-3 py-2 rounded-lg border border-border bg-background">Sign in</Link>
        <Link href="/signup" className="px-3 py-2 rounded-lg border border-primary bg-primary text-white">Sign up</Link>
        <button className="px-3 py-2 rounded-lg border border-border bg-background" onClick={logout}>Sign out</button>
      </nav>
      <div className="max-w-screen-lg mx-auto p-5">{children}</div>
    </>
  )
}
