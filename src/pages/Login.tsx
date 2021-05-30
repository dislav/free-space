import React from 'react';
import { Box } from '@chakra-ui/react';
import SignIn from '../components/SignIn/SignIn';
import { Logo } from '../icons/icons';

const Login = () => {
  return (
    <Box
      d={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100vh'}
    >
      <Box mb={10}>
        <Logo />
      </Box>
      <SignIn />
    </Box>
  );
};

export default Login;
