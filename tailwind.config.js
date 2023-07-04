import colors from 'tailwindcss/colors'

export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.emerald['600'],
        'primary-50' : colors.emerald['50'],
        'primary-300' : colors.emerald['300']
      }
    }
  }
}
