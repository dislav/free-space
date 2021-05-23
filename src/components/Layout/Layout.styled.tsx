import styled from 'styled-components';
import { Container as Sidebar } from '../Sidebar/Sidebar.styled';
import { up } from 'styled-breakpoints';

export const Container = styled.div`
  position: relative;
  display: flex;

  ${Sidebar} {
    height: 100vh;
    min-width: 420px;
  }
`;

export const Content = styled.div`
  position: relative;

  ${up('xl')} {
    width: 1280px;
    max-width: 1280px;
    margin: 0 auto;
    padding-top: 80px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 44px;

  h1 {
    font-size: 2.25rem;
    font-weight: 700;
  }
`;
