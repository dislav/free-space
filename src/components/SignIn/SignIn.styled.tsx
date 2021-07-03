import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { font } from '../../styles/utils';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 32px);
  background-color: ${({ theme }) => theme.colors.blue10};
  border-radius: ${({ theme }) => theme.variables.borderRadius};
  padding: 40px 14px;

  ${up('md')} {
    width: 460px;
    max-width: 520px;
    padding: 30px;
  }

  ${up('xxl')} {
    width: 520px;
    max-width: 520px;
    padding: 3.75rem 5.625rem;
  }

  h1 {
    ${font('2xl')}
    font-weight: bold;
    margin-bottom: 16px;

    ${up('xl')} {
      margin-bottom: 20px;
    }

    ${up('xxl')} {
      ${font('3xl')}
      margin-bottom: 46px;
    }
  }
`;

export const Link = styled.div`
  text-decoration: underline;
  cursor: pointer;
`;
