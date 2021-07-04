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

  .mui-picker {
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  align-items: center;
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
  flex-direction: column;

  ${up('xl')} {
    width: 50%;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const StatisticsItem = styled.div`
  padding-right: 20px;
  margin-bottom: 20px;

  ${up('xl')} {
    width: 50%;
    padding-right: 40px;
    margin-bottom: 40px;
  }

  h2 {
    ${font('base')};
    font-weight: 700;
    margin-bottom: 4px;

    ${up('xl')} {
      ${font('2xl')};
      margin-bottom: 8px;
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
