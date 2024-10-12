import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth); // Accessing auth state from Redux

  // Check if the user is authenticated and is an admin
  if (!isAuthenticated || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};


export default AdminRoute;
