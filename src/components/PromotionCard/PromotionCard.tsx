import React from 'react';

import { Container, Column } from './PromotionCard.styled';
import { Switch } from '@chakra-ui/react';

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
    </Container>
  );
};

export default PromotionCard;
