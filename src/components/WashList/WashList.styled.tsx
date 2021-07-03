import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import TableList from '../TableList/TableList';
import { font } from '../../styles/utils';

export const Container = styled(TableList)``;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .chakra-select__wrapper {
    max-width: 240px;
    margin-left: 40px;
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
