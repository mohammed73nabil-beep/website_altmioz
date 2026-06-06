import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        cssMinify: true,
        minify: 'esbuild',
        // Increase chunk size warning limit
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        // Heavy admin-only libraries — never loaded on public pages
                        if (id.includes('react-quill') || id.includes('quill')) return 'admin-editor';
                        if (id.includes('@hello-pangea/dnd')) return 'admin-dnd';

                        // Framer-motion — large, only used in specific pages
                        if (id.includes('framer-motion')) return 'framer-motion';

                        // React core — always needed, cache separately
                        if (id.includes('react-dom')) return 'react-dom';
                        if (id.includes('react/') || id.includes('/react.')) return 'react-core';

                        // Inertia — framework core
                        if (id.includes('@inertiajs')) return 'inertia';

                        // Everything else in shared vendor
                        return 'vendor';
                    }
                },
                // Improve caching with content hashes
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]',
            },
        },
    },
    esbuild: {
        drop: ['console', 'debugger'],
        // Remove dead code more aggressively
        treeShaking: true,
    }
});

