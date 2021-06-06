import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { font } from '../../styles/utils';

export const Container = styled.form`
  display: flex;
  flex-direction: column;

  p {
    text-align: center;

    ${up('xl')} {
      ${font('lg')}
      margin-bottom: 34px;
    }
  }
`;
