import { createContext, useState, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  role: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  // const [isAuthLoading, setIsAuthLoading] = useState(true);

  const login = (username: string) => {
    setIsAuthenticated(true);
    setUsername(username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, username, role, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
