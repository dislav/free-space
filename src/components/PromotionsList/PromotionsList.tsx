import React from 'react';
import useSwr from 'swr';

import { Promotion } from '../../interfaces/types';

import { Container } from './PromotionsList.styled';
import ListHeader from '../ListHeader/ListHeader';
import PromotionCard from '../PromotionCard/PromotionCard';
import WashCardSkeleton from '../WashCardSkeleton/WashCardSkeleton';

const PromotionsList: React.FC = () => {
  const { data, error, mutate } = useSwr<Promotion[]>('/promo/list');

  if (!data && !error)
    return (
      <Container>
        <ListHeader titles={['Название', 'Активность', 'Описание акции']} />
        <WashCardSkeleton />
        <WashCardSkeleton />
        <WashCardSkeleton />
      </Container>
    );

  return (
    <Container>
      <ListHeader titles={['Название', 'Активность', 'Описание акции']} />
      {data?.map((promotion) => (
        <PromotionCard key={promotion.id} onActivate={mutate} {...promotion} />
      ))}
    </Container>
  );
};

export default PromotionsList;
