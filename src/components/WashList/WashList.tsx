import React, { useState, useMemo } from 'react';
import useSwr from 'swr';

import { City, Wash } from '../../interfaces/types';
import { getOrders } from '../../lib/api';

import { Container } from './WashList.styled';
import WashCard from '../WashCard/WashCard';
import SearchForm, { IInputs } from '../SearchForm/SearchForm';

const WashList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');

  const { data, error, mutate } = useSwr<Wash[]>('/wash/list');
  const { data: cities } = useSwr<City[]>('/guide/cites');

  const optionsCities = useMemo(
    () => cities?.map(({ name }) => ({ value: name, label: name })),
    [cities]
  );

  useMemo(async () => {
    try {
      const response = await getOrders({
        search,
        city,
      });

      mutate(response.data.data, false);
    } catch (e) {
      console.log(e);
    }
  }, [search, city]);

  const onChangeSearch = ({ search }: IInputs) => {
    setSearch(search);
  };

  const onChangeCity = (value: string) => {
    setCity(value);
  };

  return (
    <Container
      header={<SearchForm searchText={search} onSearch={onChangeSearch} />}
      titles={[
        'Название',
        { title: 'Город', options: optionsCities, onChangeParam: onChangeCity },
        'Статус',
      ]}
      isLoading={!data && !error}
      isEmpty={!data?.length}
    >
      {data?.map((wash, index) => (
        <WashCard key={index} {...wash} />
      ))}
    </Container>
  );
};

export default WashList;
