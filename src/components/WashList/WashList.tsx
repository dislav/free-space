import React from 'react';
import useSwr from 'swr';

import { Wash } from '../../interfaces/types';

import { Container } from './WashList.styled';
import WashCard from '../WashCard/WashCard';

const WashList: React.FC = () => {
  const { data, error } = useSwr<Wash[]>('/wash/list');

  return (
    <Container
      isLoading={!data && !error}
      titles={['Название', 'Город', 'Заявки за неделю', 'Статус']}
    >
      {data?.map((wash, index) => (
        <WashCard key={index} {...wash} />
      ))}
    </Container>
  );
};

export default WashList;
