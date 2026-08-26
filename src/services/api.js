import axios from 'axios';

export const SERVER_URL = import.meta.env?.VITE_SERVER_URL || 'https://ihn-server.onrender.com';

const API = axios.create({
  baseURL: `${SERVER_URL}/api`,
});

// Interceptor to attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('ihn_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
