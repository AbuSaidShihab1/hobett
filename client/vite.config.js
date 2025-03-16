import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  server: {
    proxy: {
      '/user/checkout-page-agent/merchant1': {
        target: 'https://admin.eassypay.com',
        changeOrigin: true,
        secure: false,
      },
    },

  },
  plugins: [react()],

});

