import { useEffect, useState } from 'react';
import Button from './Button';

export default function NavBar() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAuthed(!!localStorage.getItem('ft_token'));
    }
  }, []);

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ft_token');
      window.location.href = '/';
    }
  };

  return (
    <nav className="flex gap-3 px-5 py-3 bg-card border-b border-border sticky top-0 z-10">
      <Button href="/">Home</Button>
      <Button href="/market">Market</Button>
      <Button href="/rfq/new">Post Need</Button>
      <Button href="/offer/new">Post Offer</Button>
      <div className="flex-grow" />
      {authed ? (
        <Button onClick={logout}>Sign out</Button>
      ) : (
        <>
          <Button href="/login">Sign in</Button>
          <Button href="/signup" variant="primary">Sign up</Button>
        </>
      )}
    </nav>
  );
}
