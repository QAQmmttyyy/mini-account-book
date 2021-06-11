import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import plainText from 'vite-plugin-plain-text';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), plainText(/\.csv$/)]
})
