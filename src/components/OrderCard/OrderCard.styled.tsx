import styled from 'styled-components';
import { Container as DropdownMenu } from '../DropdownMenu/DropdownMenu.styled';

export const Container = styled.div`
  position: relative;
  display: flex;
  background: ${({ theme }) => theme.variables.greenGradient};
  //background-color: ${({ theme }) => theme.colors.blue10};
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
  flex: 1 1 100%;
  padding-right: 40px;
`;

export const Tag = styled.div`
  display: inline-flex;
  font-size: 14px;
  white-space: nowrap;
  background-color: ${({ theme }) => theme.colors.blue30};
  border-radius: 20px;
  padding: 2px 10px;
  margin-right: 8px;
  margin-bottom: 6px;
`;
