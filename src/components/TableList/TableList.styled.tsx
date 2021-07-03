import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { font } from '../../styles/utils';

import { Container as WashCardSkeleton } from '../WashCardSkeleton/WashCardSkeleton.styled';
import { Container as PromotionCard } from '../PromotionCard/PromotionCard.styled';
import { Container as ServiceCard } from '../ServiceCard/ServiceCard.styled';
import { Container as OrderCard } from '../OrderCard/OrderCard.styled';
import { Container as WashCard } from '../WashCard/WashCard.styled';
import { Container as BoxCard } from '../BoxCard/BoxCard.styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  ${WashCardSkeleton}, ${PromotionCard}, ${WashCard}, ${BoxCard}, ${ServiceCard}, ${OrderCard} {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const Header = styled.div``;

export const Titles = styled.div`
  display: none;
  ${font('sm')};

  ${up('xl')} {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.gray40};
    font-weight: 500;
    border-top: 1px solid ${({ theme }) => theme.colors.gray10};
    margin-bottom: 14px;
    padding: 14px 40px 0;
  }

  ${up('xxl')} {
    ${font('base')};
    padding: 14px 80px 0;
  }
`;

export const TitleHead = styled.div`
  display: flex;
  align-items: center;
`;

export const Column = styled.div`
  flex: 1 1 100%;
  padding-right: 40px;

  .chakra-select__wrapper {
    max-width: 50%;
  }
`;

export const EmptyList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  color: ${({ theme }) => theme.colors.gray40};
  ${font('lg')};
  font-weight: 500;
  border-top: 1px solid ${({ theme }) => theme.colors.gray10};
  padding-top: 40px;

  ${up('xl')} {
    ${font('xl')}
  }

  svg {
    width: 26px;
    height: 26px;
    margin-left: 14px;
  }
`;
