import styled from 'styled-components';
import { up } from 'styled-breakpoints';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.blue10};
  border-radius: ${({ theme }) => theme.variables.borderRadius};

  ${up('xl')} {
    flex-direction: row;
    justify-content: space-between;
    padding: 52px 80px;
  }
`;

export const Column = styled.div`
  width: 46%;
`;
