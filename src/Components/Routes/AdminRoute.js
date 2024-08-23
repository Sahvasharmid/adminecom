import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
const AdminRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.isAuthenticated || auth.user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <Outlet></Outlet>;
};

export default AdminRoute;
