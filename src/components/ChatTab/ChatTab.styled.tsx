import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { font } from '../../styles/utils';

export const Container = styled.div<{ active?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.blue10 : null};
  transition: background-color 0.3s;
  padding: 16px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue10};
  }

  span {
    color: ${({ theme }) => theme.colors.black};

    ${up('xl')} {
      ${font('sm')};
    }
  }
`;

export const UserTitle = styled.div`
  position: relative;
  color: ${({ theme }) => theme.colors.black};
  ${font('base')};
  font-weight: 500;

  ${up('xl')} {
    ${font('lg')};
    border-radius: ${({ theme }) =>
      `${theme.variables.borderRadius} 0 0 ${theme.variables.borderRadius}`};
  }
`;

export const NewCircle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #e34343;
`;
