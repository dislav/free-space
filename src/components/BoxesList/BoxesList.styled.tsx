import styled from 'styled-components';

import { Container as BoxCard } from '../BoxCard/BoxCard.styled';

export const Container = styled.div`
  ${BoxCard} {
    margin-bottom: 20px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
