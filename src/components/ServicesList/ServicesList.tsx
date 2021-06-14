import React from 'react';
import useSwr from 'swr';

import { Service, ServicePrice } from '../../interfaces/types';

import { Container } from './ServicesList.styled';
import ListHeader from '../ListHeader/ListHeader';
import ServiceCard from '../ServiceCard/ServiceCard';
import WashCardSkeleton from '../WashCardSkeleton/WashCardSkeleton';

const ServicesList: React.FC = () => {
  const { data, error } =
    useSwr<{
      list: Service[];
      price: ServicePrice[];
    }>('/services');

  if (!data && !error)
    return (
      <Container>
        <ListHeader titles={['Название', 'Акция', 'Описание услуги', 'Цена']} />
        <WashCardSkeleton />
        <WashCardSkeleton />
        <WashCardSkeleton />
      </Container>
    );

  return (
    <Container>
      <ListHeader titles={['Название', 'Акция', 'Описание услуги', 'Цена']} />
      {data?.list.map((service) => (
        <ServiceCard key={service.id} {...service} prices={data?.price} />
      ))}
    </Container>
  );
};

export default ServicesList;
