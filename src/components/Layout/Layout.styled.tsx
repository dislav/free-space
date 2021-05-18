import styled from 'styled-components';
import { Container as Sidebar } from '../Sidebar/Sidebar.styled';

export const Container = styled.div`
  position: relative;
  display: flex;
  
  ${Sidebar} {
    height: 100vh;
    min-width: 420px;
  }
`;

export const Content = styled.div`
  min-width: 1280px;
  margin: 0 auto;
  padding-top: 80px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 44px;
  
  h1 {
    font-size: 2.25rem;
    font-weight: 700;
  }
`;
