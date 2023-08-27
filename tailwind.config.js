import colors from 'tailwindcss/colors'

export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.emerald['600'],
        'primary-50' : colors.emerald['50'],
        'primary-100' : colors.emerald['100'],
        'primary-300' : colors.emerald['300']
      }
    }
  }
}
