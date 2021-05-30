const theme = {
  fonts: {
    gilroy: 'Gilroy',
  },
  variables: {
    borderRadius: '1.125rem',

    blueGradient: 'linear-gradient(to right, #9FD4D8, #B1E0F9)',

    greenGradient: 'linear-gradient(to right, #D2EAF7, #CFECEE)'
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1440px',
    fhd: '1900px',
  },
  colors: {
    white: '#FFFFFF',
    black: '#000000',

    gray10: '#F5F5F5',
    gray20: '#D9D9D9',
    gray40: '#7A7A7A',

    blue10: '#E8F6FE',
    blue30: '#D2EAF7',

    green20: '#A2D6DA',
    green30: '#64B2B8',
  },
  typography: {},
};

export const { fonts, variables, breakpoints, colors, typography } = theme;
export default theme;
