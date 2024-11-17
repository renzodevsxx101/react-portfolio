module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Update this based on your project structure
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#777887',   // Lighter shade (misty grey)
          200: '#242f36',   // Medium shade (deep ocean-like color)
          300: '#3e3a47',   // Dark shade (slate-like color)
          400: '#252636',   // Darker shade (midnight blue)
          500: '#0f0f1e', // Darkest shade (shadowy blue),
          600: '#010026',
          blue: "#2CBCE9",
        },
        secondary: {
          100: 'rgb(192, 155, 35, 0.8)',
          200: 'rgb(192, 155, 35)'
        },
        tertiary:{
          100: '#d0d0d0',
          200: '#ffefdd',
          300: '#f6f6f6'
        }
      },
    },
  },
}
