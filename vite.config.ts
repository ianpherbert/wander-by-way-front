import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command, mode})=>{


  // reusable config for both server and preview
  const serverConfig = {
    host: true,
    port: 3000,
    strictPort: true,
  };

  return {
    base: '/',
    plugins: [react()],
    preview: serverConfig,
    server: serverConfig,
  };

})
