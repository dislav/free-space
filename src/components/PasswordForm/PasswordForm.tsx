import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';

import { Container } from './PasswordForm.styled';
import { updatePassword } from '../../lib/api';

interface Inputs {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordForm: React.FC = () => {
  const { t } = useTranslation('Profile');
  const { colors, variables } = useTheme();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm<Inputs>();

  const newPassword = watch('newPassword', '');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'object') {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await updatePassword(formData);
      if (!response.data.status) throw new Error(response.data.message);

      toast({
        title: 'Успешно',
        description: 'Пароль успешно обновлен',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      reset({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (e) {
      toast({
        title: 'Ошибка',
        description: e.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <h2>{t('Safety')}</h2>
      <p>
        {t(
          'You can change your password. Enter the old password and set a new one.'
        )}
      </p>
      <FormControl
        isInvalid={!!errors.oldPassword}
        mb={['20px', '20px', '32px']}
      >
        <Input
          h={['44px', '44px', '58px']}
          bg={colors.white}
          borderRadius={variables.borderRadius}
          type={'password'}
          placeholder={t('Old password')}
          {...register('oldPassword', {
            required: `${t('Required field')}`,
          })}
        />
        <FormErrorMessage>{errors.oldPassword?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={!!errors.newPassword}
        mb={['20px', '20px', '32px']}
      >
        <Input
          h={['44px', '44px', '58px']}
          bg={colors.white}
          borderRadius={variables.borderRadius}
          type={'password'}
          placeholder={t('New password')}
          {...register('newPassword', {
            required: `${t('Required field')}`,
            minLength: {
              value: 6,
              message: `${t('Minimum value length')} 6`,
            },
          })}
        />
        <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={!!errors.confirmPassword}
        mb={['20px', '20px', '32px']}
      >
        <Input
          h={['44px', '44px', '58px']}
          bg={colors.white}
          borderRadius={variables.borderRadius}
          type={'password'}
          placeholder={t('Password confirmation')}
          {...register('confirmPassword', {
            required: `${t('Required field')}`,
            validate: (value) =>
              value === newPassword || `${t('Password mismatch')}`,
          })}
        />
        <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
      </FormControl>
      <Button
        h={['50px', '50px', '60px']}
        bg={variables.blueGradient}
        borderRadius={variables.borderRadius}
        _hover={{
          bg: variables.blueGradient,
          opacity: 0.8,
        }}
        type={'submit'}
        isLoading={isLoading}
      >
        {t('Change password')}
      </Button>
    </Container>
  );
};

export default PasswordForm;
