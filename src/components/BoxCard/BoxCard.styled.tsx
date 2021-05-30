import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  background: ${({ theme }) => theme.variables.greenGradient};
  border-radius: ${({ theme }) => theme.variables.borderRadius};
  padding: 38px 80px;
`;

export const Column = styled.div`
  flex: 1 1 100%;
  padding-right: 40px;
`;
