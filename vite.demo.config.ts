import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
const config = defineConfig({
    build: {
        outDir: 'demo-build',
        rollupOptions: { input: resolve(__dirname, 'demo/index.html') },
        target: 'es2021',
    },
    plugins: [react(), tsconfigPaths()],
    preview: { port: 8000, strictPort: true },
    server: { port: 8000, strictPort: true },
});

export default config;
