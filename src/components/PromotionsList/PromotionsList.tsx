import React from 'react';

import { Container } from './PromotionsList.styled';
import ListHeader from '../ListHeader/ListHeader';
import PromotionCard from '../PromotionCard/PromotionCard';

const PromotionsList: React.FC = () => {
  return (
    <Container>
      <ListHeader titles={['Название', 'Активность', 'Описание акции']} />
      <PromotionCard />
      <PromotionCard />
      <PromotionCard />
    </Container>
  );
};

export default PromotionsList;
