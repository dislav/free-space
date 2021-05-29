import styled from 'styled-components';
import { rgba } from 'polished';

import { Container as DropdownMenuLink } from '../DropdownMenuLink/DropdownMenuLink.styled';

export const Container = styled.div`
  position: relative;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.green20};
  border-radius: 50%;
  cursor: pointer;

  svg {
    circle {
      fill: ${({ theme }) => theme.colors.green30};
    }
  }
`;

export const Menu = styled.div`
  position: absolute;
  left: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.variables.borderRadius};
  box-shadow: 0 0 20px ${({ theme }) => rgba(theme.colors.black, 0.2)};
  padding: 14px 16px;
  transform: translate(-50%, 10px);
  z-index: 10;
  
  ${DropdownMenuLink} {
    margin-bottom: 10px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  hr {
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.blue30};
    border: none;
    margin: 10px 0;
  }
`;
