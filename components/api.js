export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export function authHeaders() {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('ft_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
