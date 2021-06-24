import React, { useCallback } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import cookie from 'cookie';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getSandwich } from '../../store/sandwich/selectors';
import { setSandwich } from '../../store/sandwich/actions';

import { Container, Backdrop, ContainerLogo, Logout } from './Sidebar.styled';
import SidebarLink from '../SidebarLink/SidebarLink';
import WithGroup from '../WithGroup/WithGroup';

import {
  BoxIcon,
  Logo,
  OrderIcon,
  PromotionIcon,
  ServiceIcon,
  SettingsIcon,
  StatisticsIcon,
  ChatIcon,
} from '../../icons/icons';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSandwichOpen = useAppSelector(getSandwich);

  const history = useHistory();
  const location = useLocation();

  const logout = useCallback(() => {
    document.cookie = cookie.serialize('ukey28', '');
    document.cookie = cookie.serialize('sesid28', '');
    localStorage.removeItem('user');
    localStorage.removeItem('group');

    history.push('/login');
  }, [dispatch]);

  const closeSidebar = useCallback(
    () => dispatch(setSandwich(false)),
    [dispatch]
  );

  if (['/login'].includes(location.pathname)) return <></>;

  return (
    <>
      <Backdrop isOpen={isSandwichOpen} onClick={closeSidebar} />
      <Container isOpen={isSandwichOpen}>
        <ContainerLogo>
          <Link to={'/'}>
            <Logo />
          </Link>
        </ContainerLogo>
        <WithGroup available={['1']}>
          <SidebarLink to={'/'}>
            <OrderIcon />
            Объекты
          </SidebarLink>
        </WithGroup>
        <WithGroup available={['2']}>
          <SidebarLink to={'/'}>
            <OrderIcon />
            Заявки
          </SidebarLink>
        </WithGroup>
        <WithGroup available={['2']}>
          <SidebarLink to={'/boxes'}>
            <BoxIcon />
            Боксы
          </SidebarLink>
        </WithGroup>
        <WithGroup available={['2']}>
          <SidebarLink to={'/services'}>
            <ServiceIcon />
            Услуги
          </SidebarLink>
        </WithGroup>
        <SidebarLink to={'/promotions'}>
          <PromotionIcon />
          Акции
        </SidebarLink>
        <SidebarLink to={'/statistics'}>
          <StatisticsIcon />
          Статистика
        </SidebarLink>
        <SidebarLink to={'/profile'}>
          <SettingsIcon />
          Настройки
        </SidebarLink>
        <WithGroup available={['1']}>
          <SidebarLink to={'/chat'}>
            <ChatIcon />
            Чат
          </SidebarLink>
        </WithGroup>
        <Logout onClick={logout}>Выйти</Logout>
      </Container>
    </>
  );
};

export default Sidebar;
