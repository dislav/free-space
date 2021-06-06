import React, { useEffect } from 'react';

import { getWashesRequest } from '../../store/washes/actions';
import { getWashesState } from '../../store/washes/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { Container } from './WashList.styled';
import ListHeader from '../ListHeader/ListHeader';
import WashCard from '../WashCard/WashCard';
import WashCardSkeleton from '../WashCardSkeleton/WashCardSkeleton';
import SearchForm from '../SearchForm/SearchForm';

const WashList: React.FC = () => {
  const dispatch = useAppDispatch();
  const washes = useAppSelector(getWashesState);

  useEffect(() => {
    dispatch(getWashesRequest());
  }, [dispatch]);

  if (washes.washesStatus.status === 'failed')
    return <Container>Ошибка загрузки данных.</Container>;

  if (washes.washesStatus.status === 'loading')
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
      {washes.washes.map((wash, index) => (
        <WashCard key={index} {...wash} />
      ))}
    </Container>
  );
};

export default WashList;
