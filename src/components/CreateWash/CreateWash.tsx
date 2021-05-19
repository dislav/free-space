import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormControl, FormErrorMessage, Button, Input, Select } from '@chakra-ui/react';

import { useHistory } from 'react-router-dom';
import cookie from 'cookie';

import { Container, Form, FormTime } from './CreateWash.styled';
import { createWash } from '../../lib/api';

interface Inputs {
  name: string;
  city: string;
  street: string;
  phone: string;
  startTime: string;
  endTime: string;
}

const CreateWash: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState(false);

  const { colors } = useTheme();
  const history = useHistory();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await createWash(formData);
      if (!response.data.data.session) {
        document.cookie = cookie.serialize('ukey28', '');
        document.cookie = cookie.serialize('sesid28', '');
        history.push('/login');
      }
      if (!response.data.status) throw new Error(response.data.message);

      console.log(response.data);
    } catch (e) {
      console.log(e.message);
    }

    setIsLoading(false);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name} mb={'20px'}>
          <Input
            placeholder={'Название объекта'}
            bg={colors.white}
            {...register('name', {
              required: 'Обязательное поле',
            })}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.city} mb={'20px'}>
          <Select
            placeholder={'Выберите город'}
            bg={'white'}
            {...register('city', {
              required: 'Обязательное поле',
            })}
          >
            <option value="Москва">Москва</option>
            <option value="Новокузнецк">Новокузнецк</option>
          </Select>
          <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.street} mb={'20px'}>
          <Input
            placeholder={'Адрес'}
            bg={colors.white}
            {...register('street', {
              required: 'Обязательное поле',
            })}
          />
          <FormErrorMessage>{errors.street?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.phone} mb={'30px'}>
          <Input
            placeholder={'Телефон'}
            bg={'white'}
            {...register('phone', {
              required: 'Обязательное поле',
            })}
          />
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </FormControl>
        <FormTime>
          <p>Режим работы (начало - окончание рабочего дня)</p>
          <FormControl isInvalid={!!errors.startTime} w={'30%'}>
            <Select
              defaultValue={'01'}
              bg={'white'}
              {...register('startTime', {
                required: 'Обязательное поле',
              })}
            >
              <option value="01">01</option>
              <option value="02">02</option>
            </Select>
            <FormErrorMessage>{errors.startTime?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.endTime} w={'30%'} ml={'20px'}>
            <Select
              defaultValue={'01'}
              bg={'white'}
              {...register('endTime', {
                required: 'Обязательное поле',
              })}
            >
              <option value="01">01</option>
              <option value="02">02</option>
            </Select>
            <FormErrorMessage>{errors.endTime?.message}</FormErrorMessage>
          </FormControl>
        </FormTime>
        <Button
          type={'submit'}
          h={'60px'}
          bg={'linear-gradient(to right, #9FD4D8, #B1E0F9)'}
          borderRadius={'18px'}
          _hover={{
            bg: 'linear-gradient(to right, #9FD4D8, #B1E0F9)',
            opacity: 0.8,
          }}
          isLoading={isLoading}
        >
          Добавить
        </Button>
      </Form>
    </Container>
  );
};

export default CreateWash;
