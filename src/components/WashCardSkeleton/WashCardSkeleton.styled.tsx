import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 94px;
  background-color: ${({ theme }) => theme.colors.gray10};
  border-radius: 18px;
  padding: 38px 80px;
`;
