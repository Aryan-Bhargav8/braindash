const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addUtilities }) {
  const newUtilities = {
    '.animate-float': {
      '@keyframes float': {
        '0%': {
          transform: 'translateY(0)'
        },
        '50%': {
          transform: 'translateY(-20px)'
        },
        '100%': {
          transform: 'translateY(0)'
        }
      },
      animation: 'float 2s ease-in-out infinite'
    }
  }

  addUtilities(newUtilities)
})