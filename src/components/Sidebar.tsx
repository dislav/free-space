import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import SidebarLink from "./SidebarLink";
import { ReactComponent as Logo } from '../icons/logo.svg';

const Sidebar: React.FC = () => {
  return (
    <Box d={'flex'} flexDirection={'column'} py={'40px'}>
      <Box m={'0 auto 60px'}>
        <Logo />
      </Box>
      <SidebarLink to={'/'}>Объекты</SidebarLink>
      <SidebarLink to={'/promotions'}>Акции</SidebarLink>
      <SidebarLink to={'/statistics'}>Статистика</SidebarLink>
      <SidebarLink to={'/settings'}>Настройки</SidebarLink>
    </Box>
  );
};

export default Sidebar;
