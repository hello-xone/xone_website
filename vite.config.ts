import { defineConfig } from 'vite';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
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
