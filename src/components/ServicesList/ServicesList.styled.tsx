import styled from 'styled-components';

import {
  Container as ListHeader,
  Column as ListHeaderColumn,
} from '../ListHeader/ListHeader.styled';
import { Container as ServiceCard } from '../ServiceCard/ServiceCard.styled';

export const Container = styled.div`
  ${ListHeader} {
    ${ListHeaderColumn}:nth-child(1) {
      flex: 1 1 25%;
    }

    ${ListHeaderColumn}:nth-child(2) {
      flex: 1 1 15%;
    }

    ${ListHeaderColumn}:nth-child(3) {
      flex: 1 1 50%;
    }

    ${ListHeaderColumn}:nth-child(4) {
      flex: 1 1 10%;
    }
  }

  ${ServiceCard} {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
