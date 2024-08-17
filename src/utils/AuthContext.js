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
        });
    } else {
      setAuth({ user: null, token: "", isAuthenticated: false, loading: false });
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', { email, password });
    const { access_token } = response.data;
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    const profileResponse = await axios.get('https://api.escuelajs.co/api/v1/auth/profile');
    const user = profileResponse.data;
    if (user.role !== 'admin') {
      throw new Error('Access denied. Admins only.');

    }
    localStorage.setItem('token', access_token);
    setAuth({
      user,
      token: access_token,
      isAuthenticated: true,
    });

    return { token: access_token, user };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({
      user: null,
      token: "",
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
