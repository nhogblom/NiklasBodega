import { createContext, useState, type ReactNode, useEffect } from 'react';
import axiosInstance from '../api/AxiosConfig.ts';
import { logoutUser } from '../api/AuthenticationApiService.ts';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  role: string | null;
  login: (username: string) => void;
  logout: () => void;
  isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const login = (username: string) => {
    setIsAuthenticated(true);
    setUsername(username);
  };

  const logout = async () => {
    await logoutUser();
    setIsAuthenticated(false);
    setUsername(null);
    setRole(null);
  };

  useEffect(() => {
    axiosInstance
      .get('/api/auth/me')
      .then((response) => {
        login(response.data.username);
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => setIsAuthLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, username, role, login, logout, isAuthLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
