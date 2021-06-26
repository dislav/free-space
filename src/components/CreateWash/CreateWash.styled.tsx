import styled from 'styled-components';
import { MapContainer } from 'react-leaflet';
import { up } from 'styled-breakpoints';

export const Container = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.blue10};
  border-radius: 18px;
  padding: 40px 12px;

  ${up('xl')} {
    padding: 30px;
  }

  ${up('xxl')} {
    padding: 76px 80px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  ${up('xl')} {
    width: 35%;
  }
`;

export const FormTime = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 36px;

  p {
    margin-bottom: 16px;
  }

  span {
    color: #9ccdd0;
    margin: 0 10px;
  }
`;

export const Map = styled(MapContainer)`
  overflow: hidden;

  ${up('xl')} {
    width: 60%;
    max-height: 500px;
    margin-left: auto;
    border-radius: 18px;
  }

  .leaflet-div-icon {
    background: transparent;
    border: none;
  }
`;
