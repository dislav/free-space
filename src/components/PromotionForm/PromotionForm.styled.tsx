import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { font } from '../../styles/utils';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.blue10};
  border-radius: ${({ theme }) => theme.variables.borderRadius};
  padding: 30px 14px;

  ${up('xl')} {
    flex-direction: row;
    justify-content: space-between;
    padding: 30px;
  }

  ${up('xxl')} {
    padding: 52px 80px;
  }
`;

export const Column = styled.div`
  &:last-child {
    .react-select__control {
      margin-bottom: 32px;
    }
  }

  ${up('xl')} {
    width: 46%;
  }
`;

export const ExpireTo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  p {
    flex: 0 0 auto;
    margin-right: 20px;

    ${up('xl')} {
      ${font('lg')};
      margin-right: 40px;
    }
  }

  .mui-picker {
    flex: 0 1 100%;
  }
`;
