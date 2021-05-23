import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-content: center;
  background-color: ${({ theme }) => theme.colors.blue10};
  border-radius: 18px;
  padding: 38px 80px;
`;

export const Column = styled.div`
  flex: 1;
  padding-right: 20px;
`;
