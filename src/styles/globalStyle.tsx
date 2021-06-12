import { createGlobalStyle } from 'styled-components';
import { up } from 'styled-breakpoints';

export const GlobalStyle = createGlobalStyle`
  html {
    font-family: ${({ theme }) => theme.fonts.gilroy} !important;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.gilroy} !important;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }

  div.mui-picker__root {
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.variables.borderRadius};
    border: none;
  }

  div.react-select {
    &__control {
      min-height: 44px;
      border-radius: ${({ theme }) => theme.variables.borderRadius};

      ${up('xl')} {
        min-height: 58px;
      }
    }

    &__multi-value {
      background-color: ${({ theme }) => theme.colors.gray10};
      border-radius: ${({ theme }) => theme.variables.borderRadius};
      padding: 6px 6px 4px 12px;

      &__remove {
        justify-content: center;
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
        margin-left: 6px;
      }
    }
  }
`;
