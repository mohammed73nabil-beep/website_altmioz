import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';
import GallerySection from '@/Components/GallerySection';
import Footer from '@/Components/Footer';
import SeoHead from '@/Components/SeoHead';
import Breadcrumb from '@/Components/Breadcrumb';

export default function ServiceShow({ service, projects = [], galleryImages = [] }) {
    const { globalSettings, pageContents = {}, pageContentExtras = {} } = usePage().props;
    const siteName = globalSettings?.site_name?.value || 'شركة مظلات وسواتر التميز';
    const slug = service.slug;
    const appUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const canonicalUrl = `${appUrl}/services/${slug}`;

    // ———— Helpers ————
    const getContent = (key, defaultValue = '') => pageContents[key] ?? defaultValue;

    const getImageUrl = (key, defaultUrl = '') => {
        const val = pageContents[key];
        if (!val) return defaultUrl;
        if (val.startsWith('http') || val.startsWith('/')) return val;
        return `/storage/${val}`;
    };

    // ———— Scroll Reveal ————
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            });
        }, { threshold: 0.08 });

        document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [slug]);

    // ———— Breadcrumbs ————
    const breadcrumbItems = [
        { name: 'الرئيسية', url: '/' },
        { name: 'الخدمات', url: '/services' },
        { name: service.title, url: canonicalUrl },
    ];

    // ———— SEO Meta ————
    const seoTitle   = getContent(`services.${slug}.seo.title`, service.title);
    const seoDesc    = getContent(
        `services.${slug}.seo.description`,
        `شركة ${siteName} متخصصة في ${service.title} بالرياض والمملكة العربية السعودية. خبرة +10 سنوات، جودة مضمونة، أسعار تنافسية. اتصل الآن للحصول على استشارة مجانية.`
    );
    const heroImage  = getImageUrl(`services.${slug}.hero.image`, `${appUrl}/images/services_hero_bg.png`);

    // ———— Service Schema ————
    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: seoDesc,
        url: canonicalUrl,
        image: heroImage,
        provider: {
            '@type': 'LocalBusiness',
            name: siteName,
            url: appUrl,
            telephone: globalSettings?.contact_phone?.value || '',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'الرياض',
                addressRegion: 'الرياض',
                addressCountry: 'SA',
            },
        },
        areaServed: {
            '@type': 'City',
            name: 'الرياض',
        },
        serviceType: service.title,
        offers: {
            '@type': 'Offer',
            priceCurrency: 'SAR',
            availability: 'https://schema.org/InStock',
        },
    };

    // ———— FAQ Schema (from CMS or defaults) ————
    const faqItems = [
        {
            q: `كم تكلفة ${service.title} في الرياض؟`,
            a: getContent(`services.${slug}.faq.1.answer`, `تتفاوت أسعار ${service.title} حسب المساحة والمواصفات. نقدم أسعاراً تنافسية تناسب جميع الميزانيات. تواصل معنا الآن للحصول على عرض سعر مجاني ودقيق.`),
        },
        {
            q: `ما هي أفضل شركة ${service.title} في الرياض؟`,
            a: getContent(`services.${slug}.faq.2.answer`, `شركة ${siteName} من أبرز شركات ${service.title} في الرياض، تتميز بخبرة أكثر من 10 سنوات، ومئات المشاريع المنجزة، وضمانات حقيقية على جميع الأعمال.`),
        },
        {
            q: 'هل تقدمون ضماناً على أعمالكم؟',
            a: getContent(`services.${slug}.faq.3.answer`, 'نعم، نقدم ضمانات معتمدة على جميع أعمالنا تشمل جودة المواد وسلامة التركيب والتشطيب النهائي.'),
        },
        {
            q: 'كم مدة التنفيذ؟',
            a: getContent(`services.${slug}.faq.4.answer`, 'تختلف مدة التنفيذ حسب حجم المشروع وطبيعته. نلتزم دائماً بالجداول الزمنية المتفق عليها مسبقاً.'),
        },
        {
            q: 'هل تقدمون خدمة الاستشارة المجانية؟',
            a: getContent(`services.${slug}.faq.5.answer`, 'نعم، نقدم استشارة هندسية مجانية لجميع عملائنا قبل البدء في أي مشروع، مع زيارة ميدانية إذا لزم الأمر.'),
        },
        {
            q: `ما هي المواد المستخدمة في تنفيذ ${service.title}؟`,
            a: getContent(`services.${slug}.faq.6.answer`, `نستخدم أجود المواد المحلية والمستوردة في تنفيذ ${service.title}، مع الحرص على مطابقتها للمواصفات القياسية السعودية.`),
        },
        {
            q: 'ما هي مناطق الخدمة التي تغطيها الشركة؟',
            a: getContent(`services.${slug}.faq.7.answer`, 'نخدم جميع أحياء مدينة الرياض (شمال، جنوب، شرق، غرب) بالإضافة إلى المدن الرئيسية في المملكة العربية السعودية.'),
        },
        {
            q: 'هل يمكن طلب تصميم مخصص؟',
            a: getContent(`services.${slug}.faq.8.answer`, 'نعم، نقدم تصاميم مخصصة تناسب ذوقك وميزانيتك، مع إمكانية مشاركتك في اختيار الألوان والمواد والشكل النهائي.'),
        },
    ];

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
    };

    // ———— Advantages ————
    const advantages = Object.keys(pageContents)
        .filter(key => key.startsWith(`services.${slug}.why.item`) && key.endsWith('.title'))
        .map(key => {
            const baseKey = key.replace('.title', '');
            return {
                title: pageContents[key],
                desc: pageContents[`${baseKey}.desc`] || '',
                icon: pageContents[`${baseKey}.icon`] || 'verified',
            };
        });

    const displayAdvantages = advantages.length > 0 ? advantages : [
        { title: 'خبرة +10 سنوات', icon: 'military_tech', desc: 'سنوات من التميز في تنفيذ المشاريع المتنوعة بالرياض والمملكة.' },
        { title: 'أسعار تنافسية', icon: 'payments', desc: 'نقدم أفضل الأسعار بجودة لا تُضاهى وبما يتناسب مع ميزانيتك.' },
        { title: 'دقة واحترافية', icon: 'model_training', desc: 'نحرص على كل تفصيلة لضمان تقديم عمل متقن يعكس اسمنا.' },
        { title: 'التزام بالمواعيد', icon: 'schedule', desc: 'نحترم وقتك ونلتزم بالجداول الزمنية المتفق عليها دون أي تأجيل.' },
    ];

    const serviceProjects = projects.length > 0 ? projects.slice(0, 4) : [];

    // ———— Rich Content Block ————
    const richContent = getContent(`services.${slug}.content.body`, '');

    return (
        <div
            className="bg-background-light dark:bg-background-dark min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-primary selection:text-slate-900"
            dir="rtl"
            lang="ar"
            style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}
        >
            {/* ————— SEO Head ————— */}
            <SeoHead
                title={seoTitle}
                description={seoDesc}
                image={heroImage}
                url={canonicalUrl}
                type="website"
                schema={serviceSchema}
                extraSchemas={[faqSchema]}
                breadcrumbs={breadcrumbItems}
            />

            <Navbar />

            {/* ————— HERO SECTION ————— */}
            <section className="relative h-[65vh] min-h-[550px] flex items-end justify-center overflow-hidden pb-16">
                <div className="absolute inset-0 z-0">
                    <img
                        alt={getContent(`services.${slug}.hero.title`, service.title)}
                        className="w-full h-full object-cover"
                        src={getImageUrl(
                            `services.${slug}.hero.image`,
                            'https://images.unsplash.com/photo-1558904541-efa843a96f09?q=80&w=2070&auto=format&fit=crop'
                        )}
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 w-full">
                    {/* Breadcrumb */}
                    <div className="mb-6 opacity-80">
                        <Breadcrumb items={breadcrumbItems} />
                    </div>

                    <span className="inline-block py-1.5 px-6 rounded-full border border-primary/40 text-primary font-bold text-sm tracking-widest uppercase mb-4 backdrop-blur">
                        {getContent(`services.${slug}.hero.badge`, 'خدمات احترافية')}
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight drop-shadow-xl reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                        {getContent(`services.${slug}.hero.title`, service.title)}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-8 leading-relaxed font-light reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100">
                        {getContent(`services.${slug}.hero.subtitle`, service.desc)}
                    </p>
                    <div className="flex flex-wrap gap-4 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                        <Link
                            href={`${route('contact')}#contact-form-section`}
                            className="decoration-gradient hover:brightness-110 text-slate-900 font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:-translate-y-1 text-base flex items-center gap-2"
                        >
                            اطلب عرض السعر مجاناً
                            <DynamicIcon name="request_quote" />
                        </Link>
                        <a
                            href={`tel:${globalSettings?.contact_phone?.value || ''}`}
                            className="border border-white/30 hover:border-primary text-white hover:text-primary font-bold py-3.5 px-8 rounded-xl transition-all duration-300 text-base flex items-center gap-2 backdrop-blur"
                        >
                            <DynamicIcon name="phone" />
                            اتصل الآن
                        </a>
                    </div>
                </div>
            </section>

            {/* ————— GALLERY ————— */}
            <GallerySection images={galleryImages} title={`صور من أعمال ${service.title}`} />

            {/* ————— OVERVIEW / FEATURES ————— */}
            <section className="py-24 bg-white dark:bg-surface-dark relative z-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 mb-16">
                        <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-4">
                            {getContent(`services.${slug}.services.badge`, 'ماذا نقدم؟')}
                        </span>
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                            {getContent(`services.${slug}.services.title`, `خدمات ${service.title} المتكاملة`)}
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-primary mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'تصميم وتنفيذ', icon: 'architecture', desc: `نقدم أفضل تصاميم ${service.title} بأحدث المعايير والمقاييس لضمان رضا عملائنا.` },
                            { title: 'جودة مضمونة', icon: 'verified', desc: 'نستخدم أجود المواد والخامات لضمان استدامة وجودة التنفيذ على المدى البعيد.' },
                            { title: 'فريق متخصص', icon: 'engineering', desc: 'فريق عمل ذو خبرة وكفاءة عالية لتنفيذ المشاريع بدقة واحترافية.' },
                            { title: 'سرعة الإنجاز', icon: 'timer', desc: 'نلتزم بالمواعيد المحددة مع الحفاظ على أعلى معايير الجودة في كل مرحلة.' },
                        ].map((srv, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-50 dark:bg-background-dark p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 dark:border-white/5 reveal-on-scroll opacity-0 translate-y-10 group"
                                style={{ transitionDelay: `${idx * 80}ms` }}
                            >
                                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center text-primary mb-6 transition-colors">
                                    <DynamicIcon name={srv.icon} className="text-3xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">{srv.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed text-center">{srv.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ————— RICH CONTENT BODY (CMS-driven HTML) ————— */}
            {richContent && (
                <section className="py-20 bg-gray-50 dark:bg-[#040A12] border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-5xl mx-auto px-4">
                        <article
                            className="service-rich-content prose-article reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700"
                            dir="rtl"
                            dangerouslySetInnerHTML={{ __html: richContent }}
                        />
                    </div>
                </section>
            )}

            {/* ————— WHY CHOOSE US ————— */}
            <section className="py-24 bg-white dark:bg-[#040A12] border-t border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-4">
                                {getContent(`services.${slug}.why.badge`, 'لماذا تختارنا؟')}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
                                {getContent(`services.${slug}.why.title`, `لماذا ${siteName}؟`)}
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                                {getContent(`services.${slug}.overview.text`, `نحن الخيار الأول في الرياض لخدمات ${service.title}. نجمع بين الجودة الحقيقية والسعر المناسب والالتزام الكامل لضمان رضاك التام.`)}
                            </p>
                            <div className="space-y-5">
                                {displayAdvantages.map((adv, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-5 p-5 rounded-xl hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors border border-transparent hover:border-gray-100 dark:hover:border-white/5"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <DynamicIcon name={adv.icon} className="text-2xl" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{adv.title}</h4>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{adv.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[580px]">
                                <img
                                    src={getImageUrl(`services.${slug}.why.image`, 'https://images.unsplash.com/photo-1594922119159-4d22edfa5041?q=80&w=2070&auto=format&fit=crop')}
                                    alt={`لماذا تختار ${siteName} لخدمة ${service.title}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/90 via-[#0B1120]/20 to-transparent"></div>
                                <div className="absolute bottom-10 right-10 left-10 text-white">
                                    <div className="text-3xl font-bold mb-2">
                                        {getContent(`services.${slug}.why.experience.title`, '+10 سنوات من التميز')}
                                    </div>
                                    <div className="text-xl text-primary font-medium">
                                        {getContent(`services.${slug}.why.experience.subtitle`, `في تنفيذ مشاريع ${service.title}`)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ————— STATS ————— */}
            <section className="py-16 bg-gray-50 dark:bg-background-dark border-t border-gray-100 dark:border-white/5">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                        {[
                            { number: '+500', label: 'مشروع منجز', icon: 'home_work' },
                            { number: '+10', label: 'سنوات خبرة', icon: 'military_tech' },
                            { number: '100%', label: 'رضا العملاء', icon: 'thumb_up' },
                            { number: '+50', label: 'مهندس متخصص', icon: 'groups' },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="bg-white dark:bg-white/5 rounded-2xl p-6 text-center border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                            >
                                <DynamicIcon name={stat.icon} className="text-primary text-3xl mb-3" />
                                <div className="text-3xl md:text-4xl font-black text-primary mb-1">{stat.number}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ————— SEO ARTICLE (Static Fallback) ————— */}
            {!richContent && (
                <section className="py-16 bg-gray-50 dark:bg-background-dark border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-5xl mx-auto px-4">
                        <article className="reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700" dir="rtl">
                            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">
                                {service.title} بالرياض – {siteName}
                            </h2>
                            <p className="text-base leading-8 mb-5 text-gray-600 dark:text-gray-400">
                                تتخصص <strong className="text-gray-900 dark:text-white">{siteName}</strong> في تقديم
                                خدمات <strong className="text-gray-900 dark:text-white">{service.title}</strong> بأعلى
                                المعايير والمواصفات في الرياض والمملكة العربية السعودية. يضم فريقنا نخبة من
                                المهندسين والفنيين المتخصصين الذين تجمعهم خبرة تمتد لأكثر من <strong>10 سنوات</strong>
                                في تنفيذ مشاريع {service.title} باحترافية عالية وضمانات حقيقية.
                            </p>
                            <p className="text-base leading-8 mb-5 text-gray-600 dark:text-gray-400">
                                نؤمن بأن <strong className="text-gray-900 dark:text-white">الجودة ليست خياراً بل التزاماً</strong>.
                                لذلك نستخدم أجود المواد وأحدث التقنيات، ونلتزم بالجداول الزمنية المتفق عليها، ونوفر
                                ضمانات حقيقية على جميع أعمالنا. نخدم جميع أحياء الرياض من الشمال إلى الجنوب، ومن
                                الشرق إلى الغرب.
                            </p>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 mt-8">
                                لماذا تختار {siteName} لخدمة {service.title}؟
                            </h3>
                            <ul className="space-y-3 mb-6">
                                {[
                                    `خبرة +10 سنوات في تنفيذ مشاريع ${service.title} بالرياض`,
                                    'فريق مهندسين متخصصين ومدربين على أحدث التقنيات',
                                    'استخدام أجود المواد الخام المحلية والمستوردة',
                                    'ضمانات حقيقية على جميع الأعمال',
                                    'أسعار تنافسية تناسب جميع الميزانيات',
                                    'التزام تام بالجدول الزمني المتفق عليه',
                                    'استشارة هندسية مجانية قبل بدء أي مشروع',
                                    `تغطية شاملة لجميع أحياء الرياض`,
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-base">
                                        <span className="text-primary text-xl mt-0.5 shrink-0">✓</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </section>
            )}

            {/* ————— PROJECTS ————— */}
            {serviceProjects.length > 0 && (
                <section className="py-24 bg-background-light dark:bg-background-dark border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <div>
                                <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-3">معرض الأعمال</span>
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white">أحدث مشاريعنا في {service.title}</h2>
                            </div>
                            <Link
                                href={route('our-projects.index')}
                                className="decoration-gradient text-slate-900 font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center gap-2"
                            >
                                عرض جميع المشاريع
                                <DynamicIcon name="arrow_forward" className="text-sm rotate-180" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {serviceProjects.map((project, idx) => (
                                <Link
                                    href={route('our-projects.show', project.id)}
                                    key={project.id}
                                    className="group rounded-2xl overflow-hidden shadow-md bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 hover:border-primary/50 block transition-all hover:-translate-y-2 reveal-on-scroll opacity-0 translate-y-10"
                                    style={{ transitionDelay: `${idx * 100}ms` }}
                                >
                                    <div className="h-64 overflow-hidden relative">
                                        <img
                                            src={project.image_path ? `/storage/${project.image_path}` : (project.image_url?.startsWith('http') ? project.image_url : `/storage/${project.image_url}`)}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1558904541-efa843a96f09?q=80&w=2070&auto=format&fit=crop'; }}
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors"></div>
                                        <div className="absolute top-4 right-4 bg-white/95 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                            {project.category ?? service.title}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2">{project.title || project.title_ar}</h3>
                                        <div className="flex items-center gap-1 text-sm font-bold text-primary mt-3">
                                            عرض التفاصيل
                                            <DynamicIcon name="arrow_forward" className="text-xs rotate-180 group-hover:-translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ————— FAQ SECTION ————— */}
            <FaqAccordion faqItems={faqItems} service={service} />

            {/* ————— CTA SECTION ————— */}
            <section className="relative py-28 text-center bg-background-dark overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={getImageUrl(
                            `services.${slug}.cta.background_image`,
                            'https://images.unsplash.com/photo-1558904541-efa843a96f09?q=80&w=2070&auto=format&fit=crop'
                        )}
                        alt={`اطلب خدمة ${service.title} الآن`}
                        className="w-full h-full object-cover scale-110 opacity-60"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                    <DynamicIcon name="support_agent" className="text-primary text-6xl mb-6" />
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {getContent(`services.${slug}.cta.title`, `هل تبحث عن أفضل ${service.title} في الرياض؟`)}
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        {getContent(`services.${slug}.cta.subtitle`, 'تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر دقيق بدون أي التزام.')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={`${route('contact')}#contact-form-section`}
                            className="inline-flex justify-center items-center gap-3 bg-primary hover:bg-white text-slate-900 font-bold text-xl py-5 px-10 rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(201,162,39,0.3)] hover:-translate-y-1"
                        >
                            اطلب عرض السعر مجاناً
                            <DynamicIcon name="arrow_forward" className="rotate-180" />
                        </Link>
                        <a
                            href={`tel:${globalSettings?.contact_phone?.value || ''}`}
                            className="inline-flex justify-center items-center gap-3 border-2 border-white/30 hover:border-primary text-white hover:text-primary font-bold text-xl py-5 px-10 rounded-xl transition-all duration-300 backdrop-blur"
                        >
                            <DynamicIcon name="phone" />
                            اتصل الآن
                        </a>
                    </div>
                </div>
            </section>

            <Footer />

            {/* ————— Inline Styles ————— */}
            <style>{`
                .decoration-gradient { background-image: linear-gradient(135deg, #D4AF37 0%, #C5A059 100%); }
                
                /* Rich HTML Content from CMS */
                .service-rich-content h1,
                .service-rich-content h2,
                .service-rich-content h3,
                .service-rich-content h4 {
                    font-weight: 800;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: inherit;
                    line-height: 1.4;
                }
                .service-rich-content h2 { font-size: 1.875rem; }
                .service-rich-content h3 { font-size: 1.5rem; }
                .service-rich-content h4 { font-size: 1.25rem; color: #C5A059; }
                .service-rich-content p  { margin-bottom: 1.25rem; line-height: 1.9; opacity: 0.9; }
                .service-rich-content ul,
                .service-rich-content ol { margin-right: 1.5rem; margin-bottom: 1.25rem; }
                .service-rich-content ul  { list-style-type: disc; }
                .service-rich-content ol  { list-style-type: decimal; }
                .service-rich-content li  { margin-bottom: 0.5rem; line-height: 1.7; }
                .service-rich-content a   { color: #C5A059; text-decoration: underline; }
                .service-rich-content strong { color: inherit; font-weight: 800; }
                .service-rich-content table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1.5rem 0;
                    font-size: 0.95rem;
                    border-radius: 0.75rem;
                    overflow: hidden;
                }
                .service-rich-content th {
                    background: #C5A059;
                    color: #fff;
                    padding: 0.75rem 1rem;
                    text-align: right;
                    font-weight: 700;
                }
                .service-rich-content td {
                    padding: 0.75rem 1rem;
                    border-bottom: 1px solid rgba(0,0,0,0.06);
                }
                .service-rich-content tr:nth-child(even) td { background: rgba(0,0,0,0.02); }
                .dark .service-rich-content tr:nth-child(even) td { background: rgba(255,255,255,0.02); }
                .service-rich-content blockquote {
                    border-right: 4px solid #C5A059;
                    margin: 1.5rem 0;
                    padding: 1rem 1.5rem;
                    background: rgba(197,160,89,0.06);
                    border-radius: 0.5rem;
                    font-style: italic;
                }
                .service-rich-content img {
                    border-radius: 1rem;
                    margin: 2rem 0;
                    width: 100%;
                    height: auto;
                }
            `}</style>
        </div>
    );
}

/* ——————————————————————————————————————
   Accordion Component — one open at a time
—————————————————————————————————————— */
function FaqAccordion({ faqItems = [], service }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => setOpenIndex(prev => (prev === i ? null : i));

    return (
        <section className="py-24 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-white/5">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-14 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                    <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-4">الأسئلة الشائعة</span>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                        أسئلة شائعة حول {service.title}
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-primary mx-auto rounded-full"></div>
                </div>

                <div className="space-y-4 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                    {faqItems.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                                    isOpen
                                        ? 'border-primary/40 bg-primary/5 dark:bg-primary/10 shadow-md'
                                        : 'border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5'
                                }`}
                            >
                                {/* Question Header */}
                                <button
                                    type="button"
                                    onClick={() => toggle(i)}
                                    className="w-full flex items-center justify-between p-6 cursor-pointer font-bold text-right text-gray-900 dark:text-white hover:text-primary transition-colors"
                                    aria-expanded={isOpen}
                                >
                                    <span>{faq.q}</span>
                                    <span
                                        className={`text-primary text-2xl shrink-0 mr-4 transition-transform duration-300 ${
                                            isOpen ? 'rotate-45' : 'rotate-0'
                                        }`}
                                    >
                                        +
                                    </span>
                                </button>

                                {/* Answer Body — animated */}
                                <div
                                    className="overflow-hidden transition-all duration-500 ease-in-out"
                                    style={{ maxHeight: isOpen ? '600px' : '0px', opacity: isOpen ? 1 : 0 }}
                                >
                                    <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed text-base border-t border-gray-100 dark:border-white/5 pt-4">
                                        {faq.a}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
