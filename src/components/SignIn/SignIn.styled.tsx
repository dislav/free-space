import styled from 'styled-components';
import { up } from 'styled-breakpoints';

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

export const TextError = styled.p`
  color: red;
  font-size: 20px;
  font-weight: bold;
`;

export const Link = styled.div`
  text-decoration: underline;
  cursor: pointer;
`;