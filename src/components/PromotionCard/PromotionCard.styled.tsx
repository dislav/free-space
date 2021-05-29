import styled from 'styled-components';
import { Container as DropdownMenu } from '../DropdownMenu/DropdownMenu.styled';

export const Column = styled.div`
  flex: 1 1 100%;
  padding-right: 40px;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  background-color: ${({ theme }) => theme.colors.blue10};
  border-radius: 18px;
  padding: 38px 80px;

  ${Column}:first-child {
    flex: 1 1 60%;
  }
  
  ${Column}:nth-child(2) {
    flex: 1 1 40%;
  }

  ${Column}:nth-child(3) {
    flex: 1 1 140%;
  }
  
  ${DropdownMenu} {
    position: absolute;
    top: 50%;
    right: 60px;
    transform: translateY(-50%);
  }
`;
