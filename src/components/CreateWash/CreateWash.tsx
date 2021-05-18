import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';

import { Container, Form, Input, Button } from './CreateWash.styled';

interface Inputs {
  title: string;
  city: string;
  address: string;
  phone: string;
  time: string;
}

const CreateWash: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.title}>
          <Input
            placeholder={'Название объекта'}
            {...register('title', {
              required: 'Обязательное поле',
            })}
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.city}>
          <Input
            placeholder={'Город'}
            {...register('city', {
              required: 'Обязательное поле',
            })}
          />
          <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.address}>
          <Input
            placeholder={'Адрес'}
            {...register('address', {
              required: 'Обязательное поле',
            })}
          />
          <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.phone}>
          <Input
            placeholder={'Телефон'}
            {...register('phone', {
              required: 'Обязательное поле',
            })}
          />
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </FormControl>
        <Button>Добавить</Button>
      </Form>
    </Container>
  );
};

export default CreateWash;
