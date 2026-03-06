import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "primary": "#dba61f",
                "background-light": "#f8f7f6",
                "background-dark": "#121212",
                "surface-dark": "#1e1e1e",
                "sidebar-dark": "#0a0a0a",
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                display: ["IBM Plex Sans Arabic", "Manrope", "sans-serif"],
            },
        },
    },

    plugins: [forms],
};
