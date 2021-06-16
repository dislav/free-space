import React from 'react';
import useSwr from 'swr';

import { Service } from '../../interfaces/types';

import { Container } from './ServicesList.styled';
import ServiceCard from '../ServiceCard/ServiceCard';

const ServicesList: React.FC = () => {
  const { data, error } = useSwr<{ list: Service[] }>('/services');

  return (
    <Container
      isLoading={!data && !error}
      titles={['Название', 'Акция', 'Описание услуги', 'Цена']}
    >
      {data?.list.map((service) => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </Container>
  );
};

export default ServicesList;
