import styled from 'styled-components';
import { up } from 'styled-breakpoints';

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
`;
