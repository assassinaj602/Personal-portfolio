/**** Tailwind config: default dark theme ****/
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8b5cf6',
          600: '#7c3aed',
        },
        accent: '#22d3ee',
      },
      container: { center: true, padding: '1rem' },
      boxShadow: {
        card: '0 8px 30px rgba(0,0,0,0.25)'
      }
    },
  },
  plugins: [],
}
