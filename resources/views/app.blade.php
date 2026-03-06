<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- DNS prefetch + preconnect for faster font loading (fixes FOUT/CLS) -->
        <link rel="dns-prefetch" href="https://fonts.googleapis.com">
        <link rel="dns-prefetch" href="https://fonts.gstatic.com">
        <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

        <!-- Material Symbols: preconnect + font-display:swap to prevent invisible icon flash -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <style>
            /* Force swap behaviour on Material Symbols to prevent FOUT layout shifts */
            @font-face {
                font-family: 'Material Symbols Outlined';
                font-style: normal;
                font-display: swap;
            }
            /* Reserve icon space before font loads — prevents CLS */
            .material-symbols-outlined {
                min-width: 1em;
                min-height: 1em;
                display: inline-block;
            }
        </style>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
