import React from 'react';
import { Container, Content, Header } from './Layout.styled';
import Sidebar from '../Sidebar/Sidebar';

interface ILayout {
  title?: string;
  action?: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ title, action, children }) => {
  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>
          {title && <h1>{title}</h1>}
          {action}
        </Header>
        {children}
      </Content>
    </Container>
  );
};

export default Layout;
