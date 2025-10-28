// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": "http://localhost:3000", // forwards /api/* to backend
//     },
//   },
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // This is the new section you need to add
  server: {
    proxy: {
      // String shorthand:
      // any request to /api/... will be proxied to http://localhost:3000/api/...
      '/api': {
        target: 'http://localhost:3000', // Your backend server
        changeOrigin: true,
        secure: false, // (optional) if your backend is not HTTPS
      }
    }
  }
})
