import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ChakraProvider } from '@chakra-ui/react';
import { GlobalStyle } from '../styles/globalStyle';
import store from '../store/store';
import theme from '../styles/theme';

import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ChakraProvider>
          <Router>
            <Switch>
              <Route path={'/login'}>
                <Login />
              </Route>
              <PrivateRoute path={'/'}>
                <Dashboard />
              </PrivateRoute>
            </Switch>
          </Router>
          <GlobalStyle />
        </ChakraProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
