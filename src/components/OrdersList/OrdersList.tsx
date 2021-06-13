import React from 'react';

import { useOrders } from '../../lib/useOrders';
import { useCarBodies } from '../../lib/useCarBodies';

import { Container } from './OrdersList.styled';
import ListHeader from '../ListHeader/ListHeader';
import OrderCard from '../OrderCard/OrderCard';
import WashCardSkeleton from '../WashCardSkeleton/WashCardSkeleton';

const OrdersList: React.FC = () => {
  const { orders, loading } = useOrders();
  const { bodies } = useCarBodies();

  if (loading)
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
        <WashCardSkeleton />
        <WashCardSkeleton />
        <WashCardSkeleton />
      </Container>
    );

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
      {orders?.map((order) => (
        <OrderCard key={order.id} {...order} bodies={bodies} />
      ))}
    </Container>
  );
};

export default OrdersList;
