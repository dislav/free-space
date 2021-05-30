import React from 'react';
import { useTheme } from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';

import { Container, Column } from './ServiceForm.styled';

interface Inputs {
  name: string;
  description: string;
  hatchback: string;
  sedan: string;
  truck: string;
  stationWagon: string;
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
        <FormControl isInvalid={!!errors.name} mb={'32px'}>
          <Input
            bg={colors.white}
            h={'60px'}
            borderRadius={variables.borderRadius}
            placeholder={'Название'}
            {...register('name', { required: 'Обязательное поле' })}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <Textarea
          bg={colors.white}
          h={'60px'}
          minH={'140px'}
          mb={'32px'}
          borderRadius={variables.borderRadius}
          placeholder={'Описание услуги'}
          {...register('description')}
        />
        <Button
          w={'100%'}
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
      <Column>
        <FormControl isInvalid={!!errors.hatchback} w={'45%'} mb={'16px'}>
          <FormLabel>Цена для хэтчбека, ₽</FormLabel>
          <Input
            bg={colors.white}
            h={'60px'}
            borderRadius={variables.borderRadius}
            {...register('hatchback', {
              pattern: {
                value: /^\d+$/,
                message: 'Значение должно быть число',
              },
            })}
          />
          <FormErrorMessage>{errors.hatchback?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.sedan} w={'45%'} mb={'16px'}>
          <FormLabel>Цена для седана, ₽</FormLabel>
          <Input
            bg={colors.white}
            h={'60px'}
            borderRadius={variables.borderRadius}
            {...register('sedan', {
              pattern: {
                value: /^\d+$/,
                message: 'Значение должно быть число',
              },
            })}
          />
          <FormErrorMessage>{errors.sedan?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.truck} w={'45%'}>
          <FormLabel>Цена для грузовика, ₽</FormLabel>
          <Input
            bg={colors.white}
            h={'60px'}
            borderRadius={variables.borderRadius}
            {...register('truck', {
              pattern: {
                value: /^\d+$/,
                message: 'Значение должно быть число',
              },
            })}
          />
          <FormErrorMessage>{errors.truck?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.stationWagon} w={'45%'}>
          <FormLabel>Цена для грузовика, ₽</FormLabel>
          <Input
              bg={colors.white}
              h={'60px'}
              borderRadius={variables.borderRadius}
              {...register('stationWagon', {
                pattern: {
                  value: /^\d+$/,
                  message: 'Значение должно быть число',
                },
              })}
          />
          <FormErrorMessage>{errors.stationWagon?.message}</FormErrorMessage>
        </FormControl>
      </Column>
    </Container>
  );
};

export default ServiceForm;
