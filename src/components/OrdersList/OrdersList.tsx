import React, { useState, useMemo } from 'react';
import useSwr from 'swr';
import useSound from 'use-sound';

import { CarBody, Service, Order } from '../../interfaces/types';
import { useOrders } from '../../lib/useOrders';

import { Container, Section } from './OrdersList.styled';
import OrderCard from '../OrderCard/OrderCard';
import Pagination from '../Pagination/Pagination';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import notificationSound from '../../sounds/notification.mp3';

const OrdersList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: bodies } = useSwr<CarBody[]>('/guide/body');
  const { data: services } = useSwr<{ list: Service[] }>('/services');
  const { orders, isLoading } = useOrders(currentPage);

  const [playNotification] = useSound(notificationSound);

  useMemo(() => {
    if (orders?.list.length) playNotification();
  }, [orders, playNotification]);

  const categoriesOrders = useMemo(() => {
    const categories = new Map<string, Order[]>();
    orders?.list.forEach((order) => {
      categories.set(
        order.status,
        categories.has(order.status)
          ? [...(categories.get(order.status) as Order[]), order]
          : [order]
      );
    });

    return categories;
  }, [orders?.list]);

  const statusTitle: {
    [key: number]: string;
  } = {
    0: 'Новые заявки',
    1: 'Принятые заявки',
    2: 'Завершенные заявки',
    3: 'Отмененные заявки',
  };

  return (
    <>
      <Container
        titles={[
          'Тип кузова',
          'Дата посещения',
          'Вид услуг',
          'Телефон',
          'Имя',
          'Бокс',
          'Цена',
        ]}
        isLoading={isLoading}
        isEmpty={!orders?.list.length}
      >
        {Array.from(categoriesOrders?.keys() || []).map((status) => (
          <Section key={status}>
            <h2>{statusTitle[+status]}</h2>
            {categoriesOrders
              .get(status)
              ?.sort((a, b) => +b - +a)
              .map((order) => (
                <OrderCard
                  {...order}
                  key={order.id}
                  bodies={bodies}
                  servicesList={services?.list}
                />
              ))}
          </Section>
        ))}
      </Container>
      <Pagination
        pageCount={orders?.page_count || 1}
        pageRangeDisplayed={2}
        marginPagesDisplayed={5}
        onPageChange={({ selected }) => setCurrentPage(selected + 1)}
      />
    </>
  );
};

export default OrdersList;
