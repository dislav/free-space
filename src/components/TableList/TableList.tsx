import React from 'react';

import {
  Container,
  Header,
  Titles,
  TitleHead,
  Column,
  EmptyList,
} from './TableList.styled';
import WashCardSkeleton from '../WashCardSkeleton/WashCardSkeleton';
import { SadIcon } from '../../icons/icons';

interface Title {
  title: string;
  isSortable?: boolean;
  onChangeParam?: (value: boolean) => void;
}

interface ITableList {
  className?: string;
  header?: React.ReactNode;
  titles?: Array<string | Title>;
  isLoading?: boolean;
  isEmpty?: boolean;
}

const isTitleOption = (title: string | Title): title is Title =>
  (title as Title).title !== undefined;

const TableList: React.FC<ITableList> = ({
  children,
  className,
  header,
  titles,
  isLoading,
  isEmpty,
}) => {
  if (isLoading)
    return (
      <Container className={className}>
        <WashCardSkeleton />
        <WashCardSkeleton />
        <WashCardSkeleton />
      </Container>
    );

  return (
    <Container className={className}>
      <Header>{header}</Header>
      <Titles>
        {titles?.map((title, index) => (
          <Column key={index}>
            {isTitleOption(title) ? (
              <TitleHead
                onClick={() => title.onChangeParam?.(!title.isSortable)}
              >
                {title.title}
                {title.isSortable?.toString()}
              </TitleHead>
            ) : (
              title
            )}
          </Column>
        ))}
      </Titles>
      {isEmpty ? (
        <EmptyList>
          Список пуст
          <SadIcon />
        </EmptyList>
      ) : (
        children
      )}
    </Container>
  );
};

export default TableList;
