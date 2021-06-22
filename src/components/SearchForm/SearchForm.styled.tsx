import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  p {
    color: ${({ theme }) => theme.colors.gray40};
    font-weight: 700;
    margin-left: 40px;
  }
`;
