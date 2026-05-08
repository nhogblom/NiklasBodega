import { createContext, useState, type ReactNode, useEffect } from 'react';
import axiosInstance from '../api/AxiosConfig.ts';
import { logoutUser } from '../api/AuthenticationApiService.ts';

interface AuthContextType {
  isAuthenticated: boolean;
  email: string | null;
  role: string | null;
  login: (email: string) => void;
  logout: () => void;
  isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setemail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const login = (email: string) => {
    setIsAuthenticated(true);
    setemail(email);
  };

  const logout = async () => {
    await logoutUser();
    setIsAuthenticated(false);
    setemail(null);
    setRole(null);
  };

  useEffect(() => {
    axiosInstance
      .get('/api/auth/me')
      .then((response) => {
        login(response.data.email);
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => setIsAuthLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, email, role, login, logout, isAuthLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
