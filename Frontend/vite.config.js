import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(
    {
      babel: {
        plugins: ['@babel/plugin-transform-react-jsx'],
      },
      build:{
        rollupOptions:{
          input:[]
        }
      },
      optimizeDeps: {
        entries: [],
      },
    }
  )],
  
  server: {
    strictPort: true,
    proxy: {
      '/api': {
        target: process.env.REACT_APP_BASE_API,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },

  esbuild: {
    loader: "jsx",
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
        ".ts": "tsx",
      },
    },
  },
})
