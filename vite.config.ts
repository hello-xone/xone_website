import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr';

const r = (p: string) => resolve(__dirname, p);

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const isPro = mode === 'production';
  const isBuild = command === 'build';
  return {
    resolve: {
      alias: {
        '@': r('./src')
      }
    },
    esbuild: {
      drop: isPro && isBuild ? ['console', 'debugger'] : []
    },
    server: {
      host: true
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin']
        }
      }),

      nodePolyfills({
        globals: {
          Buffer: true, // can also be 'build', 'dev', or false
          global: true,
          process: true
        }
      }),

      svgr()
    ]
  };
});
