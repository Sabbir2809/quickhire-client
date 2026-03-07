"use client";

import { ADMIN_TOKEN } from "@/config/constants";
import { authServices } from "@/services/authServices";
import Cookies from "js-cookie";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get(ADMIN_TOKEN);
    setIsAdmin(!!token);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authServices.login({ email, password });
    const token = res.data.data.token;
    Cookies.set(ADMIN_TOKEN, token, { expires: 7 });
    setIsAdmin(true);
  };

  const logout = () => {
    Cookies.remove(ADMIN_TOKEN);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
