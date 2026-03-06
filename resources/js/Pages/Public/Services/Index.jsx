import React, { useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';
import GallerySection from '@/Components/GallerySection';

export default function ServicesIndex({ projects = [], galleryImages = [] }) {
    const { globalSettings, pageContents } = usePage().props;
    const siteName = globalSettings?.site_name?.value || 'صيانة وفخامة الكرفانات والبركسات';

    // Smooth reveal animation on scroll
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const serviceKeys = [
        'maintenance',
        'caravans',
        'portacabins',
        'renovation',
        'insulation',
        'electrical'
    ];

    const strengthKeys = [
        'experience',
        'team',
        'speed',
        'quality',
        'warranty',
        'support'
    ];

    const testimonialKeys = [
        'item1',
        'item2',
        'item3'
    ];

    const getServiceImage = (key) => {
        const defaultImages = {
            maintenance: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
            caravans: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0JAHsObzIwnKDCWmYTUyAsR9C7WINbtHiv7-SNPFkwpvyHrGM42q9H2J-Ee7DLoDv4ZlMqlXqVtRvDB8vhp8nYJohCzmTUqr5HcXUp2SHaYN4S_QfhWu6bX_c7gpYGuWPRa3TtWsyF62L3fbjnXlfn_Kh-HQJS1zAnRNrpSODl5zr5LVSSkKw1K7FuK46TOtZOwKzrUUQO90P_O0bee6_wDBb7dO-38mIlKKEpPBEQdmTbOAymBm0rvhuCFlMrx_V9LhK3fdjmCeF',
            portacabins: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop',
            renovation: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop',
            insulation: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop',
            electrical: 'https://images.unsplash.com/photo-1621905252507-b35492d90cb4?q=80&w=2069&auto=format&fit=crop'
        };
        return pageContents?.[`services.details.${key}.image`] || defaultImages[key] || defaultImages.maintenance;
    };
    // Helper function to get properly formatted background URLs
    const getBgUrl = (key, defaultUrl) => {
        const val = pageContents?.[key];
        if (!val) return defaultUrl;
        if (val.startsWith('http') || val.startsWith('/')) return val;
        return `/storage/${val}`;
    };

    return (
        <div className="bg-[#f8f7f6] dark:bg-[#071324] min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-[#C9A227] selection:text-[#0B1F3A]" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <Head>
                <title>{pageContents?.['services.hero.title'] ? `${pageContents['services.hero.title']} - ${siteName}` : `خدماتنا - ${siteName}`}</title>
                <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet" />

                <style>{`
                    .hero-gradient { background-image: linear-gradient(180deg, rgba(11,31,58,0.5) 0%, rgba(11,31,58,0.95) 100%); }
                    .gold-gradient { background-image: linear-gradient(135deg, #e3c059 0%, #C9A227 100%); }
                    .text-gold { color: #C9A227; }
                    .hover-zoom-img:hover { transform: scale(1.03); }
                    .glass-card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); }
                `}</style>
            </Head>

            <Navbar />

            {/* 1) HERO SECTION */}
            <section className="relative h-[65vh] min-h-[550px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt={pageContents?.['services.hero.title'] || 'خدمات الصيانة والتشييد الفاخر'}
                        className="w-full h-full object-cover transform scale-105 animate-[pulse_20s_infinite_alternate]"
                        src={getBgUrl('services.hero.background_image', '/images/services_hero_bg.png')}
                    />
                    <div className="absolute inset-0 bg-[#0B1F3A]/70 mix-blend-multiply"></div>
                    <div className="absolute inset-0 hero-gradient"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-20">
                    {pageContents?.['services.grid.badge'] && (
                        <span className="inline-block py-1.5 px-4 rounded-full border border-[#C9A227]/30 text-[#C9A227] font-bold text-sm tracking-widest uppercase mb-6 backdrop-blur shadow-sm">
                            {pageContents?.['services.grid.badge'] ?? 'خدماتنا الشاملة'}
                        </span>
                    )}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-xl reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                        {pageContents?.['services.hero.title'] ?? 'خدمات صيانة وتنفيذ بمعايير احترافية'}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100">
                        {pageContents?.['services.hero.subtitle'] ?? 'نقدم حلول متكاملة للصيانة والتنفيذ بأعلى جودة.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                        {pageContents?.['services.hero.primary_button_text'] && (
                            <Link href={`${route('contact')}#contact-form-section`} className="gold-gradient hover:brightness-110 text-[#0B1F3A] font-bold py-4 px-10 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:-translate-y-1 text-lg">
                                {pageContents?.['services.hero.primary_button_text'] ?? 'اطلب عرض سعر'}
                            </Link>
                        )}
                        {pageContents?.['services.hero.secondary_button_text'] && (
                            <Link href={`${route('contact')}#contact-form-section`} className="border border-white/30 hover:bg-white hover:text-[#0B1F3A] text-white font-bold py-4 px-10 rounded-lg transition-all duration-300 backdrop-blur-sm hover:-translate-y-1 text-lg">
                                {pageContents?.['services.hero.secondary_button_text'] ?? 'تواصل معنا'}
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* GALLERY – right below hero */}
            <GallerySection images={galleryImages} title="صور من أعمالنا" />

            {/* 2) MAIN SERVICES GRID */}
            <section className="py-24 bg-[#f8f7f6] dark:bg-[#071324] relative z-20">
                <div className="max-w-7xl mx-auto px-4 z-10 relative -mt-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {serviceKeys.map((key, index) => {
                            const icon = pageContents?.[`services.grid.${key}.icon`];
                            const title = pageContents?.[`services.grid.${key}.title`];
                            const desc = pageContents?.[`services.grid.${key}.description`];
                            const buttonText = pageContents?.[`services.grid.${key}.button_text`];

                            if (!title && !desc) return null;

                            return (
                                <div key={key} className="bg-white dark:bg-[#0B1F3A] p-8 rounded-2xl shadow-xl dark:shadow-none border border-gray-100 dark:border-white/5 hover:border-[#C9A227]/50 transition-all duration-500 group hover:-translate-y-2 reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${(index % 3) * 100}ms` }}>
                                    <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-[#C9A227] mb-8 group-hover:scale-110 group-hover:bg-[#C9A227] group-hover:text-[#0B1F3A] transition-all duration-500 shadow-sm">
                                        <DynamicIcon name={icon ?? 'home_repair_service'} className="text-3xl" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#C9A227] transition-colors">{title ?? ''}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 h-16 line-clamp-3">
                                        {desc ?? ''}
                                    </p>
                                    <a href={`#service-${key}`} className="inline-flex items-center gap-2 text-[#0B1F3A] dark:text-white font-bold group-hover:text-[#C9A227] transition-colors">
                                        {buttonText ?? 'عرض التفاصيل'}
                                        <DynamicIcon name="arrow_forward" className="text-sm rotate-180 transition-transform group-hover:-translate-x-1" />
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3) DETAILED SERVICE SECTIONS */}
            <section className="bg-white dark:bg-[#040A12] py-20 border-t border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4 flex flex-col gap-32">
                    {serviceKeys.map((key, index) => {
                        const icon = pageContents?.[`services.details.${key}.icon`];
                        const badge = pageContents?.[`services.details.${key}.badge`];
                        const title = pageContents?.[`services.details.${key}.title`];
                        const desc = pageContents?.[`services.details.${key}.description`];
                        const feature1 = pageContents?.[`services.details.${key}.feature1`];
                        const feature2 = pageContents?.[`services.details.${key}.feature2`];
                        const feature3 = pageContents?.[`services.details.${key}.feature3`];
                        const buttonText = pageContents?.[`services.details.${key}.button_text`];

                        if (!title && !desc) return null;

                        return (
                            <div id={`service-${key}`} key={key} className={`flex flex-col lg:flex-row items-center gap-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className="w-full lg:w-1/2">
                                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                                        <img src={getServiceImage(key)} alt={title} className="w-full h-[400px] object-cover transition-transform duration-1000 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 to-transparent opacity-60"></div>
                                        <div className="absolute bottom-6 right-6 w-16 h-16 bg-[#C9A227] rounded-2xl flex items-center justify-center text-[#0B1F3A] shadow-lg">
                                            <DynamicIcon name={icon ?? 'home_repair_service'} className="text-4xl" />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-1/2 space-y-6">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="h-[2px] w-12 bg-[#C9A227]"></div>
                                        <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase">{badge ?? 'تفاصيل الخدمة'}</span>
                                    </div>
                                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                                        {title ?? ''}
                                    </h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                                        {desc ?? ''}
                                    </p>
                                    <ul className="space-y-4 pt-4">
                                        {[feature1, feature2, feature3].filter(Boolean).map((feat, i) => (
                                            <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-200 font-medium">
                                                <DynamicIcon name="check_circle" className="text-[#C9A227] drop-shadow-sm" />
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                    {buttonText && (
                                        <div className="pt-6">
                                            <Link href={`${route('contact')}#contact-form-section`} className="inline-block border-2 border-[#0B1F3A] dark:border-white text-[#0B1F3A] dark:text-white hover:bg-[#0B1F3A] hover:text-white dark:hover:bg-white dark:hover:text-[#0B1F3A] font-bold py-3 px-8 rounded-lg transition-all duration-300">
                                                {buttonText ?? 'طلب الخدمة الآن'}
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 4) WHY CHOOSE US SECTION (STRENGTH) */}
            <section className="py-24 relative bg-[#0B1F3A] overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-20"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A227]/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                        <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-3">نقاط القوة</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white">{pageContents?.['services.strength.title'] ?? 'لماذا نعد الخيار الأمثل؟'}</h2>
                        <div className="w-24 h-1 gold-gradient mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
                        {strengthKeys.map((key, idx) => {
                            const icon = pageContents?.[`services.strength.${key}.icon`];
                            const title = pageContents?.[`services.strength.${key}.title`];
                            const desc = pageContents?.[`services.strength.${key}.description`];

                            if (!title && !desc) return null;

                            return (
                                <div key={key} className="glass-card rounded-2xl p-8 text-center hover:-translate-y-2 transition-transform duration-500 reveal-on-scroll opacity-0 translate-y-10 border-t border-[#C9A227]/10" style={{ transitionDelay: `${idx * 100}ms` }}>
                                    <div className="w-16 h-16 mx-auto rounded-full bg-[#C9A227]/10 flex items-center justify-center text-[#C9A227] mb-6">
                                        <DynamicIcon name={icon ?? 'military_tech'} className="text-3xl" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2">{title ?? ''}</h4>
                                    <p className="text-gray-400 text-sm">{desc ?? ''}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 5) PROJECT PREVIEW SECTION */}
            {projects && projects.length > 0 && (
                <section className="py-24 bg-[#f8f7f6] dark:bg-[#071324] border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <div>
                                <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-3">{pageContents?.['services.projects.badge'] ?? 'سجل أعمالنا'}</span>
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white">{pageContents?.['services.projects.title'] ?? 'أحدث المشاريع المنفذة'}</h2>
                            </div>
                            {pageContents?.['services.projects.view_all_text'] && (
                                <Link href={route('our-projects.index')} className="gold-gradient text-[#0B1F3A] font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center gap-2">
                                    {pageContents?.['services.projects.view_all_text'] ?? 'عرض جميع المشاريع'}
                                    <DynamicIcon name="arrow_forward" className="text-sm rotate-180" />
                                </Link>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {projects.map((project, idx) => (
                                <Link href={route('our-projects.show', project.id)} key={project.id} className="group rounded-2xl overflow-hidden shadow-md bg-white dark:bg-[#0B1F3A] border border-gray-100 dark:border-white/5 hover:border-[#C9A227]/50 block transition-all hover:-translate-y-2 reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${idx * 150}ms` }}>
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={project.image_path ? `/storage/${project.image_path}` : (project.image_url?.startsWith('http') ? project.image_url : `/storage/${project.image_url}`)}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'; }}
                                        />
                                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                                        <div className="absolute top-4 right-4 bg-white/95 dark:bg-[#0B1F3A]/95 text-[#C9A227] text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur">
                                            {project.category}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">{project.title || project.title_ar}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 6) CLIENT TESTIMONIALS */}
            <section className="py-24 bg-white dark:bg-[#040A12]">
                <div className="max-w-7xl mx-auto px-4 text-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                    <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-3">{pageContents?.['services.testimonials.badge'] ?? 'شركاء النجاح'}</span>
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-16">{pageContents?.['services.testimonials.title'] ?? 'ثقة تبنى على الإنجازات'}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
                        {testimonialKeys.map((key) => {
                            const text = pageContents?.[`services.testimonials.${key}.text`];
                            const name = pageContents?.[`services.testimonials.${key}.name`];
                            const company = pageContents?.[`services.testimonials.${key}.company`];
                            const position = pageContents?.[`services.testimonials.${key}.position`];

                            if (!text && !name) return null;

                            return (
                                <div key={key} className="bg-gray-50 dark:bg-[#0B1F3A] p-10 rounded-3xl border border-gray-100 dark:border-white/5 relative">
                                    <DynamicIcon name="format_quote" className="absolute top-8 left-8 text-5xl text-[#C9A227]/20 rotate-180" />
                                    <div className="flex gap-1 text-[#C9A227] mb-6">
                                        {[1, 2, 3, 4, 5].map(star => <DynamicIcon key={star} name="star" className="text-sm" />)}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 relative z-10 italic">"{text ?? ''}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0B1F3A] to-gray-800 dark:from-white/10 dark:to-white/5 flex items-center justify-center font-bold text-white text-xl shadow-inner border border-white/10">
                                            {(name || ' ').charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 dark:text-white text-lg">{name ?? ''}</div>
                                            <div className="text-sm text-[#C9A227]">
                                                {position ? `${position} ` : ''}
                                                {company ? `- ${company}` : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 7) FINAL CTA SECTION */}
            <section className="relative py-28 text-center bg-[#071324] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={getBgUrl('services.cta.background_image', '/images/services_hero_bg.png')} alt="bg" className="w-full h-full object-cover filter blur-sm scale-110 opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/95 to-[#0B1F3A]/80 flex"></div>
                    <div className="absolute inset-0 hero-gradient"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                    <DynamicIcon name={pageContents?.['services.cta.icon'] ?? 'engineering'} className="text-[#C9A227] text-6xl mb-6" />
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {pageContents?.['services.cta.title'] ?? 'هل لديك مشروع قادم؟'}
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        {pageContents?.['services.cta.description'] ?? 'نحن هنا لنحول أفكارك إلى واقع.'}
                    </p>
                    {pageContents?.['services.cta.button_text'] && (
                        <Link href={`${route('contact')}#contact-form-section`} className="inline-flex items-center gap-3 bg-[#C9A227] hover:bg-white text-[#0B1F3A] font-bold text-xl py-5 px-12 rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(201,162,39,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(201,162,39,0.4)]">
                            {pageContents?.['services.cta.button_text'] ?? 'اطلب استشارة مجانية'}
                            <DynamicIcon name="arrow_forward" className="rotate-180" />
                        </Link>
                    )}
                </div>
            </section>

            {/* GALLERY IMAGES SECTION */}
            {galleryImages.length > 0 && (
                <section className="py-24 bg-[#f8f7f6] dark:bg-[#071324] border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-14 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-3">معرض أعمالنا</span>
                            <h2 className="text-4xl font-black text-gray-900 dark:text-white">صور من أعمالنا</h2>
                            <div className="w-20 h-1 bg-gradient-to-r from-[#e3c059] to-[#C9A227] mx-auto mt-5 rounded-full"></div>
                        </div>
                        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
                            {galleryImages.map((img) => (
                                <div key={img.id} className="break-inside-avoid rounded-2xl overflow-hidden shadow-md group">
                                    <img
                                        src={`/storage/${img.image_path}`}
                                        alt={img.title || 'صورة أعمال'}
                                        className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    {img.title && (
                                        <div className="bg-white dark:bg-[#0B1F3A] px-3 py-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                                            {img.title}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <footer className="bg-[#040A12] py-8 text-center text-sm text-gray-500 border-t border-white/5 relative z-20">
                <p>نظام صيانة الكرفانات والبركسات © {new Date().getFullYear()} — صُمِّم بواسطة <a href="https://wa.me/967781582995" target="_blank" rel="noopener noreferrer" className="text-[#C9A227] font-bold hover:underline">شركة Aboras Soft</a></p>
            </footer>

        </div>
    );
}
