import React from 'react';
import { LinkProps } from 'react-router-dom';
import { Container } from './LinkButton.styled';

const LinkButton: React.FC<LinkProps> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default LinkButton;
