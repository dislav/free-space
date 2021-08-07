import React from 'react';
import { Helmet } from 'react-helmet';

import { Container, Header } from './Layout.styled';
import Sandwich from '../Sandwich/Sandwich';
import NotificationMessage from '../NotificationMessage/NotificationMessage';

interface ILayout {
  title?: string;
  action?: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ title, action, children }) => {
  return (
    <Container>
      <Helmet>
        <meta charSet={'utf-8'} />
        <title>Free Space{title ? ` — ${title}` : ''}</title>
        <meta
          name={'description'}
          content={'Личный кабинет агрегатора автомоек'}
        />
      </Helmet>
      <NotificationMessage />
      <Header>
        <Sandwich />
        {title && <h1>{title}</h1>}
        {action}
      </Header>
      {children}
    </Container>
  );
};

export default Layout;
