// components/Layout.js
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Layout({ children }) {
  const [authed, setAuthed] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAuthed(!!localStorage.getItem('ft_token'));
      setRole(localStorage.getItem('ft_role'));
    }
  }, []);

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ft_token');
      localStorage.removeItem('ft_role');
      window.location.href = '/';
    }
  };

  return (
    <>
      <nav className="nav">
        <Link className="btn" href="/">Home</Link>
        <Link className="btn" href="/market">Market</Link>
        <Link className="btn" href="/rfq/new">Post Need</Link>
        <Link className="btn" href="/offer/new">Post Offer</Link>
        {role === 'admin' && (
          <Link className="btn" href="/admin">Admin</Link>
        )}
        <div style={{ flex: 1 }} />
        {authed ? (
          <button className="btn" onClick={logout}>
            Sign out
          </button>
        ) : (
          <>
            <Link className="btn" href="/login">
              Sign in
            </Link>
            <Link className="btn btn-primary" href="/signup">
              Sign up
            </Link>
          </>
        )}
      </nav>
      <div className="container">{children}</div>
      <footer className="footer">
        <Link href="/about">About</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/faq">FAQ</Link>
      </footer>
    </>
  );
}
