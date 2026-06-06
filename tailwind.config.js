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
                "primary": "#C5A059",
                "background-light": "#FDFBF7",
                "background-dark": "#0F172A",
                "surface-dark": "#1E293B",
                "sidebar-dark": "#0B1120",
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                display: ["IBM Plex Sans Arabic", "Manrope", "sans-serif"],
            },
        },
    },

    plugins: [forms],
};
