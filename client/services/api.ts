import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../providers/AuthProvider';

const axiosInstance = axios.create({
    baseURL: 'http://192.168.141.171:8080/api/v1/',
});
  
  
axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      console.log(originalRequest);
      
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        if (refreshToken) {
          const { refreshAccessToken, signOut } = useAuth();
          try {
  
            const newAccessToken = await refreshAccessToken(refreshToken);
            await SecureStore.setItemAsync('accessToken', newAccessToken);
  
            axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
  
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            console.error('Failed to refresh access token', refreshError);
            signOut();
          }
        }
      }
  
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;