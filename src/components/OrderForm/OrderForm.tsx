import React, { useMemo } from 'react';
import { useTheme } from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { DateTimePicker } from '@material-ui/pickers';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import useSwr from 'swr';
import dayjs from 'dayjs';

import { Container } from './OrderForm.styled';
import { FormValues } from './types';

import {
  CarBody,
  Order,
  PaginationProps,
  Service,
} from '../../interfaces/types';
import { useCreateOfUpdateOrderQuery } from './hooks';

interface IOrderForm {
  className?: string;
}

const OrderForm: React.FC<IOrderForm> = ({ className }) => {
  const { t } = useTranslation('OrderForm');
  const { id } = useParams<{ id?: string }>();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const { data: order, mutate } = useSwr<{ order: Order; service: Service[] }>(
    id ? `/orderinfo/${id}` : null
  );

  const { data: bodies } = useSwr<CarBody[]>('/guide/body');
  const { data: services } = useSwr<PaginationProps<Service[]>>([
    '/services',
    10000,
  ]);

  const bodiesOptions = useMemo(
    () =>
      bodies?.map((body) => ({
        value: body.id,
        label: body.name,
        selected: body.id === order?.order.body,
      })),
    [bodies, order]
  );

  const servicesOptions = useMemo(
    () =>
      services?.list.map(({ id, name }) => ({
        value: id,
        label: name,
        selected: order?.service?.find(({ service_id }) => service_id === id),
      })),
    [services, order]
  );

  const { colors, variables } = useTheme();

  const [onSubmit, { isLoading }] = useCreateOfUpdateOrderQuery(id, mutate);

  const defaultDate = useMemo(() => {
    if (order?.order) {
      return dayjs(
        `${order.order.date}, ${order.order.time}`,
        'YYYY-MM-DD, HH:mm'
      ).toDate();
    }

    return dayjs().add(1, 'day').toDate();
  }, [order]);

  if (id && (!order || !bodies || !services)) return <></>;

  return (
    <Container className={className} onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.phone} mb={['14px', '14px', '32px']}>
        <Input
          bg={colors.white}
          borderRadius={variables.borderRadius}
          h={['44px', '44px', '58px']}
          placeholder={t('Phone')}
          defaultValue={order?.order.phone || ''}
          {...register('phone', {
            required: `${t('Required field')}`,
          })}
        />
        <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.services} mb={['14px', '14px', '32px']}>
        <Controller
          name="services"
          control={control}
          rules={{
            required: `${t('Required field')}`,
          }}
          defaultValue={
            servicesOptions
              ? servicesOptions
                  .filter(({ selected }) => selected)
                  .map((v) => v.value)
              : []
          }
          render={({ field: { value, onChange, ...props } }) => (
            <Select
              options={servicesOptions}
              placeholder={'Выберите услугу'}
              classNamePrefix={'react-select'}
              onChange={(option) => onChange(option.map(({ value }) => value))}
              defaultValue={servicesOptions?.filter(({ selected }) => selected)}
              defaultOptions={servicesOptions}
              isMulti
              {...props}
            />
          )}
        />
        <FormErrorMessage>{(errors.services as any)?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.body} mb={['14px', '14px', '32px']}>
        <Controller
          name="body"
          control={control}
          rules={{
            required: `${t('Required field')}`,
          }}
          defaultValue={
            bodiesOptions
              ? bodiesOptions.find(({ selected }) => selected)?.value
              : ''
          }
          render={({ field: { value, onChange, ...props } }) => (
            <Select
              options={bodiesOptions}
              placeholder={'Выберите услугу'}
              classNamePrefix={'react-select'}
              onChange={(option) => onChange(option?.value)}
              defaultValue={bodiesOptions?.filter(({ selected }) => selected)}
              defaultOptions={bodiesOptions}
              {...props}
            />
          )}
        />
        <FormErrorMessage>{errors.body?.message}</FormErrorMessage>
      </FormControl>
      <FormControl mb={['14px', '14px', '32px']}>
        <Controller
          name="date"
          control={control}
          defaultValue={defaultDate}
          render={({ field: { ref, ...props } }) => (
            <DateTimePicker
              variant={'inline'}
              inputVariant={'outlined'}
              format={'DD.MM.YYYY, HH:mm'}
              className={'mui-picker'}
              InputProps={{
                classes: {
                  root: 'mui-picker__root',
                },
              }}
              {...props}
            />
          )}
        />
      </FormControl>

      <Button
        w={'100%'}
        h={['50px', '50px', '60px']}
        bg={variables.blueGradient}
        _hover={{
          bg: variables.blueGradient,
          opacity: 0.8,
        }}
        type={'submit'}
        isLoading={isLoading}
      >
        {id ? t('Save') : t('Add')}
      </Button>
    </Container>
  );
};

export default OrderForm;
