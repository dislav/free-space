import React from 'react';

import { useBoxes } from '../../lib/useBoxes';

import { Container } from './BoxesList.styled';
import BoxCard from '../BoxCard/BoxCard';

const BoxesList: React.FC = () => {
  const { boxes, loading } = useBoxes();

  return (
    <Container isLoading={loading} titles={['Номер бокса', 'Статус']}>
      {boxes?.map((box) => (
        <BoxCard key={box.id} {...box} />
      ))}
    </Container>
  );
};

export default BoxesList;
