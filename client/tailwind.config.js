/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
            './public/index.html'
  ],
  theme: {
    extend: {
      width : {
        '1100' : '1100px' // chieu rong cua login 
      },
      backgroundColor: {
        primary: '#C0C0C0',
        secondary1: '#1266dd',
        secondary2: '#f73859',
        'overlay-30': 'rgba(0,0,0,0.3)',
        'overlay-70': 'rgba(0,0,0,0.7)',
      },
    },
  },
  plugins: [],
}