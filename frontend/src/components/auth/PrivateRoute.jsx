import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // If user is not authenticated, redirect to login page
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
