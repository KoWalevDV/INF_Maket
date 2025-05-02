/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './src/renderer/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Добавляем современный системный шрифт Inter
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      // Расширяем цветовую палитру
      colors: {
        primary: {
          50:  '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86E7B4',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        accent: '#10B981',
      },
      // Пользовательские тени для карточек
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      // Немного более крупные/мягкие скругления
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
}
