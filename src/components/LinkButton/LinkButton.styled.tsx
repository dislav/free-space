import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  background: linear-gradient(to bottom, #9fd4d8, #b1e0f9);
  border-radius: 50%;
`;
