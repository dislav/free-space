import React from 'react';
import useSwr from 'swr';

import { PaginationProps, Promotion } from '../../interfaces/types';

import { Container } from './PromotionsList.styled';
import PromotionCard from '../PromotionCard/PromotionCard';

const PromotionsList: React.FC = () => {
  const { data, error, mutate } =
    useSwr<PaginationProps<Promotion[]>>('/promo/list');

  return (
    <Container
      titles={['Название', 'Активность', 'Описание акции']}
      isLoading={!data && !error}
      isEmpty={!data?.list.length}
    >
      {data?.list.map((promotion) => (
        <PromotionCard key={promotion.id} onActivate={mutate} {...promotion} />
      ))}
    </Container>
  );
};

export default PromotionsList;
