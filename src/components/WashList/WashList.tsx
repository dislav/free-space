import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import useSwr from 'swr';

import { City, Wash, PaginationProps } from '../../interfaces/types';

import { Container, Header, Section } from './WashList.styled';
import WashCard from '../WashCard/WashCard';
import SearchForm, { IInputs } from '../SearchForm/SearchForm';
import Pagination from '../Pagination/Pagination';

const WashList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [citySort, setCitySort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const params = useMemo(() => {
    const sortType = citySort ? 'desc' : 'asc';

    return `?order_sort=city+${sortType}${city.length ? `&city=${city}` : ''}${
      search.length ? `&search=${search}` : ''
    }`;
  }, [search, city, citySort]);

  const { data, error } = useSwr<PaginationProps<Wash[]>>(
    `/wash/list${currentPage > 1 ? `/${currentPage}` : ''}${params}`
  );
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

  return (
    <>
      <Container
        header={
          <Header>
            <SearchForm searchText={search} onSearch={onChangeSearch} />
            <Select
              placeholder={'Город'}
              className={'react-select'}
              classNamePrefix={'react-select'}
              defaultValue={city ? { value: city, label: city } : null}
              options={optionsCities}
              onChange={(option) => setCity(option?.value || '')}
              isClearable={true}
            />
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
      <Pagination
        pageCount={data?.page_count || 1}
        pageRangeDisplayed={2}
        marginPagesDisplayed={5}
        onPageChange={({ selected }) => setCurrentPage(selected + 1)}
      />
    </>
  );
};

export default WashList;
