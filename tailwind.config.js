import colors from 'tailwindcss/colors'

export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0668a1',
        'primary-50' : '#e6f7ff',
        'primary-100' : '#c3d8e6',
        'primary-300' : '#067fc9',
        'primary-400' : '#005f9b',
        'primary-700' : '#004f80',
        gray: {
          '50': colors.slate['50'],
          '100': colors.slate['100'],
          '200': colors.slate['200'],
          '300': colors.slate['300'],
          '400': colors.slate['400'],
          '500': colors.slate['500'],
          '600': colors.slate['600'],
          '700': colors.slate['700'],
          '800': colors.zinc['800'],
          '900': colors.zinc['900'],
          '950': colors.zinc['950'],
        },
      },
      screens: {
        'landscape': {
          'raw': '(orientation: landscape)'
        }
      }
    }
  }
}
