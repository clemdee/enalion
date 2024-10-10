import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';

import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import { qrcode } from 'vite-plugin-qrcode';
import vueDevTools from 'vite-plugin-vue-devtools';
import ls from './vite-plugin-ls';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => ['iconify-icon'].includes(tag),
        },
      },
    }),

    vueDevTools(),
    imagetools(),
    qrcode(),
    ls(),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
