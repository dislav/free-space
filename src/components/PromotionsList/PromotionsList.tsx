import React from 'react';

import { usePromotion } from '../../lib/usePromotion';
import { Container } from './PromotionsList.styled';
import ListHeader from '../ListHeader/ListHeader';
import PromotionCard from '../PromotionCard/PromotionCard';
import WashCardSkeleton from '../WashCardSkeleton/WashCardSkeleton';

const PromotionsList: React.FC = () => {
  const { promotions, loading } = usePromotion();

  if (loading)
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
      {promotions?.map((promotion) => (
        <PromotionCard key={promotion.id} {...promotion} />
      ))}
    </Container>
  );
};

export default PromotionsList;
