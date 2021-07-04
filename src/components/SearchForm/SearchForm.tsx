import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTheme } from 'styled-components';

import { Input, Button } from '@chakra-ui/react';

import { Container } from './SearchForm.styled';

export interface IInputs {
  search: string;
}

interface ISearchForm {
  searchText?: string;
  onSearch?: (value: IInputs) => void;
}

const SearchForm: React.FC<ISearchForm> = ({ searchText, onSearch }) => {
  const { handleSubmit, register, reset } = useForm<IInputs>();

  const { colors, variables } = useTheme();

  const onSubmit: SubmitHandler<IInputs> = (data) => {
    onSearch?.(data);
  };

  const onReset = () => {
    onSearch?.({ search: '' });
    reset({ search: '' });
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Input
        bg={colors.white}
        borderRadius={variables.borderRadius}
        mr={'14px'}
        maxW={['auto', 'auto', '210px']}
        placeholder={'Поиск'}
        {...register('search')}
      />
      {!searchText ? (
        <Button
          borderRadius={variables.borderRadius}
          minW={'80px'}
          type={'submit'}
        >
          Поиск
        </Button>
      ) : (
        <Button
          borderRadius={variables.borderRadius}
          minW={'80px'}
          onClick={onReset}
        >
          Сбросить
        </Button>
      )}
      {searchText && <p>Найдено по запросу «{searchText}»</p>}
    </Container>
  );
};

export default SearchForm;
