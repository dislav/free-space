import React, { useCallback, useState } from 'react';

import { Container, Link } from './SignIn.styled';
import AuthForm from '../AuthForm/AuthForm';

const SignIn: React.FC = () => {
  const [authType, setAuthType] = useState('login');

  const switchAuthType = useCallback(() => {
    setAuthType(authType === 'login' ? 'register' : 'login');
  }, [authType]);

  return (
    <Container>
      <h1>Войти</h1>
      {
        {
          login: <AuthForm />,
          register: <div>Register</div>,
        }[authType]
      }
      <Link onClick={switchAuthType}>Запросить доступ в кабинет</Link>
    </Container>
  );
};

export default SignIn;
