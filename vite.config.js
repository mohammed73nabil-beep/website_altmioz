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
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes('node_modules')) return;

                    const pkg = id.toString().split('node_modules/')[1].split('/')[0];

                    // Core React runtime — keep separate for optimal caching
                    if (pkg === 'react' || pkg === 'react-dom' || pkg === 'scheduler') {
                        return 'react-runtime';
                    }

                    // Inertia + routing
                    if (pkg === '@inertiajs' || pkg === 'axios') {
                        return 'inertia-core';
                    }

                    // UI libraries
                    if (pkg === '@headlessui' || pkg === '@floating-ui' || pkg === 'react-hot-toast') {
                        return 'ui-libs';
                    }

                    // Tanstack / aria / stately (often pulled together)
                    if (pkg.startsWith('@tanstack') || pkg.startsWith('@react-aria') || pkg.startsWith('@react-stately')) {
                        return 'aria-libs';
                    }

                    // Tiny utility packages — consolidate into one chunk
                    const utilPackages = [
                        'qs', 'object-inspect', 'side-channel', 'side-channel-weakmap',
                        'side-channel-list', 'side-channel-map', 'gopd', 'get-intrinsic',
                        'has-symbols', 'hasown', 'es-errors', 'es-object-atoms',
                        'es-define-property', 'get-proto', 'dunder-proto', 'call-bound',
                        'call-bind-apply-helpers', 'math-intrinsics', 'function-bind',
                        'use-sync-external-store', 'clsx', 'goober', 'tabbable',
                    ];
                    if (utilPackages.includes(pkg)) {
                        return 'vendor-utils';
                    }

                    // Everything else: per-package chunk (SVG fonts, lodash, etc.)
                    return pkg;
                },
            },
        },
    },
    esbuild: {
        drop: ['console', 'debugger'],
    }
});
