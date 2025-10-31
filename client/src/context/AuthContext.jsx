import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        if (token) {
          const { data } = await api.get('/profile');
          setUser(data);
        }
      } catch (e) {
        console.error(e);
        localStorage.removeItem('token');
        setToken(null);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []); // run once on mount

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  const value = useMemo(() => ({
    token,
    user,
    loading,
    login: async (email, password) => {
      const { data } = await api.post('/auth/login', { email, password });
      setToken(data.token);
      setUser(data.user);
    },
    signup: async (name, email, password) => {
      const { data } = await api.post('/auth/signup', { name, email, password });
      setToken(data.token);
      setUser(data.user);
    },
    logout: () => {
      setToken(null);
      setUser(null);
    },
    refreshProfile: async () => {
      const { data } = await api.get('/profile');
      setUser(data);
    }
  }), [token, user, loading]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
