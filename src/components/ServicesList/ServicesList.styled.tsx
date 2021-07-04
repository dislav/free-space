import styled from 'styled-components';

import TableList from '../TableList/TableList';
import { Column as TableListColumn } from '../TableList/TableList.styled';

export const Container = styled(TableList)`
  margin-bottom: 40px;

  ${TableListColumn}:nth-child(1) {
    flex: 1 1 25%;
  }

  ${TableListColumn}:nth-child(2) {
    flex: 1 1 15%;
  }

  ${TableListColumn}:nth-child(3) {
    flex: 1 1 50%;
  }

  ${TableListColumn}:nth-child(4) {
    flex: 1 1 10%;
  }
`;
