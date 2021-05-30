import React from 'react';

import { Container } from './BoxesList.styled';
import ListHeader from '../ListHeader/ListHeader';
import BoxCard from '../BoxCard/BoxCard';

const BoxesList: React.FC = () => {
  return (
    <Container>
      <ListHeader titles={['Номер бокса', 'Статус']} />
      <BoxCard />
      <BoxCard />
      <BoxCard />
    </Container>
  );
};

export default BoxesList;
