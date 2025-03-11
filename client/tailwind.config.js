/** @type {import('tailwindcss').Config} */
import plugin from 'tailwind-scrollbar';
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js", // Include library here
  ],
  theme: {
    extend: {
      fontFamily:{
        "poppins":["Poppins","serif"],
        "bai":["Bai Jamjuree","serif"],
        "Jost":["Jost","serif"]
      },
      fontSize:{
         "label_size":"14px",
          "input_text":"13px",
      },
      height:{
       "input_height":"39px",
       "btn_height":"38px"
      },
      padding:{
         "input_padding":"12px"
      },
      fontWeight:{
          "label_weight":"400",
          "btn_font_weight":"500"
      },
      colors:{
       dark_theme:"#171924",
       bg1:"#03045e",
       bg2:"#023e8a",
       bg3:"#0077b6",
       bg4:"#0096c7",
       bg5:"#00b4d8",
       bg6:"#48cae4",
       bg7:"#90e0ef",
      },
      animation: {
        flip: 'flip 0.2s linear infinite', // Define flip animation
        'spin-slow': 'spin 3s linear infinite', // Adjust the duration
      },
      flip: {
        '0%': { transform: 'rotateX(0deg)' },
        '50%': { transform: 'rotateX(180deg)' },
        '100%': { transform: 'rotateX(360deg)' },
      },
    },
    boxShadow: {
      'glow': '0 0 10px rgba(255, 0, 0, 0.7), 0 0 20px rgba(255, 0, 0, 0.6)', // Red glow
    },
  },
  plugins: [
    plugin({ nocompatible: true }),
  ],
}