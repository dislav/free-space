import React from 'react';

import { Container, ContainerLogo } from './Sidebar.styled';
import SidebarLink from '../SidebarLink/SidebarLink';
import { ReactComponent as Logo } from '../../icons/logo.svg';

const Sidebar: React.FC = () => {
  return (
    <Container>
      <ContainerLogo>
        <Logo />
      </ContainerLogo>
      <SidebarLink to={'/'}>Объекты</SidebarLink>
      <SidebarLink to={'/promotions'}>Акции</SidebarLink>
      <SidebarLink to={'/statistics'}>Статистика</SidebarLink>
      <SidebarLink to={'/settings'}>Настройки</SidebarLink>
    </Container>
  );
};

export default Sidebar;
