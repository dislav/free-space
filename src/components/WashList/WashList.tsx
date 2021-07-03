import React, { useState, useMemo } from 'react';
import { Select } from '@chakra-ui/react';
import useSwr from 'swr';

import { City, Wash, PaginationProps } from '../../interfaces/types';
import { getOrders } from '../../lib/api';

import { Container, Header, Section } from './WashList.styled';
import WashCard from '../WashCard/WashCard';
import SearchForm, { IInputs } from '../SearchForm/SearchForm';

const WashList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [citySort, setCitySort] = useState(false);

  const { data, error, mutate } = useSwr<PaginationProps<Wash[]>>('/wash/list');
  const { data: cities } = useSwr<City[]>('/guide/cites');

  const optionsCities = useMemo(
    () =>
      cities
        ?.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        })
        .map(({ name }) => ({ value: name, label: name })),
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

  const categoriesWashes = useMemo(() => {
    const categories = new Map<string, Wash[]>();
    data?.list.forEach((wash) => {
      categories.set(
        wash.active,
        categories.has(wash.active)
          ? [...(categories.get(wash.active) as Wash[]), wash]
          : [wash]
      );
    });

    return categories;
  }, [data?.list]);

  const statusTitle: {
    [key: number]: string;
  } = {
    0: 'Неактивные мойки',
    1: 'Активные мойки',
  };

  const onChangeSearch = ({ search }: IInputs) => {
    setSearch(search);
  };

  const onChangeCity = (value: string) => {
    setCity(value);
  };

  return (
    <Container
      header={
        <Header>
          <SearchForm searchText={search} onSearch={onChangeSearch} />
          <Select
            variant={'unstyled'}
            placeholder={'Город'}
            onChange={({ target }) => onChangeCity(target.value)}
          >
            {optionsCities?.map(({ label, value }, key) => (
              <option key={key} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Header>
      }
      titles={[
        'Название',
        {
          title: 'Город',
          isSortable: citySort,
          onChangeParam: setCitySort,
        },
        'Статус',
      ]}
      isLoading={!data && !error}
      isEmpty={!data?.list.length}
    >
      {Array.from(categoriesWashes.keys())
        ?.sort((a, b) => +b - +a)
        .map((status) => (
          <Section key={status}>
            <h2>{statusTitle[+status]}</h2>
            {categoriesWashes.get(status)?.map((wash) => (
              <WashCard key={wash.id} {...wash} />
            ))}
          </Section>
        ))}
    </Container>
  );
};

export default WashList;
