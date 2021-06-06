import styled from 'styled-components';
import { up } from 'styled-breakpoints';

export const Container = styled.div`
  position: relative;
  width: 30px;
  height: 16px;
  cursor: pointer;

  ${up('xl')} {
    display: none;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.black};
  }

  &:before {
    width: 100%;
    top: 0;
  }

  &:after {
    width: 50%;
    bottom: 0;
  }

  span {
    position: absolute;
    top: 50%;
    width: 100%;
    height: 2px;
    transform: translateY(-50%);
    background-color: ${({ theme }) => theme.colors.black};
  }
`;
