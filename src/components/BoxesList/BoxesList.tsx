import React from 'react';

import { useBoxes } from '../../lib/useBoxes';

import { Container } from './BoxesList.styled';
import ListHeader from '../ListHeader/ListHeader';
import BoxCard from '../BoxCard/BoxCard';
import WashCardSkeleton from '../WashCardSkeleton/WashCardSkeleton';

const BoxesList: React.FC = () => {
  const { boxes, loading } = useBoxes();

  if (loading)
    return (
      <Container>
        <ListHeader titles={['Номер бокса', 'Статус']} />
        <WashCardSkeleton />
        <WashCardSkeleton />
        <WashCardSkeleton />
      </Container>
    );

  return (
    <Container>
      <ListHeader titles={['Номер бокса', 'Статус']} />
      {boxes?.map((box) => (
        <BoxCard key={box.id} {...box} />
      ))}
    </Container>
  );
};

export default BoxesList;
