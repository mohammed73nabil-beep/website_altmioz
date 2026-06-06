/**
 * SeoHead.jsx — مكوّن SEO مركزي محسّن
 *
 * يدعم:
 * - Dynamic Title + Meta Description
 * - Canonical URL (من الخادم)
 * - Open Graph + Twitter Card
 * - LocalBusiness / Service / BlogPosting / FAQ / Breadcrumb Schemas
 * - robots meta
 */

import React from 'react';
import { Head, usePage } from '@inertiajs/react';

export default function SeoHead({
    title,
    description,
    image,
    url,
    type = 'website',
    robots = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    schema = null,
    extraSchemas = [],   // مصفوفة من Schemas إضافية (FAQPage, BreadcrumbList, ...)
    breadcrumbs = null,  // [{ name, url }] — ينتج BreadcrumbList schema تلقائياً
}) {
    const { globalSettings } = usePage().props;

    const siteName  = globalSettings?.site_name?.value  || 'شركة مظلات وسواتر التميز';
    const sitePhone = globalSettings?.contact_phone?.value || '';
    const siteEmail = globalSettings?.contact_email?.value || '';
    const siteAddr  = globalSettings?.address?.value   || 'الرياض، المملكة العربية السعودية';
    const appUrl    = typeof window !== 'undefined' ? window.location.origin : '';

    const fullTitle    = title ? `${title} | ${siteName}` : siteName;
    const canonicalUrl = url || (typeof window !== 'undefined' ? window.location.href : appUrl);
    const ogImage      = image || `${appUrl}/images/og-default.jpg`;

    // ——— LocalBusiness Schema الافتراضي ———
    const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: siteName,
        description: description || `شركة مظلات وسواتر التميز متخصصة في تركيب المظلات والسواتر والبرجولات والهناجر بأعلى جودة في الرياض والمملكة العربية السعودية.`,
        url: appUrl,
        telephone: sitePhone,
        email: siteEmail,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'الرياض',
            addressRegion: 'الرياض',
            addressCountry: 'SA',
            streetAddress: siteAddr,
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: '24.7136',
            longitude: '46.6753',
        },
        areaServed: [
            { '@type': 'City', name: 'الرياض' },
            { '@type': 'Country', name: 'Saudi Arabia' },
        ],
        priceRange: '$$',
        image: ogImage,
        openingHours: 'Sa-Th 08:00-22:00',
    };

    // ——— BreadcrumbList Schema تلقائي إذا مُررت breadcrumbs ———
    const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    } : null;

    // ——— تجميع جميع Schemas ———
    const allSchemas = [
        schema || localBusinessSchema,
        ...(breadcrumbSchema ? [breadcrumbSchema] : []),
        ...extraSchemas,
    ];

    return (
        <Head>
            {/* ——— Title ——— */}
            <title>{fullTitle}</title>

            {/* ——— Meta ——— */}
            <meta name="description" content={description || `${siteName} — متخصصون في تركيب المظلات والسواتر والبرجولات والهناجر بأعلى جودة في الرياض والمملكة العربية السعودية.`} />
            <meta name="robots" content={robots} />

            {/* ——— Canonical ——— */}
            <link rel="canonical" href={canonicalUrl} />

            {/* ——— hreflang ——— */}
            <link rel="alternate" hrefLang="ar" href={canonicalUrl} />
            <link rel="alternate" hrefLang="ar-SA" href={canonicalUrl} />
            <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

            {/* ——— Open Graph ——— */}
            <meta property="og:type"        content={type} />
            <meta property="og:site_name"   content={siteName} />
            <meta property="og:title"       content={fullTitle} />
            <meta property="og:description" content={description || `${siteName} — متخصصون في المظلات والسواتر والبرجولات في المملكة العربية السعودية.`} />
            <meta property="og:url"         content={canonicalUrl} />
            <meta property="og:image"       content={ogImage} />
            <meta property="og:image:width"  content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale"      content="ar_SA" />

            {/* ——— Twitter Card ——— */}
            <meta name="twitter:card"        content="summary_large_image" />
            <meta name="twitter:title"       content={fullTitle} />
            <meta name="twitter:description" content={description || `${siteName} — متخصصون في المظلات والسواتر والبرجولات في المملكة العربية السعودية.`} />
            <meta name="twitter:image"       content={ogImage} />

            {/* ——— Font ——— */}
            <link
                href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap"
                rel="stylesheet"
            />

            {/* ——— Schema.org JSON-LD (متعدد) ——— */}
            {allSchemas.map((s, i) => (
                <script key={i} type="application/ld+json">
                    {JSON.stringify(s)}
                </script>
            ))}
        </Head>
    );
}
