import React from 'react';
import { Link as RouterLink, LinkProps, useLocation } from 'react-router-dom';
import { Link } from '@chakra-ui/react';

const SidebarLink: React.FC<LinkProps> = ({ children, ...props }) => {
  const { pathname } = useLocation();

  return (
    <Link
      as={RouterLink}
      p={'16px 80px 16px 100px'}
      bg={pathname === props.to ? 'blue.50' : 'none'}
      _hover={{
        textDecor: 'none',
      }}
      mb={'20px'}
      borderRadius={'0 18px 18px 0'}
      {...props}
    >
      {children}
    </Link>
  );
};

export default SidebarLink;
