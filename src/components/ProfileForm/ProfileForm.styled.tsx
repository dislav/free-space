import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { Container as InfoForm } from '../InfoForm/InfoForm.styled';
import { Container as PasswordForm } from '../PasswordForm/PasswordForm.styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.blue10};
  border-radius: ${({ theme }) => theme.variables.borderRadius};
  padding: 28px 14px;

  ${up('xl')} {
    flex-direction: row;
    justify-content: space-between;
    padding: 60px 80px;
  }

  ${InfoForm}, ${PasswordForm} {
    margin-bottom: 54px;

    &:last-child {
      margin-bottom: 0;
    }

    ${up('xl')} {
      width: 46%;
      margin-bottom: 0;
    }
  }
`;
