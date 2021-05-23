import styled from 'styled-components';
import { Container as PromotionCard } from '../PromotionCard/PromotionCard.styled';
import { Container as PromotionCardSkeleton } from '../PromotionCardSkeleton/PromotionCardSkeleton.styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  ${PromotionCard}, ${PromotionCardSkeleton} {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
