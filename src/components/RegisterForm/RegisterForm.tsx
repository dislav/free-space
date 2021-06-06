import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormControl, FormErrorMessage, Input, Button } from '@chakra-ui/react';

import { Container } from './RegisterForm.styled';

interface IInputs {
  email: string;
}

const RegisterForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IInputs>();

  const [isLoading, setIsLoading] = useState(false);
  const { colors, variables } = useTheme();

  const onSubmit: SubmitHandler<IInputs> = async (data) => {
    setIsLoading(true);
    console.log(data);
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <p>
        Введите почту, на которую вы хотите получить доступы в личный кабинет.
        После проверки, администратор направит вам доступы.
      </p>
      <FormControl isInvalid={!!errors.email} mb={'30px'}>
        <Input
          h={'60px'}
          bg={colors.white}
          fontSize={'lg'}
          textAlign={'center'}
          borderRadius={variables.borderRadius}
          placeholder={'Email'}
          {...register('email', {
            required: 'Обязательное поле',
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Неверный формат почты',
            },
          })}
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <Button
        h={'60px'}
        bg={variables.blueGradient}
        borderRadius={variables.borderRadius}
        mb={'50px'}
        _hover={{
          bg: variables.blueGradient,
          opacity: 0.8,
        }}
        type={'submit'}
        isLoading={isLoading}
      >
        Отправить
      </Button>
    </Container>
  );
};

export default RegisterForm;
