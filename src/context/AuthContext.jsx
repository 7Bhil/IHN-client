import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('ihn_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const res = await API.get('/auth/me');
          setUser(res.data);
        } catch (error) {
          console.error('Session expired or invalid:', error);
          logout();
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    const { token: userToken, ...userData } = res.data;
    localStorage.setItem('ihn_token', userToken);
    setToken(userToken);
    setUser(userData);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('ihn_token');
    setToken(null);
    setUser(null);
  };

  const seedAdmin = async () => {
    try {
      const res = await API.post('/auth/seed');
      return { success: true, message: res.data.message, email: res.data.email };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Erreur d\'initialisation' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, seedAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
