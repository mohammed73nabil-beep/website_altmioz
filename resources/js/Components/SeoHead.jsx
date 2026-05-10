/**
 * SeoHead.jsx — مكوّن SEO مركزي يُضاف لكل صفحة
 *
 * يتكفل بـ:
 * - title tag مُحسَّن بالكلمات المفتاحية
 * - meta description
 * - canonical URL
 * - Open Graph (OG) tags للمشاركة على التواصل الاجتماعي
 * - Twitter Card
 * - Schema.org JSON-LD للأعمال المحلية (LocalBusiness)
 * - هريفلانغ للمحتوى العربي
 */

import React from 'react';
import { Head, usePage } from '@inertiajs/react';

/**
 * @param {object} props
 * @param {string} props.title         - عنوان الصفحة (بدون اسم الموقع)
 * @param {string} props.description   - وصف الصفحة (155-160 حرف مثالي)
 * @param {string} [props.image]       - رابط صورة OG (اختياري)
 * @param {string} [props.url]         - الرابط الكامل للصفحة (للـ canonical و og:url)
 * @param {string} [props.type]        - نوع OG: website | article (افتراضي: website)
 * @param {object} [props.schema]      - بيانات schema.org إضافية (اختياري)
 */
export default function SeoHead({
    title,
    description,
    image,
    url,
    type = 'website',
    schema = null,
}) {
    const { globalSettings } = usePage().props;

    const siteName  = globalSettings?.site_name?.value  || 'حديقتي لاندسكيب';
    const sitePhone = globalSettings?.contact_phone?.value || '';
    const siteEmail = globalSettings?.contact_email?.value || '';
    const siteAddr  = globalSettings?.address?.value   || 'الرياض، المملكة العربية السعودية';
    const appUrl    = import.meta.env.VITE_APP_URL || (typeof window !== 'undefined' ? window.location.origin : '');

    // ——— بناء العنوان الكامل ———
    const fullTitle = title ? `${title} | ${siteName}` : siteName;

    // ——— رابط الصفحة الحالي ———
    const canonicalUrl = url || (typeof window !== 'undefined' ? window.location.href : appUrl);

    // ——— صورة OG الافتراضية ———
    const ogImage = image || `${appUrl}/images/hero-bg-2.jpg`;

    // ——— Schema.org LocalBusiness الافتراضي ———
    const defaultSchema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: siteName,
        description: description || `شركة متخصصة في تنسيق وتصميم الحدائق، تركيب العشب الصناعي، وتنفيذ الشلالات والنوافير في المملكة العربية السعودية.`,
        url: appUrl,
        telephone: sitePhone,
        email: siteEmail,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'الرياض',
            addressCountry: 'SA',
            streetAddress: siteAddr,
        },
        areaServed: {
            '@type': 'Country',
            name: 'Saudi Arabia',
        },
        priceRange: '$$',
        image: ogImage,
    };

    const jsonLd = schema || defaultSchema;

    return (
        <Head>
            {/* ——— Title ——— */}
            <title>{fullTitle}</title>

            {/* ——— Meta ——— */}
            <meta name="description" content={description || `${siteName} — متخصصون في تصميم وتنسيق الحدائق، تركيب العشب الصناعي، وتجهيز المساحات الخارجية بأعلى مستويات الجودة في المملكة العربية السعودية.`} />
            <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

            {/* ——— Canonical ——— */}
            <link rel="canonical" href={canonicalUrl} />

            {/* ——— hreflang للعربية ——— */}
            <link rel="alternate" hrefLang="ar" href={canonicalUrl} />
            <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

            {/* ——— Open Graph ——— */}
            <meta property="og:type"        content={type} />
            <meta property="og:site_name"   content={siteName} />
            <meta property="og:title"       content={fullTitle} />
            <meta property="og:description" content={description || `${siteName} — متخصصون في اللاندسكيب وتنسيق الحدائق.`} />
            <meta property="og:url"         content={canonicalUrl} />
            <meta property="og:image"       content={ogImage} />
            <meta property="og:image:width"  content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale"      content="ar_SA" />

            {/* ——— Twitter Card ——— */}
            <meta name="twitter:card"        content="summary_large_image" />
            <meta name="twitter:title"       content={fullTitle} />
            <meta name="twitter:description" content={description || `${siteName} — متخصصون في اللاندسكيب وتنسيق الحدائق.`} />
            <meta name="twitter:image"       content={ogImage} />

            {/* ——— Font (Almarai) ——— */}
            <link
                href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap"
                rel="stylesheet"
            />

            {/* ——— Schema.org JSON-LD ——— */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
        </Head>
    );
}
