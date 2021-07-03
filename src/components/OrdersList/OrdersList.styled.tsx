import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { font } from '../../styles/utils';
import TableList from '../TableList/TableList';
import { Column as TableListColumn } from '../TableList/TableList.styled';

export const Container = styled(TableList)`
  ${TableListColumn} {
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

    &:nth-child(7) {
      flex: 1 1 50%;
      text-align: right;
      padding-right: 0;
    }
  }
`;

export const Section = styled.div`
  border-bottom: 1px dashed ${({ theme }) => theme.colors.gray20};
  padding-bottom: 40px;
  margin-bottom: 30px;

  h2 {
    ${font('lg')};
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 14px;

    ${up('xl')} {
      ${font('xl')};
      margin-bottom: 26px;
    }
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }
`;
