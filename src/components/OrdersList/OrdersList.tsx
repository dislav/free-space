import React from 'react';

import { Container } from './OrdersList.styled';
import ListHeader from '../ListHeader/ListHeader';
import OrderCard from '../OrderCard/OrderCard';

const OrdersList: React.FC = () => {
  return (
    <Container>
      <ListHeader
        titles={[
          'Тип кузова',
          'Дата посещения',
          'Вид услуг',
          'Телефон',
          'Бокс',
          'Цена',
        ]}
      />
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </Container>
  );
};

export default OrdersList;
