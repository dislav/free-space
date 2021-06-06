import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { up } from 'styled-breakpoints';

export const Container = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background: linear-gradient(to bottom, #9fd4d8, #b1e0f9);
  border-radius: 50%;

  ${up('xl')} {
    width: 54px;
    height: 54px;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.black};
    transform: translate(-50%, -50%);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
`;
