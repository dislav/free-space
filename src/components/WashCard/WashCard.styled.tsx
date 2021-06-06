import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { Container as DropdownMenu } from '../DropdownMenu/DropdownMenu.styled';

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
    min-height: auto;
    flex-wrap: nowrap;
    align-items: center;
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
  padding-right: 40px;

  &:nth-child(1) {
    flex: 0 0 100%;

    ${up('xl')} {
      flex: 1 1 100%;
    }
  }

  &:nth-child(2),
  &:nth-child(3) {
    flex: 1 1 50%;
    margin-top: auto;

    ${up('xl')} {
      flex: 1 1 100%;
    }
  }

  &:nth-child(3) {
    display: flex;
    justify-content: flex-end;
    padding-right: 0;

    ${up('xl')} {
      justify-content: flex-start;
    }
  }

  &:nth-child(4) {
    display: none;

    ${up('xl')} {
      display: block;
    }
  }
`;
