import styled from 'styled-components';
import { Container as ListHeader, Column as ListHeaderColumn } from '../ListHeader/ListHeader.styled';
import { Container as PromotionCard } from '../PromotionCard/PromotionCard.styled';
import { Container as PromotionCardSkeleton } from '../PromotionCardSkeleton/PromotionCardSkeleton.styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  ${ListHeader} {
    ${ListHeaderColumn}:first-child {
      flex: 1 1 60%;
    }

    ${ListHeaderColumn}:nth-child(2) {
      flex: 1 1 40%;
    }

    ${ListHeaderColumn}:nth-child(3) {
      flex: 1 1 140%;
    }
  }
  
  ${PromotionCard}, ${PromotionCardSkeleton} {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
