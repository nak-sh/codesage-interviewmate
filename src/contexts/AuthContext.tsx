import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'candidate' | 'company' | 'admin';
  company?: string;
  skills?: string[];
  experienceLevel?: 'junior' | 'mid' | 'senior';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  adminLogin: (username: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('codesage_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: email.includes('company') ? 'company' : 'candidate',
        company: email.includes('company') ? 'Tech Corp' : undefined,
        skills: email.includes('company') ? undefined : ['JavaScript', 'React'],
        experienceLevel: email.includes('company') ? undefined : 'mid'
      };

      setUser(mockUser);
      localStorage.setItem('codesage_user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogin = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock admin login
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (username === 'admin@codesage.ai') {
        const adminUser: User = {
          id: 'admin',
          email: username,
          name: 'System Administrator',
          role: 'admin'
        };

        setUser(adminUser);
        localStorage.setItem('codesage_user', JSON.stringify(adminUser));
      } else {
        throw new Error('Invalid admin credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email!,
        name: userData.name!,
        role: userData.role || 'candidate',
        company: userData.company,
        skills: userData.skills,
        experienceLevel: userData.experienceLevel
      };

      setUser(newUser);
      localStorage.setItem('codesage_user', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('codesage_user');
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    adminLogin,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};