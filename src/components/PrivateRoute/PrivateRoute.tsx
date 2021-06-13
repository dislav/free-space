import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useProfile } from '../../lib/useProfile';

const PrivateRoute: React.FC<RouteProps> = ({ children }) => {
  const { isLoggedIn } = useProfile();

  if (!isLoggedIn) return <Redirect to={'/login'} />;
  return <Route>{children}</Route>;
};

export default PrivateRoute;
