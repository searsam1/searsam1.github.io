// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'docs', // Set the output directory to 'docs'
    // Using docs instead of dist for github deploy
  },
  // ... include any other configurations you need here ...
});
