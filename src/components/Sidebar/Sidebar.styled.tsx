import styled from 'styled-components';
import { Container as SidebarLink } from '../SidebarLink/SidebarLink.styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  ${SidebarLink} {
    max-width: 80%;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const ContainerLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 52px 0;
`;
