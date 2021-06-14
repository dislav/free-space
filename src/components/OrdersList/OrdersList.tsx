import React from 'react';
import useSwr from 'swr';

import { BaseService, CarBody, Order } from '../../interfaces/types';

import { Container } from './OrdersList.styled';
import ListHeader from '../ListHeader/ListHeader';
import OrderCard from '../OrderCard/OrderCard';
import WashCardSkeleton from '../WashCardSkeleton/WashCardSkeleton';

const OrdersList: React.FC = () => {
  const { data: bodies } = useSwr<CarBody[]>('/guide/body');
  const { data: services } = useSwr<BaseService[]>('/guide/service_list');
  const { data: orders, error } = useSwr<Order[]>('/order/list');

  if (!orders && !error)
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
        <OrderCard
          {...order}
          key={order.id}
          bodies={bodies}
          servicesList={services}
        />
      ))}
    </Container>
  );
};

export default OrdersList;
