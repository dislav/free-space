import React from 'react';

import { Container, Column, Tag } from './OrderCard.styled';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuLink from '../DropdownMenuLink/DropdownMenuLink';

const OrderCard: React.FC = () => {
  return (
    <Container>
      <Column>Хетчбэк</Column>
      <Column>30.05.2021 11:35</Column>
      <Column>
        <Tag>Ручная мойка кузова</Tag>
        <Tag>Полировка кузова</Tag>
      </Column>
      <Column>+7 (344) 443 34 33</Column>
      <Column>
        <span>Бокс #</span>1
      </Column>
      <Column>920 ₽</Column>
      <DropdownMenu>
        <DropdownMenuLink>Принять</DropdownMenuLink>
        <DropdownMenuLink>Отклонить</DropdownMenuLink>
      </DropdownMenu>
    </Container>
  );
};

export default OrderCard;
