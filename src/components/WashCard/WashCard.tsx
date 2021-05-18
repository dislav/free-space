import React from 'react';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

import { Container, Column } from './WashCard.styled';
import { Wash } from '../../interfaces/types';

const WashCard: React.FC<Wash> = ({ name }) => {
  return (
    <Container>
      <Column>{name}</Column>
      <Column>16.05.2021</Column>
      <Column>17</Column>
      <Menu>
        <MenuButton as={Button}>Меню</MenuButton>
        <MenuList>
          <MenuItem>Статистика</MenuItem>
          <MenuItem>Редактировать</MenuItem>
          <MenuItem>Архивировать</MenuItem>
        </MenuList>
      </Menu>
    </Container>
  );
};

export default WashCard;
