import styled from 'styled-components';
import { up } from 'styled-breakpoints';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.blue10};
  border-radius: ${({ theme }) => theme.variables.borderRadius};
  padding: 30px 14px;

  ${up('xl')} {
    padding: 30px;
  }

  ${up('xxl')} {
    padding: 52px 80px;
  }

  .mui-picker {
    width: 100%;
  }
`;
