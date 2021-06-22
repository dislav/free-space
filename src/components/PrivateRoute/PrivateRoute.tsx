import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useProfile } from '../../lib/useProfile';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  const { loading, isLoggedIn } = useProfile();

  if (!loading && !isLoggedIn) return <Redirect to={'/login'} />;
  return <Route {...props}>{children}</Route>;
};

export default PrivateRoute;
