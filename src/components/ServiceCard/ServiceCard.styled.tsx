import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { font } from '../../styles/utils';
import { Container as DropdownMenu } from '../DropdownMenu/DropdownMenu.styled';

export const Container = styled.div<{ active?: boolean }>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  font-weight: 500;
  min-height: 150px;
  background: ${({ theme, active }) =>
    active
      ? theme.variables.greenGradient
      : 'linear-gradient(to right, #D2EAF7, #F7FFC9)'};
  border-radius: ${({ theme }) => theme.variables.borderRadius};
  padding: 20px 22px;

  ${up('xl')} {
    flex-wrap: nowrap;
    min-height: auto;
    padding: 38px 40px;
  }

  ${up('xxl')} {
    padding: 38px 80px;
  }

  ${DropdownMenu} {
    position: absolute;
    top: 20px;
    right: 22px;

    ${up('xl')} {
      top: 50%;
      right: 40px;
      transform: translateY(-50%);
    }

    ${up('xxl')} {
      right: 60px;
    }
`;

export const Column = styled.div`
  padding-right: 60px;

  ${up('xl')} {
    padding-right: 40px;
  }

  &:nth-child(1) {
    ${font('base')}
    flex: 1 1 100%;
    margin-bottom: 10px;

    ${up('xl')} {
      flex: 1 1 25%;
      margin-bottom: 0;
    }
  }

  &:nth-child(2) {
    flex: 1 1 100%;
    order: 1;

    ${up('xl')} {
      flex: 1 1 15%;
      order: inherit;
    }
  }

  &:nth-child(3) {
    ${font('xs')}
    flex: 1 1 100%;
    margin-bottom: 30px;

    ${up('xl')} {
      ${font('base')}
      flex: 1 1 50%;
      margin-bottom: 0;
    }
  }

  &:nth-child(4) {
    display: none;
    flex: 1 1 100%;
    white-space: nowrap;

    ${up('xl')} {
      display: block;
      flex: 1 1 10%;
    }
  }
`;
