import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { Container as ProfileAvatar } from '../ProfileAvatar/ProfileAvatar.styled';
import { font } from '../../styles/utils';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.blue10};
  border-radius: ${({ theme }) => theme.variables.borderRadius};
  padding: 28px 14px;

  ${up('xl')} {
    flex-direction: row;
    justify-content: space-between;
    padding: 60px 80px;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 54px;

  &:last-child {
    margin-bottom: 0;
  }

  ${up('xl')} {
    width: 46%;
    margin-bottom: 0;
  }

  h2 {
    ${font('lg')};
    font-weight: 700;
    margin-bottom: 20px;

    ${up('xl')} {
      margin-bottom: 30px;
    }
  }

  > p {
    ${font('sm')};
    font-weight: 500;
    margin-bottom: 30px;

    ${up('xl')} {
      margin-bottom: 40px;
    }
  }

  ${ProfileAvatar} {
    margin-bottom: 34px;

    ${up('xl')} {
      margin-bottom: 46px;
    }
  }
`;

export const Time = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  ${up('xl')} {
    margin-bottom: 36px;
  }

  p {
    margin-bottom: 16px;
  }

  span {
    color: #9ccdd0;
    margin: 0 10px;
  }
`;
