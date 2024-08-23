import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken'); // Ensure this is used
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('https://api.escuelajs.co/api/v1/auth/profile')
        .then(response => {
          setAuth({
            user: response.data,
            token,
            isAuthenticated: true,
            loading: false,
          });
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
          setAuth({ user: null, token: "", isAuthenticated: false, loading: false });
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
        });
    } else {
      setAuth({ user: null, token: "", isAuthenticated: false, loading: false });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', { email, password });
      const { access_token, refresh_token } = response.data;
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      const profileResponse = await axios.get('https://api.escuelajs.co/api/v1/auth/profile');
      const user = profileResponse.data;

      if (user.role !== 'admin') {
        throw new Error('Access denied. Admins only.');
      }

      localStorage.setItem('token', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      setAuth({
        user,
        token: access_token,
        isAuthenticated: true,
        loading: false,
      });

      return { token: access_token, user };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setAuth({
      user: null,
      token: "",
      isAuthenticated: false,
    });
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        const response = await axios.post('https://api.escuelajs.co/api/v1/auth/refresh-token', { refresh_token: refreshToken });
        const { access_token } = response.data;

        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        localStorage.setItem('token', access_token);

        return access_token;
      } else {
        throw new Error('No refresh token available.');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
    }
  };

  axios.interceptors.response.use(
    response => response,
    async error => {
      const { response } = error;
      if (response && response.status === 401 && response.data.message === 'Token expired') {
        try {
          const newToken = await refreshToken(); // Ensure this function is used
          error.config.headers['Authorization'] = `Bearer ${newToken}`;
          return axios(error.config);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
