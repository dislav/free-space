import React from 'react';

import { Container, Column } from './WashCard.styled';
import { Wash } from '../../interfaces/types';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuLink from '../DropdownMenuLink/DropdownMenuLink';

const WashCard: React.FC<Wash> = ({ name, city }) => {
  return (
    <Container>
      <Column>{name}</Column>
      <Column>{city}</Column>
      <Column>17</Column>
      <Column>Активна</Column>
      <DropdownMenu>
        <DropdownMenuLink>Статистика</DropdownMenuLink>
        <DropdownMenuLink>Редактировать</DropdownMenuLink>
        <hr />
        <DropdownMenuLink>Архивировать</DropdownMenuLink>
      </DropdownMenu>
    </Container>
  );
};

export default WashCard;
