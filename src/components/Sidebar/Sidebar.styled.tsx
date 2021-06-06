import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { rgba } from 'polished';

import { Container as SidebarLink } from '../SidebarLink/SidebarLink.styled';

interface ISidebar {
  isOpen?: boolean;
}

export const Container = styled.div<ISidebar>`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
  z-index: 100;

  ${up('xl')} {
    opacity: 1;
    visibility: visible;
    transform: inherit;
  }

  ${up('xxl')} {
    width: 420px;
  }

  ${SidebarLink} {
    width: 100%;

    ${up('xl')} {
      max-width: 80%;
      margin-bottom: 12px;
    }

    ${up('xxl')} {
      margin-bottom: 20px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const Backdrop = styled.div<ISidebar>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme, isOpen }) =>
    isOpen ? rgba(theme.colors.black, 0.46) : null};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  transition: background-color 0.3s;
  z-index: 99;
`;

export const ContainerLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 52px 0;
`;

export const Logout = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin: auto auto 60px;
  cursor: pointer;
`;
