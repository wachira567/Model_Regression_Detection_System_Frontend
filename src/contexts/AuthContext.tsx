import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

interface AuthContextType {
  token: string | null;
  userId: string | null;
  orgId: string | null;
  login: (token: string, userId: string, orgId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('user_id'));
  const [orgId, setOrgId] = useState<string | null>(localStorage.getItem('org_id'));

  const login = (newToken: string, newUserId: string, newOrgId: string) => {
    localStorage.setItem('access_token', newToken);
    localStorage.setItem('user_id', newUserId);
    localStorage.setItem('org_id', newOrgId);
    setToken(newToken);
    setUserId(newUserId);
    setOrgId(newOrgId);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('org_id');
    setToken(null);
    setUserId(null);
    setOrgId(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, orgId, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
