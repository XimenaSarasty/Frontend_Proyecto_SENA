import { createTheme } from '@mui/material/styles';
//import tailwindConfig from '../../Frontend_Proyecto_SENA/tailwind.config'; // Importa la configuración de Tailwind

const theme = createTheme({
  palette: {
    primary: {
      main: '#01AF08', // Usa el color 'sena' de Tailwind
    },
    secondary: {
      main: '#fd7e14', // Usa el color 'naranja' de Tailwind (o cualquier otro color que desees)
    },
  },
});

export default theme;
