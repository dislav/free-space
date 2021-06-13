import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { font } from '../../styles/utils';

export const Container = styled.div`
  position: relative;
  padding: 40px 16px;

  ${up('xl')} {
    margin-left: 280px;
    padding: 30px 40px 60px;
  }

  ${up('xxl')} {
    margin-left: 420px;
    padding: 60px 80px 80px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 26px;

  ${up('xl')} {
    margin-bottom: 44px;
  }

  h1 {
    width: 100%;
    ${font('2xl')}
    font-weight: 700;
    order: 1;
    margin-top: 26px;

    ${up('xl')} {
      width: auto;
      margin-top: 0;
      order: inherit;
    }
  }
`;
