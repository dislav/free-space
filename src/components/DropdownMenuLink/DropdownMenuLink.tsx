import React from 'react';
import { Container } from './DropdownMenuLink.styled';

interface IDropdownMenuLink {
  onClick?: () => void;
}

const DropdownMenuLink: React.FC<IDropdownMenuLink> = ({
  children,
  onClick,
}) => {
  return <Container onClick={onClick}>{children}</Container>;
};

export default DropdownMenuLink;
