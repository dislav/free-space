import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTheme } from 'styled-components';
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

import { createPromotion } from '../../lib/api';
import { Container, Column, ExpireTo } from './PromotionForm.styled';

interface IInputs {
  name: string;
  about?: string;
  timeto: Date;
  list_services: string;
}

const PromotionForm: React.FC = () => {
  const { t } = useTranslation('PromotionForm');
  const { colors, variables, breakpoints } = useTheme();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

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

    try {
      const response = await createPromotion(formData);
      if (!response.data.status) throw new Error(response.data.message);

      toast({
        title: 'Успешно',
        description: `Акция «${data.name}» успешно создана.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (e) {
      toast({
        title: 'Ошибка',
        description: e.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Column>
        <FormControl isInvalid={!!errors.name} mb={['14px', '14px', '32px']}>
          <Input
            bg={colors.white}
            borderRadius={variables.borderRadius}
            h={['44px', '44px', '58px']}
            placeholder={t('Name')}
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
          placeholder={t('Description of the service')}
          {...register('about')}
        />
        <ExpireTo>
          <p>Акция действует до</p>
          <Controller
            name={'timeto'}
            control={control}
            defaultValue={dayjs().toDate()}
            render={({ field: { ref, ...props } }) => (
              <KeyboardDatePicker
                variant={'inline'}
                inputVariant={'outlined'}
                format={'DD MMM, YYYY'}
                minDate={dayjs().toDate()}
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
            {t('Add')}
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
              options={[
                { value: '1', label: 'Мойка' },
                { value: '2', label: 'Мойка + Полировка' },
              ]}
              placeholder={'Выберите услугу'}
              classNamePrefix={'react-select'}
              onChange={(option) => onChange(option.map(({ value }) => value))}
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
            {t('Add')}
          </Button>
        </MediaQuery>
      </Column>
    </Container>
  );
};

export default PromotionForm;
