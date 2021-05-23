import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTheme } from 'styled-components';
import cookie from 'cookie';

import { Container, Form, TextError, Link } from './SignIn.styled';
import { FormControl, FormErrorMessage, Input, Button } from '@chakra-ui/react';
import { auth } from '../../lib/api';
import { setLoggedIn } from '../../store/profile/actions';

const mapDispatchToProps = {
  setLoggedIn,
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Inputs {
  login: string;
  pass: string;
}

const SignIn: React.FC<PropsFromRedux> = ({ setLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { colors } = useTheme();

  const history = useHistory();

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

      document.cookie = cookie.serialize('ukey28', response.data.hash);
      document.cookie = cookie.serialize('sesid28', response.data.hash2);

      setLoggedIn(true);
      history.push('/');
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Войти</h1>
        <p>Для входа введите свои данные</p>
        <FormControl isInvalid={!!errors.login} mb={8}>
          <Input
            textAlign={'center'}
            fontSize={'lg'}
            minH={'74px'}
            bg={colors.white}
            borderRadius={'18px'}
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
            minH={'74px'}
            bg={colors.white}
            borderRadius={'18px'}
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
          bg={'linear-gradient(to right, #9FD4D8, #B1E0F9)'}
          borderRadius={'18px'}
          _hover={{
            bg: 'linear-gradient(to right, #9FD4D8, #B1E0F9)',
            opacity: 0.8,
          }}
          mb={'26px'}
          isLoading={isLoading}
          type={'submit'}
        >
          Войти
        </Button>
        {error.length > 0 && <TextError>{error}</TextError>}
        <Link>Запросить доступ в кабинет</Link>
      </Form>
    </Container>
  );
};

export default connector(SignIn);
