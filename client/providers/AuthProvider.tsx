import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios, { AxiosError } from 'axios';

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  signIn: (email: string, password: string) => Promise<void | {error: string}>;
  signOut: () => Promise<void>;
  refreshAccessToken: (refreshToken: string) => Promise<string>;
  loading: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync('user');
        const storedAccessToken = await SecureStore.getItemAsync('accessToken');
        const storedRefreshToken = await SecureStore.getItemAsync('refreshToken');

        if (storedUser && storedAccessToken && storedRefreshToken) {
          setUser(JSON.parse(storedUser));
          setAccessToken(storedAccessToken);
          setRefreshToken(storedRefreshToken);
        }
      } catch (error) {
        console.error('Failed to load storage data', error);
      } finally {
        setLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://192.168.141.171:8080/api/v1/auth/authenticate', { email, password });
      const { user, accessToken, refreshToken } = response.data;
      await SecureStore.setItemAsync('user', JSON.stringify(user));
      await SecureStore.setItemAsync('accessToken', accessToken);
      await SecureStore.setItemAsync('refreshToken', refreshToken);
      setUser(user);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    } catch (error) {
      if(axios.isAxiosError(error)) {
        if(error.response?.data.detail === "Invalid credentials") {
          return { error: "Incorrect username or password"}
        } else {
          return { error: "Something else went wrong" }
        }
      } else {
        return { error: "Something else went wrong" }
      }
    }
  };

  const signOut = async () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    await SecureStore.deleteItemAsync('user');
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
  };

  const refreshAccessToken = useCallback(async (refreshToken: string) => {
    try {
      const response = await axios.post('http://192.168.141.171:8080/api/v1/auth/refresh', { refreshToken });
      const { accessToken: newAccessToken } = response.data;
      await SecureStore.setItemAsync('accessToken', newAccessToken);
      setAccessToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error('Failed to refresh access token', error);
      signOut();
      throw error;
    }
  }, [signOut]);

  return (
    <AuthContext.Provider value={{ user, accessToken, signIn, signOut, refreshAccessToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
