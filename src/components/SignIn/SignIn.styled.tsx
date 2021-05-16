import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { Input as ChakraInput, Button as ChakraButton } from '@chakra-ui/react';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.blue10};

  ${up('xl')} {
    width: 520px;
    max-width: 520px;
    border-radius: 18px;
    padding: 3.75rem 5.625rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    ${up('xl')} {
      font-size: 2.25rem;
      font-weight: bold;
      margin-bottom: 46px;
    }
  }

  p {
    ${up('xl')} {
      font-size: 1.25rem;
      margin-bottom: 40px;
    }
  }
`;

export const Input = styled(ChakraInput)`
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white};

  ${up('xl')} {
    min-height: 74px;
    border-radius: 18px;
    font-size: 1.25rem;
  }
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

export const TextError = styled.p`
  color: red;
  font-size: 20px;
  font-weight: bold;
`;

export const Link = styled.div`
  text-decoration: underline;
  cursor: pointer;
`;