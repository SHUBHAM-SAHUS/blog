'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#a17fff', // $purple-100
    },
    secondary: {
      main: '#fe649f', // $pink-100
    },
    success: {
      main: '#5cc9b5', // $green-100
    },
    warning: {
      main: '#fec430', // $yellow-100
    },
    error: {
      main: '#dc3545', // $error-100
    },
    info: {
      main: '#baa1ff', // $light-purple
    },
    text: {
      primary: '#ffffff', // $heading-text
      secondary: '#cfcfcf', // $body-text
      disabled: '#505050', // $disable-text
    },
    background: {
      // paper: '#FFFFFF', // $black
      paper: '#ecf0f3', // $black
      // paper: '#111', // $black
    },
    grey: {
      500: '#a9a9a9', // $grey
      // 600: '#515151', // $light-grey
      600: '#333333', // $light-grey
    },
    action: {
      disabled: '#505050', // $disable-text
    },
    customColors: {
      purple: '#BAA1FF',
      secondaryPurple: '#9b59b6',
      tertiaryPurple: '#8e44ad',
      pink: '#fe649f',
      green: '#5cc9b5',
      yellow: '#fec430',
      white: '#FFFFFF',
      disabledColor: '#7D7D7D',
      buttonShadow: '#5B5A5A',
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: {
      fontFamily: '"DM Serif Display", serif',
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"DM Serif Display", serif',
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 992,
      lg: 1400,
      xl: 1536,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'FFFFFF',
        },
      },
    },
  },
});

export default theme;
