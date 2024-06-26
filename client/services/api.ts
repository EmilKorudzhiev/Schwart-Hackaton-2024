import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';

// Custom interface for Axios request config to include a retry flag
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_HOST}/api/v1/`,
});

// Request interceptor to add the access token to the headers
axiosInstance.interceptors.request.use(
  async (config: CustomAxiosRequestConfig) => {
    try {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    } catch (error) {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh logic
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (!error.response) {
      console.log('No response received');
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        if (refreshToken) {
          const newAccessToken = await refreshAccessToken(refreshToken);
          if (newAccessToken) {
            await SecureStore.setItemAsync('accessToken', newAccessToken);

            axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

            // Retry the original request with the new access token
            return axiosInstance(originalRequest);
          } else {
            // If the refresh token request fails
            handleSignOut();
          }
        } else {
          // If no refresh token is found
          handleSignOut();
        }
      } catch (error) {
        console.error('Error in response interceptor:', error);
        handleSignOut();
      }
    }

    return Promise.reject(error);
  }
);

// Function to refresh the access token using the refresh token
const refreshAccessToken = async (refreshToken: string): Promise<string | null> => {
  try {
    const response = await axiosInstance.post('/auth/refresh-token', { token: refreshToken });
    return response.data.accessToken;
  } catch (error) {
    console.error('Failed to refresh access token', error);
    return null;
  }
};

// Function to handle sign out
const handleSignOut = async () => {
  const { signOut } = require('../providers/AuthProvider');
  signOut();
};

export default axiosInstance;
