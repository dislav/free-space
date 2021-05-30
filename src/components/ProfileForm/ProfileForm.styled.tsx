import styled from 'styled-components';
import { Container as ProfileAvatar } from '../ProfileAvatar/ProfileAvatar.styled';

export const Container = styled.form`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.blue10};
  border-radius: ${({ theme }) => theme.variables.borderRadius};
  padding: 60px 80px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 46%;

  h2 {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 30px;
  }
  
  > p {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 40px;
  }
  
  ${ProfileAvatar} {
    margin-bottom: 46px;
  }
`;

export const Time = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 36px;

  p {
    margin-bottom: 16px;
  }

  span {
    color: #9CCDD0;
    margin: 0 10px;
  }
`;
