/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      inter: ['Inter'],
    },
    extend: {
      colors: {
        sena: '#01AF00',
        fondo: '#F9FDEC',
        gris: '#585656',
        negro: '#000000',
        input: '#1E1E1E',
        correo: '#7BA3DF',
        grisClaro: '#D9D9D9'
      },
      margin: {
        custom: '20rem',
      },
    },
  },
  variants: {
    boderWidth: ['responsive', 'hover', 'focus'],
    display: ['focus-group']
  },
  plugins: [],
}

