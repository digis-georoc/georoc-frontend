import colors from 'tailwindcss/colors'

export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // primary: '#399ed4',
        // 'primary-50' : '#dbf1ff',
        // 'primary-100' : '#97cae6',
        // 'primary-300' : '#4eb0e6',
        // 'primary-400' : '#50A5D3',
        // 'primary-700' : '#3a7899',

        primary: '#0668a1', // #0A66C2
        'primary-50' : '#e6f7ff',
        'primary-100' : '#c3d8e6',
        'primary-300' : '#067fc9',
        'primary-400' : '#005f9b',
        'primary-700' : '#004f80',

        // primary: '#265cbf',
        // 'primary-50' : '#e3ecfc',
        // 'primary-100' : '#a7b8d6',
        // 'primary-300' : '#2d6de3',
        // 'primary-400' : '#265cbf',
        // 'primary-700' : '#1d3e7d',
        gray: colors.slate,
      },
      screens: {
        'landscape': {
          'raw': '(orientation: landscape)'
        }
      }
    }
  }
}
