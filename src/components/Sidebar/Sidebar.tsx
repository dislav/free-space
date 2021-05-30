import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import cookie from 'cookie';

import { Container, ContainerLogo, Logout } from './Sidebar.styled';
import SidebarLink from '../SidebarLink/SidebarLink';
import { Logo } from '../../icons/icons';

const Sidebar: React.FC = () => {
  const history = useHistory();

  const logout = () => {
    document.cookie = cookie.serialize('ukey28', '');
    document.cookie = cookie.serialize('sesid28', '');
    history.push('/login');
  };

  return (
    <Container>
      <ContainerLogo>
        <Link to={'/'}>
          <Logo />
        </Link>
      </ContainerLogo>
      <SidebarLink to={'/'}>Объекты</SidebarLink>
      <SidebarLink to={'/promotions'}>Акции</SidebarLink>
      <SidebarLink to={'/statistics'}>Статистика</SidebarLink>
      <SidebarLink to={'/services'}>Услуги</SidebarLink>
      <SidebarLink to={'/orders'}>Заказы</SidebarLink>
      <SidebarLink to={'/profile'}>Настройки</SidebarLink>
      <Logout onClick={logout}>Выйти</Logout>
    </Container>
  );
};

export default Sidebar;
