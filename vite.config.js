import { defineConfig } from 'vite';
import ViteSvgSpriteWrapper from 'vite-svg-sprite-wrapper';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [ViteSvgSpriteWrapper(), vue()],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
});
