import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import manifest from './package.json';

// https://vitejs.dev/config/
const config = defineConfig({
    build: {
        lib: { entry: resolve(__dirname, 'src/index.ts'), name: manifest.name },
        outDir: 'build',
        rollupOptions: {
            external: [
                ...Object.keys(manifest.dependencies),
                ...Object.keys(manifest.peerDependencies),
            ],
        },
        target: 'es2021',
    },
    plugins: [react(), tsconfigPaths()],
});

export default config;
