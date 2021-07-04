import React, { useState } from 'react';
import useSwr from 'swr';

import { PaginationProps, Promotion } from '../../interfaces/types';

import { Container } from './PromotionsList.styled';
import PromotionCard from '../PromotionCard/PromotionCard';
import Pagination from '../Pagination/Pagination';

const PromotionsList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, mutate } = useSwr<PaginationProps<Promotion[]>>(
    `/promo/list${currentPage > 1 ? `/${currentPage}` : ''}`
  );

  return (
    <>
      <Container
        titles={['Название', 'Активность', 'Описание акции']}
        isLoading={!data && !error}
        isEmpty={!data?.list.length}
      >
        {data?.list.map((promotion) => (
          <PromotionCard
            key={promotion.id}
            onActivate={mutate}
            {...promotion}
          />
        ))}
      </Container>
      <Pagination
        pageCount={data?.page_count || 1}
        pageRangeDisplayed={2}
        marginPagesDisplayed={5}
        onPageChange={({ selected }) => setCurrentPage(selected + 1)}
      />
    </>
  );
};

export default PromotionsList;
