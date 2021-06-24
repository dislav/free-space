import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { font } from '../../styles/utils';

export const Container = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  width: calc(100% + 32px);
  background-color: ${({ theme, active }) =>
    active ? theme.colors.blue10 : null};
  border-radius: ${({ theme }) =>
    `${theme.variables.borderRadius} 0 0 ${theme.variables.borderRadius}`};
  transition: background-color 0.3s;
  padding: 16px 20px;
  cursor: pointer;

  ${up('xl')} {
    ${font('xl')};
    font-weight: 500;
  }

  span {
    ${up('xl')} {
      ${font('sm')};
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;
