import React from 'react';
import useSwr from 'swr';

import { Promotion } from '../../interfaces/types';

import { Container } from './PromotionsList.styled';
import PromotionCard from '../PromotionCard/PromotionCard';

const PromotionsList: React.FC = () => {
  const { data, error, mutate } = useSwr<Promotion[]>('/promo/list');
  const isAdmin = localStorage.getItem('group') === '1';

  const titles = isAdmin
    ? ['Название', 'Описание акции']
    : ['Название', 'Активность', 'Описание акции'];

  return (
    <Container isLoading={!data && !error} titles={titles}>
      {data?.map((promotion) => (
        <PromotionCard key={promotion.id} onActivate={mutate} {...promotion} />
      ))}
    </Container>
  );
};

export default PromotionsList;
