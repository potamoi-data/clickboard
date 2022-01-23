import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
const config = defineConfig({
    build: { outDir: 'build' },
    plugins: [react(), tsconfigPaths()],
    preview: { port: 8000, strictPort: true },
    server: { port: 8000, strictPort: true },
});

export default config;
