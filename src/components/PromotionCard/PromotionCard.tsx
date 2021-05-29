import React from 'react';

import { Container, Column } from './PromotionCard.styled';
import { Switch } from '@chakra-ui/react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuLink from '../DropdownMenuLink/DropdownMenuLink';

const PromotionCard: React.FC = () => {
  return (
    <Container>
      <Column>Бесплатная полировка при комплексной чистке</Column>
      <Column>
        <Switch id={'active'} size={'lg'} />
      </Column>
      <Column>
        Полировка для машин еще никогда не была такой выгодной! Получит ее
        бесплатно при условии заказа у нас комплексной чистка автомобиля
      </Column>
      <DropdownMenu>
        <DropdownMenuLink>Редактировать</DropdownMenuLink>
        <hr />
        <DropdownMenuLink>Удалить</DropdownMenuLink>
      </DropdownMenu>
    </Container>
  );
};

export default PromotionCard;
