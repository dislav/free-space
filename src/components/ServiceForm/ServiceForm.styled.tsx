import styled from 'styled-components';

export const Container = styled.form`
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.blue10};
  border-radius: ${({ theme }) => theme.variables.borderRadius};
  padding: 48px 80px;
`;

export const Column = styled.div`
  &:first-child {
    width: 34%;
  }

  &:last-child {
    width: 60%;
  }
`;
