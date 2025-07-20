/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jupiter-green': '#62cbc1',
        'jupiter-dark': '#0A0A0A',
        'jupiter-gray': '#1A1A1A',
        'jupiter-light-gray': '#2A2A2A',
        'jupiter-text': '#FFFFFF',
        'jupiter-text-secondary': '#A0A0A0',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'stars': "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"20\" cy=\"20\" r=\"1\"%3E%3C/circle%3E%3Ccircle cx=\"80\" cy=\"40\" r=\"1\"%3E%3C/circle%3E%3Ccircle cx=\"40\" cy=\"80\" r=\"1\"%3E%3C/circle%3E%3Ccircle cx=\"60\" cy=\"10\" r=\"1\"%3E%3C/circle%3E%3Ccircle cx=\"10\" cy=\"60\" r=\"1\"%3E%3C/circle%3E%3Ccircle cx=\"90\" cy=\"90\" r=\"1\"%3E%3C/circle%3E%3C/g%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
} 