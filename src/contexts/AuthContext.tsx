import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Admin } from '../types';
import api from '../utils/api';

interface AuthContextType {
  user: User | null;
  admin: Admin | null;
  isAuthenticated: boolean;
  userType: 'user' | 'admin' | null;
  login: (token: string, userData: User | Admin, type: 'user' | 'admin') => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<'user' | 'admin' | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUserType = localStorage.getItem('userType') as 'user' | 'admin' | null;
    
    if (token && savedUserType) {
      setUserType(savedUserType);
      // Verify token and get user/admin data
      verifyToken(savedUserType);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (type: 'user' | 'admin') => {
    try {
      if (type === 'user') {
        const response = await api.get('/users/profile');
        setUser(response.data);
      } else {
        // For admin, we'll just trust the token since we don't have a profile endpoint
        setAdmin({ id: 1, username: 'admin', createdAt: new Date().toISOString() });
      }
      setUserType(type);
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      setUser(null);
      setAdmin(null);
      setUserType(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (token: string, userData: User | Admin, type: 'user' | 'admin') => {
    localStorage.setItem('token', token);
    localStorage.setItem('userType', type);
    
    if (type === 'user') {
      setUser(userData as User);
      setAdmin(null);
    } else {
      setAdmin(userData as Admin);
      setUser(null);
    }
    setUserType(type);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setUser(null);
    setAdmin(null);
    setUserType(null);
  };

  const isAuthenticated = !!(user || admin);

  const value = {
    user,
    admin,
    isAuthenticated,
    userType,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};