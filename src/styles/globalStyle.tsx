import { createGlobalStyle } from 'styled-components';
import { fonts } from './theme';

export const GlobalStyle = createGlobalStyle`
  html {
    font-family: ${fonts.gilroy} !important;
  }
  
  body {
    font-family: ${fonts.gilroy} !important;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }
`;
