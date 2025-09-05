// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1B5196', contrastText: '#fff' },
    secondary: { main: '#C8102E', contrastText: '#fff' },
    warning: { main: '#FFCB00' },
    text: { primary: '#231F20', secondary: '#555' },
    background: { default: '#fff', paper: '#fff' }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    button: { textTransform: 'none' }
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12 },
      }
    }
  }
});

export default theme;
