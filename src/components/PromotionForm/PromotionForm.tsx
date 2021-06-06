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
import { useTranslation } from 'react-i18next';
import MediaQuery from 'react-responsive';

import { Container, Column } from './PromotionForm.styled';

interface IInputs {
  name: string;
  description?: string;
  date: Date;
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
        <Controller
          name={'date'}
          control={control}
          defaultValue={new Date()}
          render={({ field: { ref, ...props } }) => (
            <KeyboardDatePicker format={'DD/MM/YYYY'} {...props} />
          )}
        />
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
