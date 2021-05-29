import React from 'react';

import { Container } from './PromotionsList.styled';
import ListHeader from '../ListHeader/ListHeader';
import PromotionCardSkeleton from '../PromotionCardSkeleton/PromotionCardSkeleton';
import PromotionCard from '../PromotionCard/PromotionCard';

const PromotionsList: React.FC = () => {
  return (
    <Container>
      <ListHeader titles={['Название', 'Активность', 'Описание акции']} />
      <PromotionCardSkeleton />
      <PromotionCardSkeleton />
      <PromotionCardSkeleton />
      <PromotionCard />
      <PromotionCard />
      <PromotionCard />
    </Container>
  );
};

export default PromotionsList;
