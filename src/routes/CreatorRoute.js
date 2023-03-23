import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '~/context/UserContext';

const CreatorRoute = ({ children }) => {
  const role = getUserRole();

  if (role != 'creator') {
    return <Navigate to="/sign-in" />;
  }
  return children;
};

export default CreatorRoute;
