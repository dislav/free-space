import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import cookie from 'cookie';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getIsLoggedIn } from '../../store/profile/selectors';
import { getSandwich } from '../../store/sandwich/selectors';
import { setLoggedIn } from '../../store/profile/actions';
import { setSandwich } from '../../store/sandwich/actions';

import { Container, Backdrop, ContainerLogo, Logout } from './Sidebar.styled';
import SidebarLink from '../SidebarLink/SidebarLink';
import {
  BoxIcon,
  Logo,
  OrderIcon,
  PromotionIcon,
  ServiceIcon,
  SettingsIcon,
} from '../../icons/icons';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const isSandwichOpen = useAppSelector(getSandwich);

  const history = useHistory();

  const logout = useCallback(() => {
    document.cookie = cookie.serialize('ukey28', '');
    document.cookie = cookie.serialize('sesid28', '');
    dispatch(setLoggedIn(false));
    history.push('/login');
  }, [dispatch]);

  const closeSidebar = useCallback(
    () => dispatch(setSandwich(false)),
    [dispatch]
  );

  if (!isLoggedIn) return <></>;

  return (
    <>
      <Backdrop isOpen={isSandwichOpen} onClick={closeSidebar} />
      <Container isOpen={isSandwichOpen}>
        <ContainerLogo>
          <Link to={'/'}>
            <Logo />
          </Link>
        </ContainerLogo>
        <SidebarLink to={'/'}>
          <OrderIcon />
          Объекты
        </SidebarLink>
        <SidebarLink to={'/promotions'}>
          <PromotionIcon />
          Акции
        </SidebarLink>
        <SidebarLink to={'/boxes'}>
          <BoxIcon />
          Боксы
        </SidebarLink>
        <SidebarLink to={'/services'}>
          <ServiceIcon />
          Услуги
        </SidebarLink>
        <SidebarLink to={'/orders'}>
          <OrderIcon />
          Заказы
        </SidebarLink>
        <SidebarLink to={'/profile'}>
          <SettingsIcon />
          Настройки
        </SidebarLink>
        <Logout onClick={logout}>Выйти</Logout>
      </Container>
    </>
  );
};

export default Sidebar;
