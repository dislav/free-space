import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store/rootReducer';

const mapStateToProps = ({ profile }: RootState) => ({ profile });

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const PrivateRoute: React.FC<RouteProps & PropsFromRedux> = ({
  children,
  profile,
}) => {
  return (
    <Route>{profile.loggedIn ? children : <Redirect to={'/login'} />}</Route>
  );
};

export default connector(PrivateRoute);
