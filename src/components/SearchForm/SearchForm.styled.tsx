import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  align-items: center;

  p {
    color: ${({ theme }) => theme.colors.gray40};
    font-weight: 700;
    white-space: nowrap;
    margin-left: 40px;
  }
`;
