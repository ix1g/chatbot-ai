/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./public/**/*.{js,css}"],
  theme: {
    extend: {
      colors: {
        // Nord theme colors
        nord: {
          0: '#2E3440',  // Polar Night
          1: '#3B4252',
          2: '#434C5E',
          3: '#4C566A',
          // Snow Storm
          4: '#D8DEE9',
          5: '#E5E9F0',
          6: '#ECEFF4',
          // Frost
          7: '#8FBCBB',
          8: '#88C0D0',
          9: '#81A1C1',
          10: '#5E81AC',
          // Aurora
          11: '#BF616A', // Red
          12: '#D08770', // Orange
          13: '#EBCB8B', // Yellow
          14: '#A3BE8C', // Green
          15: '#B48EAD'  // Purple
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}