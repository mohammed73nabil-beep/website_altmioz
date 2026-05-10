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
        minify: 'esbuild', // Faster and built-in
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        // Group only the heavy, non-critical admin libraries
                        if (id.includes('react-quill') || id.includes('quill')) return 'admin-editor';
                        if (id.includes('framer-motion')) return 'framer-motion';
                        if (id.includes('@hello-pangea/dnd')) return 'admin-dnd';
                        
                        // Keep everything else in the main vendor chunk or let Vite split it
                        return 'vendor';
                    }
                },
            },
        },
    },
    esbuild: {
        drop: ['console', 'debugger'],
    }
});
