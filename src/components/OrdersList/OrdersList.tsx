import React from 'react';
import useSwr from 'swr';

import { BaseService, CarBody } from '../../interfaces/types';

import { Container } from './OrdersList.styled';
import OrderCard from '../OrderCard/OrderCard';
import { useOrders } from '../../lib/useOrders';

const OrdersList: React.FC = () => {
  const { data: bodies } = useSwr<CarBody[]>('/guide/body');
  const { data: services } = useSwr<BaseService[]>('/guide/service_list');
  const { orders, isLoading } = useOrders();

  return (
    <Container
      titles={[
        'Тип кузова',
        'Дата посещения',
        'Вид услуг',
        'Телефон',
        'Бокс',
        'Цена',
      ]}
      isLoading={isLoading}
      isEmpty={!orders?.length}
    >
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
