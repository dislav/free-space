import React from 'react';
import { useTheme } from 'styled-components';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import { useMediaQuery } from 'react-responsive';

import { Container } from './Pagination.styled';

interface IPagination extends ReactPaginateProps {
  className?: string;
}

const Pagination: React.FC<IPagination> = ({
  className,
  previousLabel = 'Назад',
  nextLabel = 'Вперед',
  breakLabel = '...',
  marginPagesDisplayed = 2,
  pageRangeDisplayed = 5,
  ...props
}) => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery({ maxWidth: breakpoints.xl });

  const marginDisplayed = isMobile ? 1 : marginPagesDisplayed;
  const pageDisplayed = isMobile ? 1 : pageRangeDisplayed;

  return (
    <Container className={className}>
      <ReactPaginate
        {...props}
        previousLabel={previousLabel}
        nextLabel={nextLabel}
        breakLabel={breakLabel}
        marginPagesDisplayed={marginDisplayed}
        pageRangeDisplayed={pageDisplayed}
      />
    </Container>
  );
};

export default Pagination;
