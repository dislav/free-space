import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ChakraProvider } from '@chakra-ui/react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { I18nextProvider } from 'react-i18next';
import dayjs from 'dayjs';
import DayjsUtils from '@date-io/dayjs';
import 'dayjs/locale/ru';

import { GlobalStyle } from '../../styles/globalStyle';
import store from '../../store/store';
import theme from '../../styles/theme';
import i18next from '../../locales/i18n';
import '../../styles/fonts.css';
import 'leaflet/dist/leaflet.css';

import Sidebar from '../Sidebar/Sidebar';

import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Dashboard from '../../pages/Dashboard';
import Login from '../../pages/Login';
import CreateWash from '../../pages/CreateWash';
import Promotions from '../../pages/Promotions';
import Profile from '../../pages/Profile';
import Orders from '../../pages/Orders';
import Services from '../../pages/Services';
import CreateService from '../../pages/CreateService';
import Boxes from '../../pages/Boxes';
import CreatePromotion from '../../pages/CreatePromotion';

dayjs.locale('ru');

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <ChakraProvider>
          <MuiPickersUtilsProvider utils={DayjsUtils}>
            <ThemeProvider theme={theme}>
              <Router>
                <Sidebar />
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
                  <PrivateRoute path={'/boxes'}>
                    <Boxes />
                  </PrivateRoute>
                  <PrivateRoute path={'/services'}>
                    <Services />
                  </PrivateRoute>
                  <PrivateRoute path={'/orders'}>
                    <Orders />
                  </PrivateRoute>
                  <PrivateRoute path={'/create/promotion'}>
                    <CreatePromotion />
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
          </MuiPickersUtilsProvider>
        </ChakraProvider>
      </Provider>
    </I18nextProvider>
  );
};

export default App;
