import styled from 'styled-components';
import { up } from 'styled-breakpoints';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colors.gray10};
  border-radius: ${({ theme }) => theme.variables.borderRadius};
  padding: 20px 22px;

  ${up('xl')} {
    min-height: 94px;
    flex-wrap: nowrap;
    align-items: center;
    flex-direction: row;
    padding: 38px 80px;
  }
`;
