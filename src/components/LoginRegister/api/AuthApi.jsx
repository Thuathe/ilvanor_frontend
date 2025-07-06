// src/LoginRegister/api/AuthApi.js

import React, { createContext, useState, useEffect } from 'react';
import axiosClient from './axiosClient';
import { toast } from 'react-toastify';

// 🔸 Membuat Context Auth untuk seluruh aplikasi
export const AuthApi = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: '',
    user: null,
    role: ''
  });

  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // 🔸 Axios Interceptor: Auto logout jika token expired
  useEffect(() => {
    const interceptor = axiosClient.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          logout();
          toast.error('Sesi kamu sudah habis, silakan login ulang.');
        } else if (error.response && error.response.status === 403) {
          toast.error('Akses ditolak. Kamu tidak memiliki izin.');
          // Jangan logout, cukup tampilkan pesan
        }
        return Promise.reject(error);
      }
    );

    return () => axiosClient.interceptors.response.eject(interceptor);
  }, []);

  // 🔸 Cek token di localStorage saat pertama buka aplikasi
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('authUser'));
    const role = localStorage.getItem('authRole');

    if (token && user && role) {
      setAuth({ token, user, role });
      validateToken(token, role);
    } else {
      setIsInitializing(false);
    }
  }, []);

  // 🔸 Validasi token di backend
  const validateToken = async (token, role) => {
    try {
      const url = role === 'admin' ? '/admin/profile' : '/user';
      const response = await axiosClient.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAuth({ token, user: response.data, role });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        logout();
      } else if (error.response && error.response.status === 403) {
        toast.error('Akses ditolak. Kamu tidak memiliki izin.');
        // Tidak perlu logout
      } else {
        console.error('Error validateToken:', error);
      }
    } finally {
      setIsInitializing(false);
    }
  };

  // 🔸 Fungsi universal untuk request API
  const apiRequest = async (url, method, data = {}, isFormData = false) => {
    setLoading(true);
    try {
      const config = {
        url,
        method,
        headers: {
          Authorization: `Bearer ${auth.token}`,
          ...(isFormData ? {} : { 'Content-Type': 'application/json' })
        },
        ...(method === 'GET' ? {} : { data }),
      };

      const response = await axiosClient(config);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  // 🔸 Fungsi register user
  const register = async (form) => await apiRequest('register', 'POST', form);

  // 🔸 Fungsi login universal
  const login = async (form, isAdmin = false) => {
    const url = isAdmin ? 'admin/login' : 'login';

    const response = await apiRequest(url, 'POST', form);

    console.log('RESPON LOGIN:', response);

    // Simpan ke localStorage
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('authUser', JSON.stringify(response.user));
    localStorage.setItem('authRole', response.user.role);

    // Simpan ke state
    setAuth({
      token: response.token,
      user: response.user,
      role: response.user.role,
    });

    return response;
  };

  // 🔸 Fungsi logout universal
  const logout = async () => {
    try {
      await apiRequest(auth.role === 'admin' ? 'admin/logout' : 'logout', 'POST');
    } catch (error) {
      console.error('Logout Error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      localStorage.removeItem('authRole');

      setAuth({ token: '', user: null, role: '' });

      window.location.reload();
    }
  };

  return (
    <AuthApi.Provider
      value={{
        auth,
        register,
        login,
        logout,
        apiRequest,
        loading,
        isInitializing,
      }}
    >
      {children}
    </AuthApi.Provider>
  );
};
