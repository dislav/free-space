import React from 'react';

import { Container, Titles, Column } from './TableList.styled';
import WashCardSkeleton from '../WashCardSkeleton/WashCardSkeleton';

interface ITableList {
  className?: string;
  titles?: string[];
  isLoading: boolean;
}

const TableList: React.FC<ITableList> = ({
  children,
  className,
  titles,
  isLoading,
}) => {
  if (isLoading)
    return (
      <Container className={className}>
        <Titles>
          {titles?.map((title, index) => (
            <Column key={index}>{title}</Column>
          ))}
        </Titles>
        <WashCardSkeleton />
        <WashCardSkeleton />
        <WashCardSkeleton />
      </Container>
    );

  return (
    <Container className={className}>
      <Titles>
        {titles?.map((title, index) => (
          <Column key={index}>{title}</Column>
        ))}
      </Titles>
      {children}
    </Container>
  );
};

export default TableList;
