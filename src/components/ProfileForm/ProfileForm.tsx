import React from 'react';
import { useTheme } from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormControl, FormErrorMessage, Input, Button } from '@chakra-ui/react';

import { Container, Column } from './ProfileForm.styled';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';

interface Inputs {
  address: string;
  phone: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ProfileForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const { colors, variables } = useTheme();
  const newPassword = watch('newPassword', '');

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Column>
        <h2>Информация о мойке</h2>
        <ProfileAvatar />
        <FormControl isInvalid={!!errors.address} mb={'32px'}>
          <Input
            h={'58px'}
            bg={colors.white}
            borderRadius={variables.borderRadius}
            placeholder={'Адрес'}
            {...register('address', { required: 'Обязательное поле' })}
          />
          <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.phone} mb={'32px'}>
          <Input
            h={'58px'}
            bg={colors.white}
            borderRadius={variables.borderRadius}
            placeholder={'Телефон'}
            {...register('phone', { required: 'Обязательное поле' })}
          />
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </FormControl>
        <Button
          h={'60px'}
          bg={variables.blueGradient}
          borderRadius={variables.borderRadius}
          _hover={{
            bg: variables.blueGradient,
            opacity: 0.8,
          }}
          type={'submit'}
        >
          Сохранить
        </Button>
      </Column>
      <Column>
        <h2>Безопасность</h2>
        <p>Вы можете сменить пароль. Введите старый пароль и задайте новый.</p>
        <Input
          h={'58px'}
          bg={colors.white}
          borderRadius={variables.borderRadius}
          mb={'32px'}
          type={'password'}
          placeholder={'Старый пароль'}
          {...register('oldPassword')}
        />
        <FormControl isInvalid={!!errors.newPassword} mb={'32px'}>
          <Input
            h={'58px'}
            bg={colors.white}
            borderRadius={variables.borderRadius}
            type={'password'}
            placeholder={'Новый пароль'}
            {...register('newPassword', {
              minLength: {
                value: 6,
                message: 'Минимальная длина пароля 6 символов',
              },
            })}
          />
          <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.confirmPassword} mb={'32px'}>
          <Input
            h={'58px'}
            bg={colors.white}
            borderRadius={variables.borderRadius}
            type={'password'}
            placeholder={'Подтверждение пароля'}
            {...register('confirmPassword', {
              validate: (value) =>
                value === newPassword || 'Пароли не совпадают',
            })}
          />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>
      </Column>
    </Container>
  );
};

export default ProfileForm;
