import React from 'react';
import useSwr from 'swr';

import { Promotion } from '../../interfaces/types';

import { Container } from './PromotionsList.styled';
import PromotionCard from '../PromotionCard/PromotionCard';

const PromotionsList: React.FC = () => {
  const { data, error, mutate } = useSwr<Promotion[]>('/promo/list');

  return (
    <Container
      isLoading={!data && !error}
      titles={['Название', 'Активность', 'Описание акции']}
    >
      {data?.map((promotion) => (
        <PromotionCard key={promotion.id} onActivate={mutate} {...promotion} />
      ))}
    </Container>
  );
};

export default PromotionsList;
