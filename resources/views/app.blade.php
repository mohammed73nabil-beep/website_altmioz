<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- DNS prefetch + preconnect for faster font/icon loading (prevents FOUT/CLS) --}}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com">
        <link rel="dns-prefetch" href="https://fonts.gstatic.com">
        <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

        {{-- Prevent CLS from Material Symbols font loading --}}
        <style>
            @font-face {
                font-family: 'Material Symbols Outlined';
                font-style: normal;
                font-display: swap;
            }
            .material-symbols-outlined {
                min-width: 1em;
                min-height: 1em;
                display: inline-block;
            }
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
