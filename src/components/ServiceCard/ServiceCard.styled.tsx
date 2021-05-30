import styled from 'styled-components';
import { Container as DropdownMenu } from '../DropdownMenu/DropdownMenu.styled';

export const Container = styled.div`
  position: relative;
  display: flex;
  background: ${({ theme }) => theme.variables.greenGradient};
  border-radius: 18px;
  padding: 38px 80px;
  
  ${DropdownMenu} {
    position: absolute;
    top: 50%;
    right: 60px;
    transform: translateY(-50%);
  }
`;

export const Column = styled.div`
  padding-right: 40px;
  
  &:nth-child(1) {
    flex: 1 1 25%;
  }
  
  &:nth-child(2) {
    flex: 1 1 15%;
  }

  &:nth-child(3) {
    flex: 1 1 50%;
  }
  
  &:nth-child(4) {
    flex: 1 1 10%;
  }
`;
