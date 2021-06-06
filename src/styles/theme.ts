const theme = {
  fonts: {
    gilroy: 'Gilroy',
  },
  variables: {
    borderRadius: '1.125rem',
    blueGradient: `linear-gradient(to right, #9FD4D8, #B1E0F9)`,
    greenGradient: 'linear-gradient(to right, #D2EAF7, #CFECEE)',
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
    blue40: '#ADDEF1',

    green20: '#A2D6DA',
    green30: '#64B2B8',
  },
  fontSize: {
    xs: [10, 12],
    sm: [14, 20],
    base: [16, 24],
    lg: [20, 28],
    xl: [24, 32],
    '2xl': [28, 36],
    '3xl': [44, 48],
    '4xl': [60, 60],
  },
};

export const { fonts, variables, breakpoints, colors, fontSize } = theme;
export default theme;
