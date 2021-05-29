import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray40};
  font-size: 16px;
  font-weight: 500;
  border-top: 1px solid ${({ theme }) => theme.colors.gray10};
  margin-bottom: 14px;
  padding: 14px 80px 0;
`;

export const Column = styled.div`
  flex: 1 1 100%;
  padding-right: 40px;
`;
