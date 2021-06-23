import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { Container as ProfileAvatar } from '../ProfileAvatar/ProfileAvatar.styled';
import { font } from '../../styles/utils';

export const Container = styled.form`
  display: flex;
  flex-direction: column;

  h2 {
    ${font('lg')};
    font-weight: 700;
    margin-bottom: 20px;

    ${up('xl')} {
      ${font('2xl')};
      margin-bottom: 30px;
    }
  }

  > p {
    ${font('sm')};
    font-weight: 500;
    margin-bottom: 30px;

    ${up('xl')} {
      ${font('lg')};
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
  margin-bottom: 20px;

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
