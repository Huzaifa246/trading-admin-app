import React from 'react';
import { Navigate } from 'react-router-dom';

const isUserLoggedIn = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};

const ProtectedRoutes = ({ element }) => {
  if (isUserLoggedIn()) {
    return element;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoutes;
