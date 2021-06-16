import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { font } from '../../styles/utils';

import { Container as DropdownMenu } from '../DropdownMenu/DropdownMenu.styled';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  font-weight: 500;
  ${font('base')}
  min-height: 150px;
  background: ${({ theme }) => theme.variables.greenGradient};
  border-radius: ${({ theme }) => theme.variables.borderRadius};
  padding: 20px 22px;

  ${up('xl')} {
    flex-wrap: nowrap;
    min-height: auto;
    padding: 38px 80px;
  }

  ${DropdownMenu} {
    position: absolute;
    top: 20px;
    right: 22px;

    ${up('xl')} {
      top: 50%;
      right: 60px;
      transform: translateY(-50%);
    }
  }
`;

export const Column = styled.div`
  flex: 1 1 100%;
  padding-right: 60px;

  ${up('xl')} {
    padding-right: 40px;
  }

  &:last-child {
    margin-top: auto;

    ${up('xl')} {
      margin-top: 0;
    }
  }
`;
