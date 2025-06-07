import { createTheme } from '@mui/material/styles';

const getTheme = (mode = 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#90caf9' : '#1976d2',
    },
    secondary: {
      main: mode === 'dark' ? '#f48fb1' : '#dc004e',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#f5f5f5',
      paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#ffffff' : '#000000',
      secondary: mode === 'dark' ? '#b0b0b0' : '#4d4d4d',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: mode === 'dark' ? '#ffffff' : '#000000',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      color: mode === 'dark' ? '#ffffff' : '#000000',
    },
    body1: {
      color: mode === 'dark' ? '#e0e0e0' : '#333333',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#252525' : '#ffffff',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: mode === 'dark' ? '#2d2d2d' : '#1976d2',
          color: mode === 'dark' ? '#ffffff' : '#ffffff',
          '&:hover': {
            backgroundColor: mode === 'dark' ? '#3a3a3a' : '#115293',
          },
        },
      },
    },
  },
});

export default getTheme;