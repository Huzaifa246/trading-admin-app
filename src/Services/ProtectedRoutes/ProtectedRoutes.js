import React from 'react';

const isUserLoggedIn = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};

const ProtectedRoutes = ({ element }) => {
  if (isUserLoggedIn()) {
    return element;
  } else {
    // return <Navigate to="/" replace />;
    return window.location.href = '/';
  }
};

export default ProtectedRoutes;
