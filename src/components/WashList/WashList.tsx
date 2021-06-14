import React from 'react';
import useSwr from 'swr';

import { Wash } from '../../interfaces/types';

import { Container } from './WashList.styled';
import ListHeader from '../ListHeader/ListHeader';
import WashCard from '../WashCard/WashCard';
import WashCardSkeleton from '../WashCardSkeleton/WashCardSkeleton';
import SearchForm from '../SearchForm/SearchForm';

const WashList: React.FC = () => {
  const { data, error } = useSwr<Wash[]>('/wash/list');

  if (!data && !error)
    return (
      <Container>
        <ListHeader
          titles={['Название', 'Город', 'Заявки за неделю', 'Статус']}
        />
        <WashCardSkeleton />
        <WashCardSkeleton />
        <WashCardSkeleton />
      </Container>
    );

  return (
    <Container>
      <SearchForm />
      <ListHeader
        titles={['Название', 'Город', 'Заявки за неделю', 'Статус']}
      />
      {data?.map((wash, index) => (
        <WashCard key={index} {...wash} />
      ))}
    </Container>
  );
};

export default WashList;
