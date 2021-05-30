import React from 'react';

import { Container, Column } from './ServiceCard.styled';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuLink from '../DropdownMenuLink/DropdownMenuLink';

const ServiceCard: React.FC = () => {
  return (
    <Container>
      <Column>Полировка кузова</Column>
      <Column>Действует</Column>
      <Column>
        Полировка для машин еще никогда не была такой выгодной! Получит ее
        бесплатно при условии заказа у нас комплексной чистка автомобиля
      </Column>
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
