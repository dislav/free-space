import React from 'react';
import useSwr from 'swr';

import { Service } from '../../interfaces/types';

import { Container } from './ServicesList.styled';
import ServiceCard from '../ServiceCard/ServiceCard';

const ServicesList: React.FC = () => {
  const { data, error } = useSwr<{ list: Service[] }>('/services');

  return (
    <Container
      titles={['Название', 'Акция', 'Описание услуги', 'Цена']}
      isLoading={!data && !error}
      isEmpty={!data?.list?.length}
    >
      {data?.list.map((service) => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </Container>
  );
};

export default ServicesList;
