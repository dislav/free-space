import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import cookie from 'cookie';

import { auth, getProfile } from '../../lib/api';

import { Container, TextError } from './AuthForm.styled';
import { useProfile } from '../../lib/useProfile';

interface Inputs {
  login: string;
  pass: string;
}

const AuthForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { mutate } = useProfile();

  const history = useHistory();
  const { colors, variables } = useTheme();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const { data: response } = await auth(formData);
      if (!response.status) throw new Error(response.message);

      setTimeout(() => {
        document.cookie = cookie.serialize('ukey28', response.data.hash);
        document.cookie = cookie.serialize('sesid28', response.data.hash2);
      });

      localStorage.setItem('group', response.data.group[0]);

      const { data: profile } = await getProfile(response.data.hash);

      await mutate(profile.data);

      history.push('/');
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <p>Для входа введите свои данные</p>
      <FormControl isInvalid={!!errors.login} mb={8}>
        <Input
          textAlign={'center'}
          fontSize={'lg'}
          minH={['44px', '44px', '74px']}
          bg={colors.white}
          borderRadius={variables.borderRadius}
          placeholder={'Логин'}
          {...register('login', {
            required: 'Обязательное поле',
          })}
        />
        <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.pass} mb={8}>
        <Input
          textAlign={'center'}
          fontSize={'lg'}
          minH={['44px', '44px', '74px']}
          bg={colors.white}
          borderRadius={variables.borderRadius}
          type={'password'}
          placeholder={'Пароль'}
          {...register('pass', {
            required: 'Обязательное поле',
          })}
        />
        <FormErrorMessage>{errors.pass?.message}</FormErrorMessage>
      </FormControl>
      <Button
        w={'100%'}
        minH={'60px'}
        bg={variables.blueGradient}
        borderRadius={variables.borderRadius}
        _hover={{
          bg: variables.blueGradient,
          opacity: 0.8,
        }}
        mb={'26px'}
        isLoading={isLoading}
        type={'submit'}
      >
        Войти
      </Button>
      {error.length > 0 && <TextError>{error}</TextError>}
    </Container>
  );
};

export default AuthForm;
