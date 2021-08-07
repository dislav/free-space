import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { rgba } from 'polished';

export const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 6px 20px ${({ theme }) => rgba(theme.colors.black, 0.08)};
  padding: 10px 20px;
  z-index: 100;

  ${up('xl')} {
    left: auto;
    right: 40px;
    bottom: 40px;
    border-radius: 8px;
    padding: 12px 20px;
  }
`;

export const Close = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  cursor: pointer;

  &:after,
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.black};
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;
