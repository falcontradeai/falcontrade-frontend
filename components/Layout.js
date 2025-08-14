// components/Layout.js
import Link from 'next/link';
import NavBar from './NavBar';

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main className="max-w-5xl mx-auto p-5">{children}</main>
      <footer className="flex gap-3 p-5 justify-center bg-card border-t border-border">
        <Link href="/about">About</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/faq">FAQ</Link>
      </footer>
    </>
  );
}
