import React from 'react';
import { Select } from '@chakra-ui/react';

import { OptionProps } from '../../interfaces/types';

import {
  Container,
  Header,
  Titles,
  Column,
  EmptyList,
} from './TableList.styled';
import WashCardSkeleton from '../WashCardSkeleton/WashCardSkeleton';
import { SadIcon } from '../../icons/icons';

interface TitleOption {
  title: string;
  onChangeParam?: (value: string) => void;
  options?: OptionProps[];
}

interface ITableList {
  className?: string;
  header?: React.ReactNode;
  titles?: Array<string | TitleOption>;
  isLoading?: boolean;
  isEmpty?: boolean;
}

const isTitleOption = (title: string | TitleOption): title is TitleOption =>
  (title as TitleOption).title !== undefined;

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
              <Select
                variant={'unstyled'}
                placeholder={title.title}
                onChange={({ target }) => title.onChangeParam?.(target.value)}
              >
                {title.options?.map(({ label, value }, key) => (
                  <option key={key} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
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
