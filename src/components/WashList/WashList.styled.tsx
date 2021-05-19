import styled from 'styled-components';
import { Container as WashCard } from '../WashCard/WashCard.styled';
import { Container as WashCardSkeleton } from '../WashCardSkeleton/WashCardSkeleton.styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.colors.gray10};
  padding-top: 14px;

  ${WashCard}, ${WashCardSkeleton} {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const Titles = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray40};
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 14px;
  padding: 0 80px;
  
  > div {
    flex: 1;
  }
`;
