import React, { createContext, useContext, useState } from 'react';
import type { RegisterInput, LoginInput } from '../lib/validation';

interface User {
  id: string;
  fullName: string;
  whatsapp: string;
  storeName: string;
  role: 'admin' | 'seller';
}

// Test users database
const TEST_USERS: Record<string, User & { password: string }> = {
  '+1234567890': {
    id: '1',
    fullName: 'Admin User',
    whatsapp: '+1234567890',
    password: 'Admin123!',
    storeName: 'Admin Store',
    role: 'admin'
  },
  '+1987654321': {
    id: '2',
    fullName: 'María García',
    whatsapp: '+1987654321',
    password: 'Seller123!',
    storeName: 'Fashion Store',
    role: 'seller'
  }
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const testUser = TEST_USERS[data.whatsapp];
      if (!testUser) {
        throw new Error('Usuario no encontrado');
      }
      
      if (testUser.password !== data.password) {
        throw new Error('Contraseña incorrecta');
      }
      
      const { password, ...userWithoutPassword } = testUser;
      setUser(userWithoutPassword);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (TEST_USERS[data.whatsapp]) {
        throw new Error('Este número de WhatsApp ya está registrado');
      }

      const newUser: User = {
        id: Date.now().toString(),
        fullName: data.fullName,
        whatsapp: data.whatsapp,
        storeName: data.storeName,
        role: 'seller'
      };
      
      setUser(newUser);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error al registrar usuario');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}