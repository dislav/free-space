import React from 'react';
import { useTheme } from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormControl, FormErrorMessage, Input, Button } from '@chakra-ui/react';

import { Container, Column } from './ServiceForm.styled';

interface Inputs {
  name: string;
  description: string;
  price1: string;
}

const ServiceForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const { colors, variables } = useTheme();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Column>
        <FormControl isInvalid={!!errors.name}>
          <Input
            bg={colors.white}
            h={'60px'}
            borderRadius={variables.borderRadius}
            placeholder={'Название'}
            {...register('name', { required: 'Обязательное поле' })}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.description}>
          <Input
            bg={colors.white}
            h={'60px'}
            borderRadius={variables.borderRadius}
            placeholder={'Описание услуги'}
            {...register('description')}
          />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>
        <Button
          h={'60px'}
          bg={variables.blueGradient}
          borderRadius={variables.borderRadius}
          _hover={{
            bg: variables.blueGradient,
            opacity: 0.8,
          }}
          type={'submit'}
        >
          Добавить
        </Button>
      </Column>
      <Column></Column>
    </Container>
  );
};

export default ServiceForm;
