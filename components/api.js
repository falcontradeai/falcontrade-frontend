import axios from 'axios';

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'https://falcontrade-ai.onrender.com';

export function authHeaders() {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('ft_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  config.headers = { ...config.headers, ...authHeaders() };
  return config;
});

export default api;
