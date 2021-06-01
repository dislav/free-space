import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { font } from '../../styles/utils';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  p {
    ${font('sm')}
    margin-bottom: 40px;

    ${up('xl')} {
      ${font('lg')}
    }
  }
`;

export const TextError = styled.p`
  color: red;
  font-size: 20px;
  font-weight: bold;
`;
