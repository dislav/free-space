import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import Sidebar from './Sidebar';

interface ILayout {
  title?: string;
  action?: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ title, action, children }) => {
  return (
    <Box d={'flex'}>
      <Box h={'100vh'} minWidth={'sm'}>
        <Sidebar />
      </Box>
      <Box w={'100%'} maxW={'7xl'} pt={20} mx={'auto'}>
        <Box d={'flex'}>
          {title && (
            <Heading as={'h1'} size={'2xl'} mb={20}>
              {title}
            </Heading>
          )}
          {action}
        </Box>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
