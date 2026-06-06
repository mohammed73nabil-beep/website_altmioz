<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Preconnect for Google Fonts & Icons (highest priority) --}}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com">
        <link rel="dns-prefetch" href="https://fonts.gstatic.com">

        {{-- Load Google Fonts asynchronously (non-render-blocking) --}}
        <link rel="preload" as="style"
              href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap"
              onload="this.onload=null;this.rel='stylesheet'">
        <noscript>
            <link rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap">
        </noscript>

        {{-- Material Symbols: async load + font-display:swap to prevent render-blocking --}}
        <link rel="preload" as="style"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
              onload="this.onload=null;this.rel='stylesheet'">
        <noscript>
            <link rel="stylesheet"
                  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap">
        </noscript>

        {{-- Critical inline styles to prevent FOUT/CLS before fonts load --}}
        <style>
            @font-face {
                font-family: 'Material Symbols Outlined';
                font-style: normal;
                font-display: swap;
            }
            .material-symbols-outlined {
                font-family: 'Material Symbols Outlined';
                min-width: 1em;
                min-height: 1em;
                display: inline-block;
                visibility: visible;
            }
            /* Prevent invisible text flash while Almarai loads */
            body { font-family: 'Almarai', 'Arial', sans-serif; }
        </style>

        {{-- Page title overridden per-page via Inertia <Head> --}}
        <title inertia> مظلات وسواتر التميز</title>

        {{-- Canonical (default) --}}
        <link rel="canonical" href="{{ url()->current() }}">

        {{-- Basic JSON-LD Organization (extend per page if needed) --}}
        <script type="application/ld+json">
            {
                "\u0040context": "https://schema.org",
                "@type": "Organization",
                "name": "{{ config('app.name') }}",
                "url": "{{ rtrim(config('app.url'), '/') }}",
                "logo": "{{ asset('images/logo.png') }}"
            }
        </script>

        {{-- Scripts --}}
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
