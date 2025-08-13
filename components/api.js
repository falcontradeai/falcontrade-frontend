
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://falcontrade-ai.onrender.com";

export function authHeaders() {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('ft_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
