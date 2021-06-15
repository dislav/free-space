import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { Container as DropdownMenu } from '../DropdownMenu/DropdownMenu.styled';
import { font } from '../../styles/utils';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  font-weight: 500;
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
    z-index: 1;

    ${up('xl')} {
      top: 50%;
      right: 60px;
      transform: translateY(-50%);
    }
`;

export const Column = styled.div`
  flex: 1 1 100%;
  padding-right: 60px;

  ${up('xl')} {
    padding-right: 40px;
  }

  &:nth-child(1) {
    ${font('base')}
    flex: 1 1 100%;
    margin-bottom: 10px;

    ${up('xl')} {
      flex: 1 1 60%;
      margin-bottom: 0;
    }
  }

  &:nth-child(2) {
    flex: 1 1 100%;
    order: 1;

    ${up('xl')} {
      flex: 1 1 40%;
      order: inherit;
    }
  }

  &:nth-child(3) {
    flex: 1 1 100%;
    ${font('xs')};
    margin-bottom: 20px;

    ${up('xl')} {
      flex: 1 1 140%;
      ${font('base')}
      margin-bottom: 0;
    }
  }
`;
