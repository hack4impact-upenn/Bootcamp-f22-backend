import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }: any) {
  const isAuthenticated = true; // dummy value right now
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;
