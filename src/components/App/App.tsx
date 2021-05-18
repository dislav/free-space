import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ChakraProvider } from '@chakra-ui/react';
import { GlobalStyle } from '../../styles/globalStyle';
import store from '../../store/store';
import theme from '../../styles/theme';
import '../../styles/fonts.css';

import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Dashboard from '../../pages/Dashboard';
import Login from '../../pages/Login';
import CreateWash from '../../pages/CreateWash';

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
              <PrivateRoute path={'/create-wash'}>
                <CreateWash />
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
