import React from 'react';

import { useServices } from '../../lib/useServices';

import { Container } from './ServicesList.styled';
import ListHeader from '../ListHeader/ListHeader';
import ServiceCard from '../ServiceCard/ServiceCard';
import WashCardSkeleton from '../WashCardSkeleton/WashCardSkeleton';

const ServicesList: React.FC = () => {
  const { services, loading } = useServices();

  if (loading)
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
      {services?.list.map((service) => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </Container>
  );
};

export default ServicesList;
