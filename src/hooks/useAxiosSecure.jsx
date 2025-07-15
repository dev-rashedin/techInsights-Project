import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import { useEffect, useState } from 'react';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOutUser } = useAuth();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    if (shouldNavigate) {
      navigate('/login');
    }
  }, [shouldNavigate, navigate]);

  useEffect(() => {
    // ✅ Attach interceptor only once
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token');
        console.log('request stopped before interceptor', token);

        if (token) {
          config.headers.authorization = `Bearer ${token}`;
          console.log(
            'request stopped after interceptor',
            config.headers.authorization
          );
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
          await logOutUser();
          setShouldNavigate(true); // ✅ fix this (you had shouldNavigate(true))
        }

        return Promise.reject(error);
      }
    );

    // 🧼 Cleanup interceptors on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOutUser]);

  return axiosSecure;
};


export default useAxiosSecure;
