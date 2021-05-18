import styled from 'styled-components';
import { Input as ChakraInput, Button as ChakraButton } from '@chakra-ui/react';
import {up} from "styled-breakpoints";

export const Container = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.blue10};
  border-radius: 18px;
  padding: 76px 80px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled(ChakraInput)`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Button = styled(ChakraButton)`
  width: 100%;
  background: linear-gradient(to right, #9FD4D8, #B1E0F9);
  
  &:hover {
    background: linear-gradient(to right, #9FD4D8, #B1E0F9);
    opacity: 0.8;
  }
  
  ${up('xl')} {
    height: 60px;
    max-height: 60px;
    border-radius: 18px;
    margin-bottom: 26px;
  }
`;
