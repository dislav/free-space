import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTheme } from 'styled-components';
import {
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import MediaQuery from 'react-responsive';
import dayjs from 'dayjs';

import { Container, Column, ExpireTo } from './PromotionForm.styled';

interface IInputs {
  name: string;
  description?: string;
  date: Date;
  services: string;
}

const PromotionForm: React.FC = () => {
  const { t } = useTranslation('PromotionForm');
  const { colors, variables, breakpoints } = useTheme();

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<IInputs>();

  const onSubmit: SubmitHandler<IInputs> = async (data) => {
    console.log(data);
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
          {...register('description')}
        />
        <ExpireTo>
          <p>Акция действует до</p>
          <Controller
            name={'date'}
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
          >
            {t('Add')}
          </Button>
        </MediaQuery>
      </Column>
      <Column>
        <Controller
          name={'services'}
          control={control}
          defaultValue={''}
          render={({ field: { value, onChange, ...props } }) => (
            <Select
              options={[
                { value: 'wash', label: 'Мойка' },
                { value: 'washAndScrab', label: 'Мойка + Полировка' },
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
