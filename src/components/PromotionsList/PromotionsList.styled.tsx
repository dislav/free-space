import styled from 'styled-components';

import TableList from '../TableList/TableList';
import { Column as TableListColumn } from '../TableList/TableList.styled';

export const Container = styled(TableList)`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

  ${TableListColumn}:nth-child(1) {
    flex: 1 1 60%;
  }

  ${TableListColumn}:nth-child(2) {
    flex: 1 1 40%;
  }

  ${TableListColumn}:nth-child(3) {
    flex: 1 1 140%;
  }
`;
