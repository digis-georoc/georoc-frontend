import colors from 'tailwindcss/colors'

export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#824e63',
        'primary-50' : '#f7e9ee',
        'primary-100' : '#e0ced5',
        'primary-300' : '#a88593',
        'primary-400' : '#8a5b6d',
        'primary-700' : '#664152'
      },
      screens: {
        'landscape': {
          'raw': '(orientation: landscape)'
        }
      }
    }
  }
}
