import styled from 'styled-components';

import { Container as OrderCard } from '../OrderCard/OrderCard.styled';

export const Container = styled.div`
  ${OrderCard} {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
