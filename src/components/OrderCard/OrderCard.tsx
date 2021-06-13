import React from 'react';

import { CarBody, Order } from '../../interfaces/types';
import { Container, Column, Tag } from './OrderCard.styled';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuLink from '../DropdownMenuLink/DropdownMenuLink';

interface IOrderCard extends Order {
  bodies?: CarBody[];
}

const OrderCard: React.FC<IOrderCard> = ({
  body,
  bodies,
  date,
  time,
  phone,
  box,
  price,
}) => {
  const carBody = bodies?.find(({ id }) => id === body);

  return (
    <Container>
      <Column>{carBody?.name}</Column>
      <Column>
        {date} {time}
      </Column>
      <Column>
        <Tag>Ручная мойка кузова</Tag>
        <Tag>Полировка кузова</Tag>
      </Column>
      <Column>{phone.length > 0 ? phone : '—'}</Column>
      <Column>
        <span>Бокс #</span>
        {box}
      </Column>
      <Column>{price.length > 0 ? `${price} ₽` : '—'}</Column>
      <DropdownMenu>
        <DropdownMenuLink>Принять</DropdownMenuLink>
        <DropdownMenuLink>Отклонить</DropdownMenuLink>
      </DropdownMenu>
    </Container>
  );
};

export default OrderCard;
