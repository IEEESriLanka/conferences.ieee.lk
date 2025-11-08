import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'public',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'public/index.html',
        conferences: 'public/conferences.html',
        committee: 'public/committee.html',
        guidelines: 'public/guidelines.html',
        resources: 'public/resources.html',
        workshops: 'public/workshops.html',
        conf: 'public/conf/details.html',
        404: 'public/404.html'
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});