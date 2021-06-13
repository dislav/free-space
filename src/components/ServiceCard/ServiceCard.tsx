import React from 'react';

import { BaseService } from '../../interfaces/types';

import { Container, Column } from './ServiceCard.styled';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuLink from '../DropdownMenuLink/DropdownMenuLink';

const ServiceCard: React.FC<BaseService> = ({ name, about }) => {
  return (
    <Container>
      <Column>{name}</Column>
      <Column>Действует</Column>
      <Column>{about}</Column>
      <Column>920 ₽</Column>
      <DropdownMenu>
        <DropdownMenuLink>Изменить</DropdownMenuLink>
        <hr />
        <DropdownMenuLink>Удалить</DropdownMenuLink>
      </DropdownMenu>
    </Container>
  );
};

export default ServiceCard;
