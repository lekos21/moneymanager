/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./styles/**/*.{css}"] ,
  safelist: [
    // Border colors
    'border-orange-400', 'border-green-500', 'border-purple-500', 'border-red-500', 'border-blue-500',
    'border-blue-400', 'border-green-400', 'border-yellow-500', 'border-teal-500', 'border-indigo-500',
    'border-blue-600', 'border-pink-500', 'border-pink-300', 'border-gray-300',
    
    // Background colors
    'bg-orange-50', 'bg-green-50', 'bg-purple-50', 'bg-red-50', 'bg-blue-50', 'bg-yellow-50',
    'bg-teal-50', 'bg-indigo-50', 'bg-pink-50', 'bg-gray-50',
    
    // Text colors
    'text-orange-600', 'text-green-600', 'text-purple-600', 'text-red-600', 'text-blue-600',
    'text-yellow-600', 'text-teal-600', 'text-indigo-600', 'text-blue-700', 'text-pink-600',
    'text-gray-600'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7B3FE4',
        secondary: '#9C6EFF',
      },
      borderRadius: {
        xl: '16px',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
};
