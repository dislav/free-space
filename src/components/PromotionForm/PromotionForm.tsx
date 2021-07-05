import React, { useState, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import useSwr from 'swr';
import {
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import MediaQuery from 'react-responsive';
import dayjs from 'dayjs';
import cookie from 'cookie';

import { Service, Promotion, PaginationProps } from '../../interfaces/types';
import { createPromotion, updatePromotion } from '../../lib/api';

import { Container, Column, ExpireTo } from './PromotionForm.styled';

interface IInputs {
  name: string;
  description?: string;
  timeto: Date;
  list_services: string;
}

const PromotionForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { data: services } = useSwr<PaginationProps<Service[]>>([
    '/services',
    10000,
  ]);
  const { data: promotion, error } = useSwr<Promotion>(
    id ? `/promo/info/${id}` : null
  );

  const { t } = useTranslation('PromotionForm');
  const { colors, variables, breakpoints } = useTheme();
  const toast = useToast();
  const history = useHistory();

  const promotionLoading = !promotion && !error;

  const [isLoading, setIsLoading] = useState(false);

  const servicesOptions = useMemo(
    () =>
      services?.list.map(({ id, name }) => ({
        value: id,
        label: name,
        selected: promotion?.service?.find(
          ({ service_id }) => service_id === id
        ),
      })),
    [services, promotion]
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<IInputs>();

  const onSubmit: SubmitHandler<IInputs> = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    const newData = {
      ...data,
      timeto: `${dayjs(data.timeto).format('YYYY-MM-DD')} 00:00:00`,
      ukey28: cookie.parse(document.cookie)?.ukey28,
    };

    Object.entries(newData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (id) {
      // Save promo
      try {
        const response = await updatePromotion(id, formData);
        if (!response.data.status) throw new Error(response.data.message);

        toast({
          title: 'Успешно',
          position: 'top-right',
          description: `Акция «${data.name}» успешно обновлена.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => history.push('/promotions'), 200);
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
      // Create promo
      try {
        const response = await createPromotion(formData);
        if (!response.data.status) throw new Error(response.data.message);

        toast({
          title: 'Успешно',
          position: 'top-right',
          description: `Акция «${data.name}» успешно создана.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => history.push('/promotions'), 200);
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

  if (id && promotionLoading) return <></>;

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Column>
        <FormControl isInvalid={!!errors.name} mb={['14px', '14px', '32px']}>
          <Input
            bg={colors.white}
            borderRadius={variables.borderRadius}
            h={['44px', '44px', '58px']}
            placeholder={t('Name')}
            defaultValue={promotion?.name || ''}
            {...register('name', {
              required: `${t('Required field')}`,
            })}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <Textarea
          bg={colors.white}
          borderRadius={variables.borderRadius}
          mb={['14px', '14px', '32px']}
          defaultValue={promotion?.description || ''}
          placeholder={t('Description of the service')}
          {...register('description')}
        />
        <ExpireTo>
          <p>Акция действует до</p>
          <Controller
            name={'timeto'}
            control={control}
            defaultValue={
              promotion?.end
                ? dayjs(promotion.end).toDate()
                : dayjs().add(1, 'day').toDate()
            }
            render={({ field: { ref, ...props } }) => (
              <KeyboardDatePicker
                variant={'inline'}
                inputVariant={'outlined'}
                format={'DD MMM, YYYY'}
                minDate={dayjs().add(1, 'day').toDate()}
                disableToolbar={true}
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
        </ExpireTo>
        <MediaQuery minWidth={breakpoints.xl}>
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
        </MediaQuery>
      </Column>
      <Column>
        <Controller
          name={'list_services'}
          control={control}
          defaultValue={''}
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
        <MediaQuery maxWidth={breakpoints.xl}>
          <Button
            w={'100%'}
            h={['50px', '50px', '60px']}
            bg={variables.blueGradient}
            _hover={{
              bg: variables.blueGradient,
              opacity: 0.8,
            }}
            type={'submit'}
          >
            {id ? t('Save') : t('Add')}
          </Button>
        </MediaQuery>
      </Column>
    </Container>
  );
};

export default PromotionForm;
