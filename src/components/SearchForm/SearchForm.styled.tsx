import styled from 'styled-components';
import { up } from 'styled-breakpoints';

export const Container = styled.form`
  display: flex;
  flex-wrap: wrap;

  ${up('xl')} {
    align-items: center;
    flex-wrap: nowrap;
  }

  > div {
    width: 100%;
    display: flex;
    align-items: center;
  }

  p {
    color: ${({ theme }) => theme.colors.gray40};
    font-weight: 700;
    white-space: nowrap;
    margin-top: 14px;

    ${up('xl')} {
      margin-top: 0;
      margin-left: 40px;
    }
  }
`;
