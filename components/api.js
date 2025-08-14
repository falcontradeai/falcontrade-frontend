import axios from 'axios';

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://falcontrade-ai.onrender.com';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token') || localStorage.getItem('ft_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authHeaders = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token') || localStorage.getItem('ft_token');
    if (token) return { Authorization: `Bearer ${token}` };
  }
  return {};
};

export default api;
