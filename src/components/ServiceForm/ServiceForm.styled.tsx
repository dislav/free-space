import styled from 'styled-components';
import { up } from 'styled-breakpoints';

export const Container = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.blue10};
  border-radius: ${({ theme }) => theme.variables.borderRadius};
  padding: 30px 14px;

  ${up('xl')} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 48px 80px;
  }
`;

export const Column = styled.div`
  &:first-child {
    width: 100%;

    ${up('xl')} {
      width: 34%;
    }
  }

  &:last-child {
    width: 100%;
    display: flex;
    flex-direction: column;

    ${up('xl')} {
      width: 60%;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
`;
