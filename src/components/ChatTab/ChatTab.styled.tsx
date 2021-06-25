import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { font } from '../../styles/utils';

export const Container = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  ${font('base')};
  font-weight: 500;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.blue10 : null};
  transition: background-color 0.3s;
  padding: 16px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue10};
  }

  ${up('xl')} {
    ${font('lg')};
    border-radius: ${({ theme }) =>
      `${theme.variables.borderRadius} 0 0 ${theme.variables.borderRadius}`};
  }

  span {
    ${up('xl')} {
      ${font('sm')};
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;
