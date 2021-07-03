import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { font } from '../../styles/utils';
import { Container as ChatTab } from '../ChatTab/ChatTab.styled';

export const Container = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  max-height: 74vh;
  border-radius: ${({ theme }) => theme.variables.borderRadius};

  ${up('xl')} {
    min-height: 80vh;
    max-height: 80vh;
    background-color: ${({ theme }) => theme.colors.blue10};
    padding: 30px;
  }

  ${up('xxl')} {
    padding: 56px;
  }
`;

export const Sidebar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.variables.greenGradient};
  border-radius: ${({ theme }) => theme.variables.borderRadius};
  padding: 30px 0;

  ${up('xl')} {
    width: 34%;
    margin-right: 40px;
    padding: 40px 30px 0;
  }

  ${up('xxl')} {
    width: 26%;
    margin-right: 60px;
  }

  ${ChatTab} {
    border-top: 1px solid #9fd4d8;

    ${up('xl')} {
      border-top: none;
      margin-bottom: 20px;
    }

    &:last-child {
      border-bottom: 1px solid #9fd4d8;
      margin-bottom: 0;

      ${up('xl')} {
        border-bottom: none;
      }
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

export const TabsWrapper = styled.div`
  overflow-y: scroll;

  ${up('xl')} {
    width: calc(100% + 32px);
    padding-bottom: 20px;
  }
`;
