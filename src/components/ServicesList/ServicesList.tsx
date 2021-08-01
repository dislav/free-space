import React, { useState } from 'react';
import useSwr from 'swr';

import { PaginationProps, Service } from '../../interfaces/types';

import { Container } from './ServicesList.styled';
import ServiceCard from '../ServiceCard/ServiceCard';
import Pagination from '../Pagination/Pagination';

const ServicesList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error } = useSwr<PaginationProps<Service[]>>(
    `/services/${currentPage > 1 ? `/${currentPage}` : ''}`
  );

  return (
    <>
      <Container
        titles={['Название', 'Акция', 'Описание услуги', 'Цена']}
        isLoading={!data && !error}
        isEmpty={!data?.list?.length}
      >
        {data?.list.map((service) => (
          <ServiceCard key={service.id} {...service} />
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

export default ServicesList;
