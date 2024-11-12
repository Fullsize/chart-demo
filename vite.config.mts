import { defineConfig, normalizePath } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import dynamicImport from 'vite-plugin-dynamic-import'
import { viteStaticCopy } from 'vite-plugin-static-copy';

// vite.config.mts

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [
    dynamicImport(),
    react(),
    legacy(),
    isProd && viteStaticCopy({
      targets: [
        { src: normalizePath(path.resolve(__dirname, 'assets')), dest: '' },
      ]
    })
  ].filter(Boolean),
  base: './',
  server: {
    port: 8083,
    host: "0.0.0.0",
    hmr: {
      overlay: false,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@images': path.resolve(__dirname, './assets/images'),
      '@svg': path.resolve(__dirname, './assets/svg')
    }
  },
  optimizeDeps:{
    exclude:['lodash-es']
  },
  build: {
    sourcemap: true, // Add this line to enable source maps
  },
});
