import React from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import { Container } from './SidebarLink.styled';

const SidebarLink: React.FC<LinkProps> = ({ children, ...props }) => {
  const { pathname } = useLocation();

  return (
    <Container active={props.to === pathname}>
      <Link {...props}>{children}</Link>
    </Container>
  );
};

export default SidebarLink;
