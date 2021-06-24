import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { font } from '../../styles/utils';
import { Container as ChatTab } from '../ChatTab/ChatTab.styled';

export const Container = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  max-height: 74vh;
  background-color: ${({ theme }) => theme.colors.blue10};
  border-radius: ${({ theme }) => theme.variables.borderRadius};
  padding: 56px;

  ${up('xxl')} {
    min-height: 76vh;
    max-height: 76vh;
  }
`;

export const Sidebar = styled.div`
  width: 26%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.variables.greenGradient};
  border-radius: ${({ theme }) => theme.variables.borderRadius};
  padding: 40px 30px;
  margin-right: 60px;

  ${ChatTab} {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #b1e0f9;
  margin-right: 14px;
`;

export const LogoText = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    ${font('xl')};
    line-height: 1;
    font-weight: 700;
  }

  span {
    ${font('sm')};
    line-height: 1;
    font-weight: 500;
  }
`;
