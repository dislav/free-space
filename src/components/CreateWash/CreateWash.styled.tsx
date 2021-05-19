import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.blue10};
  border-radius: 18px;
  padding: 76px 80px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 320px;
  min-width: 320px;
`;

export const FormTime = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 36px;

  p {
    margin-bottom: 16px;
  }
`;
