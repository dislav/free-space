import React from 'react';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { Wash } from '../interfaces/types';

const WashCard: React.FC<Wash> = ({ name, description }) => {
  return (
    <Box
      d={'flex'}
      alignItems={'center'}
      minH={'94px'}
      bg={'gray.50'}
      borderRadius={'18px'}
      p={'38px 80px'}
    >
      <Text flex={1}>{name}</Text>
      <Text flex={1}>16.05.2021</Text>
      <Text flex={1}>17</Text>
      <Menu>
        <MenuButton as={Button}>Меню</MenuButton>
        <MenuList>
          <MenuItem>Статистика</MenuItem>
          <MenuItem>Редактировать</MenuItem>
          <MenuItem>Архивировать</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default WashCard;
