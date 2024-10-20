/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
            './public/index.html'
  ],
  theme: {
    extend: {
      width: {
        '1110': '1100px'
      },
      backgroundColor: {
        primary: '#F5F5F5',
        secondary1: '#1266dd',
        secondary2: '#f73859'
      }
    },
  },
  plugins: [],
}