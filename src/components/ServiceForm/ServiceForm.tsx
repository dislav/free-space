import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import useSwr, { mutate } from 'swr';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react';
import MediaQuery from 'react-responsive';

import { CarBody, Service } from '../../interfaces/types';
import { createService, updateService } from '../../lib/api';

import { Container, Column } from './ServiceForm.styled';

interface Inputs {
  [key: string]: string;
  name: string;
  about: string;
}

const ServiceForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { data, error } = useSwr<CarBody[]>('/guide/body');
  const {
    data: service,
    error: serviceError,
    mutate: refetch,
  } = useSwr<Service>(id ? `/service/${id}` : null);

  useEffect(() => {
    refetch();
  }, []);

  const serviceLoading = !service && !serviceError;

  const [isLoading, setIsLoading] = useState(false);
  const { colors, variables, breakpoints } = useTheme();
  const toast = useToast();
  const history = useHistory();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    Object.entries(data).map(([key, value]) => {
      if (typeof value === 'object') {
        const price = Object.entries(value).map((prices) => ({
          price: prices[1],
          type: prices[0],
        }));

        formData.append(key, JSON.stringify(price));
      } else {
        formData.append(key, value);
      }
    });

    if (id) {
      try {
        const response = await updateService(id, formData);
        if (!response.data.status) throw new Error(response.data.message);

        toast({
          title: 'Успешно',
          position: 'top-right',
          description: 'Услуга успешно сохранена.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        mutate('/services');
        setTimeout(() => history.push('/services'), 200);
      } catch (e) {
        toast({
          title: 'Ошибка',
          position: 'top-right',
          description: e.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await createService(formData);
        if (!response.data.status) throw new Error(response.data.message);

        toast({
          title: 'Успешно',
          position: 'top-right',
          description: 'Услуга успешно создана.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => history.push('/services'), 200);
      } catch (e) {
        toast({
          title: 'Ошибка',
          position: 'top-right',
          description: e.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (id && serviceLoading) return <></>;

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Column>
        <FormControl isInvalid={!!errors.name} mb={'32px'}>
          <Input
            bg={colors.white}
            h={'60px'}
            borderRadius={variables.borderRadius}
            placeholder={'Название'}
            defaultValue={service?.name || ''}
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
          defaultValue={service?.about || ''}
          {...register('about')}
        />
        <MediaQuery minWidth={breakpoints.xl}>
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
            {id ? 'Сохранить' : 'Добавить'}
          </Button>
        </MediaQuery>
      </Column>
      <Column>
        {!data && !error && <div>Загрузка...</div>}
        {data?.map(({ id, name }, index) => (
          <FormControl
            key={id}
            isInvalid={!!errors?.[id]}
            w={['100%', '100%', '45%']}
            mb={'16px'}
          >
            <FormLabel>{name} цена, ₽</FormLabel>
            <Input
              bg={colors.white}
              h={'60px'}
              borderRadius={variables.borderRadius}
              defaultValue={service?.price?.[index].price || ''}
              {...register(`price[${id}]`, {
                pattern: {
                  value: /^\d+$/,
                  message: 'Значение должно быть число',
                },
              })}
            />
            <FormErrorMessage>{errors?.[id]?.message}</FormErrorMessage>
          </FormControl>
        ))}
        <MediaQuery maxWidth={breakpoints.xl}>
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
            isLoading={isLoading}
          >
            {id ? 'Сохранить' : 'Добавить'}
          </Button>
        </MediaQuery>
      </Column>
    </Container>
  );
};

export default ServiceForm;
