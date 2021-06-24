import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { font } from '../../styles/utils';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
`;

export const Content = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.blue10};
  border-radius: ${({ theme }) => theme.variables.borderRadius};
  padding: 20px;
  margin-bottom: 20px;
  z-index: 1;

  ${up('xl')} {
    padding: 60px;
    margin-bottom: 40px;
  }

  &:before {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 12px;
    z-index: -1;

    ${up('xl')} {
      top: 40px;
      left: 40px;
      right: 40px;
      bottom: 40px;
    }
  }
`;

export const StatisticsNumbers = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${up('xl')} {
    width: 50%;
  }
`;

export const StatisticsItem = styled.div`
  width: 50%;
  padding-right: 20px;

  ${up('xl')} {
    padding-right: 40px;
  }

  h2 {
    ${font('base')};
    font-weight: 700;
    margin-bottom: 8px;

    ${up('xl')} {
      ${font('2xl')};
      margin-bottom: 20px;
    }
  }

  p {
    ${font('sm')};
    font-weight: 500;

    ${up('xl')} {
      ${font('xl')};
    }
  }
`;
