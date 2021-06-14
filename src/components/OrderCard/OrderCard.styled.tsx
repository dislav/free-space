import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { font } from '../../styles/utils';
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
    flex-wrap: nowrap;
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
    ${font('lg')};
    margin-bottom: 10px;

    ${up('xl')} {
      ${font('base')};
      margin-bottom: 0;
    }
  }

  &:nth-child(2) {
    padding-right: 10px;

    ${up('xl')} {
      padding-right: 40px;
    }
  }

  &:nth-child(2),
  &:nth-child(5) {
    flex: 1 1 50%;
    margin-bottom: 10px;

    ${up('xl')} {
      flex: 1 1 100%;
      margin-bottom: 0;
    }
  }

  &:nth-child(3) {
    margin-bottom: 0;
    order: 1;

    ${up('xl')} {
      order: inherit;
    }
  }

  &:nth-child(4) {
    display: none;

    ${up('xl')} {
      display: block;
    }
  }

  &:nth-child(5) {
    ${up('xl')} {
      span {
        display: none;
      }
    }
  }

  &:nth-child(6) {
    margin-bottom: 10px;

    ${up('xl')} {
      margin-bottom: 0;
    }
  }
`;

export const Tag = styled.div`
  display: inline-flex;
  font-size: 14px;
  white-space: nowrap;
  background-color: ${({ theme }) => theme.colors.blue40};
  border-radius: 20px;
  padding: 2px 10px;
  margin-right: 8px;
  margin-bottom: 6px;
  cursor: pointer;
`;
