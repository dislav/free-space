import React from 'react';

import { useBoxes } from '../../lib/useBoxes';

import { Container } from './BoxesList.styled';
import BoxCard from '../BoxCard/BoxCard';

const BoxesList: React.FC = () => {
  const { boxes, loading } = useBoxes();

  return (
    <Container
      titles={['Номер бокса', 'Статус']}
      isLoading={loading}
      isEmpty={!boxes?.length}
    >
      {boxes?.map((box, index) => (
        <BoxCard key={box.id} number={index + 1} {...box} />
      ))}
    </Container>
  );
};

export default BoxesList;
