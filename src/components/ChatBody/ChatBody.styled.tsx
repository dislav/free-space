import styled from 'styled-components';
import { up } from 'styled-breakpoints';

import { font } from '../../styles/utils';

export const Container = styled.form`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 18px 40px;

  ${up('xl')} {
    position: relative;
    background-color: transparent;
    padding: 0;
  }

  textarea {
    flex: 1 1 auto;
    resize: none;
    max-height: 100px;
    height: 100px;
    margin-right: 20px;
  }
`;

export const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #07393d;
  ${font('lg')};
  font-weight: 500;
  padding: 40px 0;

  svg {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  ${up('xl')} {
    display: none;
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 16px;
  margin-bottom: 20px;
  overflow-y: scroll;
`;

export const ContentFooter = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const Message = styled.div<{ self?: boolean }>`
  background: ${({ theme }) => theme.variables.greenGradient};
  border-radius: ${({ theme }) => theme.variables.borderRadius};
  margin-left: ${({ self }) => (self ? 'auto' : 0)};
  margin-bottom: 20px;
  padding: 16px;
`;

export const Button = styled.button`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.black};
  background-color: #aedef2;
  margin-left: auto;
`;
