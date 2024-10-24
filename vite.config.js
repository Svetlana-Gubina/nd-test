import { defineConfig } from 'vite';
import ViteSvgSpriteWrapper from 'vite-svg-sprite-wrapper';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [ViteSvgSpriteWrapper(), vue()],
});
