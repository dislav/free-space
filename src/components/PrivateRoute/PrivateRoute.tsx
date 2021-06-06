import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useAppSelector } from '../../hooks/hooks';
import { getIsLoggedIn } from '../../store/profile/selectors';

const PrivateRoute: React.FC<RouteProps> = ({ children }) => {
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  return <Route>{isLoggedIn ? children : <Redirect to={'/login'} />}</Route>;
};

export default PrivateRoute;
