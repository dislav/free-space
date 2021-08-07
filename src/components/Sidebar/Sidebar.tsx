import React, { useEffect, useCallback, useMemo } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useSwr from 'swr';
import cookie from 'cookie';
import useSound from 'use-sound';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getSandwich } from '../../store/sandwich/selectors';
import { setSandwich } from '../../store/sandwich/actions';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import notificationSound from '../../sounds/notification.mp3';

import {
  Container,
  Backdrop,
  ContainerLogo,
  Logout,
  ChatLink,
  ChatNotice,
} from './Sidebar.styled';
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
import { fetcher } from '../../lib/api';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const isSandwichOpen = useAppSelector(getSandwich);

  const isWash = localStorage.getItem('group') === '2';

  const [playNotification] = useSound(notificationSound);
  const onSuccess = (data: { status: boolean }) => {
    if (data?.status) playNotification();
  };

  const { data: lastOrders } = useSwr<{ status: boolean }>(
    isWash ? '/order/last' : null,
    fetcher,
    {
      refreshInterval: 10000,
      onSuccess,
    }
  );

  useEffect(() => {
    if (lastOrders?.status) {
      if ('Notification' in window)
        new Notification('Free Space', { body: 'У вас есть новый заказ!' });
    }
  }, [lastOrders]);

  const isAdmin = localStorage.getItem('group') === '1';
  const { data } = useSwr<{
    new: boolean;
    list: {
      [key: string]: number;
    };
  }>(isAdmin ? '/message/checknew' : null);

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
            <ChatLink>
              Чат
              {data?.new && <ChatNotice />}
            </ChatLink>
          </SidebarLink>
        </WithGroup>
        <Logout onClick={logout}>Выйти</Logout>
      </Container>
    </>
  );
};

export default Sidebar;
