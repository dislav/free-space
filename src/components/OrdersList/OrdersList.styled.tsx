import styled from 'styled-components';

import { Container as OrderCard } from '../OrderCard/OrderCard.styled';
import { Container as OrderCardSkeleton } from '../OrderCardSkeleton/OrderCardSkeleton.styled';

export const Container = styled.div`
  ${OrderCard}, ${OrderCardSkeleton} {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
