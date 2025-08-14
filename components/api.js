// components/api.js
import axios from 'axios';

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'https://falcontrade-ai.onrender.com';

export const authHeaders = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('ft_token');
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
};

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically include token if available
api.interceptors.request.use((config) => {
  config.headers = { ...config.headers, ...authHeaders() };
  return config;
});

export default api;
