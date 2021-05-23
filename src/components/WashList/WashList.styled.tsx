import styled from 'styled-components';
import { Container as WashCard } from '../WashCard/WashCard.styled';
import { Container as WashCardSkeleton } from '../WashCardSkeleton/WashCardSkeleton.styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  ${WashCard}, ${WashCardSkeleton} {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
