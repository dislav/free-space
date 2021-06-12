import React from 'react';

import { useWash } from '../../lib/useWash';
import { Container } from './WashList.styled';
import ListHeader from '../ListHeader/ListHeader';
import WashCard from '../WashCard/WashCard';
import WashCardSkeleton from '../WashCardSkeleton/WashCardSkeleton';
import SearchForm from '../SearchForm/SearchForm';

const WashList: React.FC = () => {
  const { washes, loading } = useWash();

  if (loading)
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
      {washes?.map((wash, index) => (
        <WashCard key={index} {...wash} />
      ))}
    </Container>
  );
};

export default WashList;
