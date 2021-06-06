import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTheme } from 'styled-components';
import { Input, Button } from '@chakra-ui/react';

import { Container } from './SearchForm.styled';

interface IInputs {
  search: string;
}

const SearchForm: React.FC = () => {
  const { handleSubmit, register } = useForm<IInputs>();

  const { colors, variables } = useTheme();

  const onSubmit: SubmitHandler<IInputs> = async (data) => {
    console.log(data);
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Input
        bg={colors.white}
        borderRadius={variables.borderRadius}
        mr={'14px'}
        maxW={'210px'}
        placeholder={'Поиск'}
        {...register('search')}
      />
      <Button borderRadius={variables.borderRadius} type={'submit'}>
        Поиск
      </Button>
    </Container>
  );
};

export default SearchForm;
