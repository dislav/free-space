import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ChakraProvider } from '@chakra-ui/react';
import { GlobalStyle } from '../../styles/globalStyle';
import store from '../../store/store';
import theme from '../../styles/theme';
import '../../styles/fonts.css';
import 'leaflet/dist/leaflet.css';

import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Dashboard from '../../pages/Dashboard';
import Login from '../../pages/Login';
import CreateWash from '../../pages/CreateWash';
import Promotions from '../../pages/Promotions';
import Profile from '../../pages/Profile';
import Orders from '../../pages/Orders';
import Services from '../../pages/Services';
import CreateService from '../../pages/CreateService';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route path={'/login'}>
                <Login />
              </Route>
              <PrivateRoute path={'/profile'}>
                <Profile />
              </PrivateRoute>
              <PrivateRoute path={'/promotions'}>
                <Promotions />
              </PrivateRoute>
              <PrivateRoute path={'/services'}>
                <Services />
              </PrivateRoute>
              <PrivateRoute path={'/orders'}>
                <Orders />
              </PrivateRoute>
              <PrivateRoute path={'/wash/create'}>
                <CreateWash />
              </PrivateRoute>
              <PrivateRoute path={'/service/create'}>
                <CreateService />
              </PrivateRoute>
              <PrivateRoute path={'/'}>
                <Dashboard />
              </PrivateRoute>
            </Switch>
          </Router>
          <GlobalStyle />
        </ThemeProvider>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
