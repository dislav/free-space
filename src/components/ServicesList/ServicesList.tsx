import React from 'react';

import { Container } from './ServicesList.styled';
import ListHeader from '../ListHeader/ListHeader';
import ServiceCard from '../ServiceCard/ServiceCard';

const ServicesList: React.FC = () => {
  return (
    <Container>
      <ListHeader titles={['Название', 'Акция', 'Описание услуги', 'Цена']} />
      <ServiceCard />
      <ServiceCard />
      <ServiceCard />
    </Container>
  );
};

export default ServicesList;
