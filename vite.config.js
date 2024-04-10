import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path'; 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh()],
  resolve: {
    alias: {
      // Allow importing images using absolute paths
      '/@assets/': path.resolve(__dirname, 'src/assets'),
    },
  },
});