import React, { useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';
import SeoHead from '@/Components/SeoHead';
import Footer from '@/Components/Footer';

export default function ServicesIndex({ projects = [], galleryImages = [] }) {
    const { globalSettings, pageContents, servicesList = {} } = usePage().props;
    const siteName = globalSettings?.site_name?.value || 'شركة مظلات التميز';

    // Smooth reveal animation on scroll optimized with unobserve
    useEffect(() => {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                    obs.unobserve(entry.target); // Stop observing once revealed for better performance
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const strengthKeys = [
        { key: 'experience', title: 'خبرة طويلة', desc: 'سنوات من التميز في تركيب المظلات والسواتر والبرجولات بالرياض.', icon: 'military_tech' },
        { key: 'speed', title: 'سرعة الإنجاز', desc: 'تنفيذ دقيق مع الالتزام التام بالجداول الزمنية المحددة.', icon: 'timer' },
        { key: 'quality', title: 'جودة استثنائية', desc: 'نستخدم أفضل المواد والخامات لضمان استدامة وجمال مشاريع التظليل.', icon: 'verified' },
        { key: 'warranty', title: 'ضمان شامل', desc: 'نقدم ضمانات حقيقية على جميع أعمال المظلات والسواتر لراحتك.', icon: 'gpp_good' },
        { key: 'support', title: 'دعم مستمر', desc: 'خدمة عملاء متميزة ومتابعة دورية بعد تسليم مشروع المظلة.', icon: 'support_agent' }
    ];
    const testimonialKeys = ['item1', 'item2', 'item3'];

    const getBgUrl = (key, defaultUrl) => {
        const val = pageContents?.[key];
        if (!val) return defaultUrl;
        if (val.startsWith('http') || val.startsWith('/')) return val;
        return `/storage/${val}`;
    };

    const getServiceImage = (key) => {
        const defaultImages = {
            'car-shades': 'https://images.unsplash.com/photo-1611244419377-b0a760c19719?q=80&w=2070&auto=format&fit=crop',
            'garden-shades': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
            'pool-shades': 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop',
            'school-shades': 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
            'lexan-fabric-shades': 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop',
            'iron-screens': 'https://images.unsplash.com/photo-1507308211625-0b5550a2947e?q=80&w=2070&auto=format&fit=crop',
            'screens-barriers': 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop',
            'wooden-screens': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2070&auto=format&fit=crop',
            'wooden-pergolas': 'https://images.unsplash.com/photo-1594922119159-4d22edfa5041?q=80&w=2070&auto=format&fit=crop',
            'aluminum-pergolas': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
            'hangars-warehouses': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
            'sandwich-panel-warehouses': 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=2070&auto=format&fit=crop',
            'royal-hair-tents': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2070&auto=format&fit=crop',
            'roof-tiles': 'https://images.unsplash.com/photo-1635424710928-0544e8512eae?q=80&w=2070&auto=format&fit=crop',
            'cladding-facades': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
            'shinko-warehouses': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop'
        };
        return pageContents?.[`services.details.${key}.image`] || defaultImages[key] || 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop';
    };

    const dynamicServices = Object.values(servicesList);

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-primary selection:text-slate-900" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <SeoHead
                title={pageContents?.['services.hero.title']
                    ? `${siteName} | ${pageContents['services.hero.title']}`
                    : `${siteName} | جميع خدمات المظلات والسواتر`}
                description={pageContents?.['services.hero.subtitle'] || 'حلول هندسية وفنية متكاملة لتصميم وتركيب المظلات والسواتر والبرجولات والهناجر.'}
            />

            <Navbar />

            {/* 1) HERO SECTION */}
            <section className="relative min-h-[100svh] md:min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt={pageContents?.['services.hero.title'] || 'Hero Background'}
                        className="w-full h-full object-cover"
                        src={getBgUrl('services.hero.background_image', '/images/services_hero_bg.png')}
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-20">
                    {pageContents?.['services.grid.badge'] && (
                        <span className="inline-block py-2 px-6 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 backdrop-blur-md text-primary font-bold text-xs md:text-sm tracking-widest uppercase mb-6 shadow-xl">
                            {pageContents?.['services.grid.badge'] ?? 'خدماتنا الشاملة'}
                        </span>
                    )}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                        {pageContents?.['services.hero.title'] ?? 'تفصيل وتركيب المظلات والسواتر والبرجولات بالرياض'}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100 px-2">
                        {pageContents?.['services.hero.subtitle'] ?? 'مظلات وسواتر بأحدث التصاميم العصرية وبأجود المواد وضمانات طويلة تصل لـ 10 سنوات.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                        {pageContents?.['services.hero.primary_button_text'] && (
                            <Link href={`${route('contact')}#contact-form-section`} className="w-full sm:w-auto bg-gradient-to-l from-[#D4AF37] to-primary text-slate-900 font-bold py-3 md:py-4 px-8 md:px-10 rounded-xl transition-all duration-300 shadow-[0_8px_25px_rgba(201,162,39,0.4)] hover:shadow-[0_12px_35px_rgba(201,162,39,0.6)] hover:-translate-y-1 text-base md:text-lg">
                                {pageContents?.['services.hero.primary_button_text'] ?? 'اطلب عرض سعر'}
                            </Link>
                        )}
                        {pageContents?.['services.hero.secondary_button_text'] && (
                            <Link href={`${route('contact')}#contact-form-section`} className="w-full sm:w-auto border border-white/30 bg-white/5 hover:bg-white/20 text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-xl transition-all duration-300 backdrop-blur-md hover:-translate-y-1 text-base md:text-lg">
                                {pageContents?.['services.hero.secondary_button_text'] ?? 'تواصل معنا'}
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* 2) MAIN SERVICES GRID (Glassmorphism effect) */}
            <section className="py-16 md:py-24 relative z-20">
                <div className="max-w-7xl mx-auto px-4 relative -mt-20 md:-mt-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {dynamicServices.map((service, index) => {
                            return (
                                <div key={service.slug} className="bg-white/80 dark:bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-xl dark:shadow-2xl border border-white/40 dark:border-white/10 hover:border-primary/50 transition-all duration-500 group hover:-translate-y-2 reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${(index % 3) * 100}ms` }}>
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-200 dark:from-white/10 dark:to-transparent flex items-center justify-center text-primary mb-6 md:mb-8 group-hover:scale-110 group-hover:from-primary group-hover:to-[#D4AF37] group-hover:text-slate-900 transition-all duration-500 shadow-sm border border-white/20">
                                        <DynamicIcon name={service.icon} className="text-2xl md:text-3xl" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6 md:mb-8 h-auto min-h-[4rem] line-clamp-3">
                                        {service.desc}
                                    </p>
                                    <Link href={route('services.show', service.slug)} className="inline-flex items-center gap-2 text-slate-900 dark:text-white font-bold group-hover:text-primary transition-colors">
                                        عرض التفاصيل
                                        <DynamicIcon name="arrow_forward" className="text-sm rotate-180 transition-transform group-hover:-translate-x-1" />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3) DETAILED SERVICE SECTIONS */}
            <section className="bg-white dark:bg-background-dark py-16 md:py-20 relative">
                <div className="max-w-7xl mx-auto px-4 flex flex-col gap-20 md:gap-32">
                    {dynamicServices.map((item, index) => {
                        const key = item.slug;
                        const title = pageContents?.[`services.details.${key}.title`] || item.title;
                        const desc = pageContents?.[`services.details.${key}.description`] || item.desc;
                        const features = [
                            pageContents?.[`services.details.${key}.feature1`] || 'جودة واحترافية في التنفيذ',
                            pageContents?.[`services.details.${key}.feature2`] || 'تصاميم عصرية تناسب تطلعاتك',
                            pageContents?.[`services.details.${key}.feature3`] || 'أسعار تنافسية ومناسبة'
                        ].filter(Boolean);

                        return (
                            <div id={`service-${key}`} key={key} className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className="w-full lg:w-1/2 relative group">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-2xl rounded-full transform -rotate-6 group-hover:rotate-0 transition-transform duration-700"></div>
                                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/5">
                                        <img src={getServiceImage(key)} alt={title} className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-1000 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-transparent to-transparent opacity-80"></div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-1/2 space-y-5 md:space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-[2px] w-8 md:w-12 bg-primary"></div>
                                        <span className="text-primary font-bold tracking-widest text-xs md:text-sm uppercase">تفاصيل الخدمة</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                                        {title}
                                    </h2>
                                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {desc}
                                    </p>
                                    {features.length > 0 && (
                                        <ul className="space-y-3 pt-2">
                                            {features.map((feat, i) => (
                                                <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-200 font-medium bg-gray-50 dark:bg-white/5 px-4 py-3 rounded-xl border border-gray-100 dark:border-white/5">
                                                    <DynamicIcon name="check_circle" className="text-primary" />
                                                    {feat}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 4) WHY CHOOSE US (STRENGTH) */}
            <section className="py-20 md:py-28 relative bg-background-light dark:bg-surface-dark overflow-hidden border-t border-gray-100 dark:border-white/5">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 dark:opacity-10 mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none hidden md:block"></div>
                
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                        <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-3">نقاط القوة</span>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">{pageContents?.['services.strength.title'] ?? 'لماذا نحن الخيار الأمثل؟'}</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {strengthKeys.map((item, idx) => {
                            const key = item.key;
                            const icon = pageContents?.[`services.strength.${key}.icon`] || item.icon;
                            const title = pageContents?.[`services.strength.${key}.title`] || item.title;
                            const desc = pageContents?.[`services.strength.${key}.description`] || item.desc;

                            return (
                                <div key={key} className="bg-white dark:bg-white/5 backdrop-blur-lg border border-gray-200 dark:border-white/10 rounded-3xl p-8 text-center hover:-translate-y-2 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-500 reveal-on-scroll opacity-0 translate-y-10 shadow-sm dark:shadow-none" style={{ transitionDelay: `${idx * 100}ms` }}>
                                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent flex items-center justify-center text-primary mb-6 border border-primary/20 dark:border-primary/30">
                                        <DynamicIcon name={icon} className="text-3xl" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 5) PROJECT PREVIEW SECTION */}
            {projects?.length > 0 && (
                <section className="py-20 md:py-28 bg-background-light dark:bg-background-dark border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <div className="text-center md:text-right">
                                <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-2">{pageContents?.['services.projects.badge'] ?? 'سجل أعمالنا'}</span>
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">{pageContents?.['services.projects.title'] ?? 'أحدث المشاريع المنجزة'}</h2>
                            </div>
                            <Link href={route('our-projects.index')} className="group flex items-center gap-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-bold px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                                عرض الكل
                                <DynamicIcon name="arrow_forward" className="text-sm rotate-180 transition-transform group-hover:-translate-x-1" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {projects.map((project, idx) => (
                                <Link href={route('our-projects.show', project.id)} key={project.id} className="group rounded-3xl overflow-hidden shadow-lg bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 hover:border-primary/50 block transition-all duration-500 hover:-translate-y-2 reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${idx * 150}ms` }}>
                                    <div className="h-56 overflow-hidden relative">
                                        <img
                                            src={project.image_path ? `/storage/${project.image_path}` : (project.image_url?.startsWith('http') ? project.image_url : `/storage/${project.image_url}`)}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                        {project.category && (
                                            <div className="absolute top-4 right-4 bg-white/90 dark:bg-surface-dark/90 text-primary text-xs font-bold px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md">
                                                {project.category}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">{project.title || project.title_ar}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 6) CLIENT TESTIMONIALS */}
            <section className="py-20 md:py-28 bg-white dark:bg-[#040A12] relative">
                <div className="max-w-7xl mx-auto px-4 text-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                    <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-3">{pageContents?.['services.testimonials.badge'] ?? 'شركاء النجاح'}</span>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-16">{pageContents?.['services.testimonials.title'] ?? 'ثقة تبنى على الإنجازات'}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
                        {testimonialKeys.map((key) => {
                            const text = pageContents?.[`services.testimonials.${key}.text`];
                            const name = pageContents?.[`services.testimonials.${key}.name`];
                            const company = pageContents?.[`services.testimonials.${key}.company`];

                            if (!text && !name) return null;

                            return (
                                <div key={key} className="bg-background-light dark:bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-gray-100 dark:border-white/5 relative group hover:-translate-y-2 transition-transform duration-500">
                                    <DynamicIcon name="format_quote" className="absolute top-6 left-6 text-6xl text-primary/10 group-hover:text-primary/20 transition-colors rotate-180" />
                                    <div className="flex gap-1 text-primary mb-6">
                                        {[1, 2, 3, 4, 5].map(star => <DynamicIcon key={star} name="star" className="text-sm" />)}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-8 relative z-10 italic">"{text}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-surface-dark to-gray-800 dark:from-white/10 dark:to-transparent flex items-center justify-center font-bold text-white text-xl shadow-inner border border-white/10">
                                            {(name || ' ').charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 dark:text-white text-lg">{name}</div>
                                            <div className="text-sm text-primary">
                                                {company}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 7) GALLERY IMAGES SECTION (Masonry with Glassmorphism Hover) */}
            {galleryImages?.length > 0 && (
                <section className="py-20 md:py-28 bg-background-light dark:bg-background-dark border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-3">معرض الصور</span>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">أعمالنا على أرض الواقع</h2>
                        </div>
                        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                            {galleryImages.map((img, idx) => (
                                <div key={img.id} className="break-inside-avoid relative rounded-3xl overflow-hidden shadow-md group reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${(idx % 4) * 100}ms` }}>
                                    <img
                                        src={`/storage/${img.image_path}`}
                                        alt={img.alt_text || img.title || 'صورة أعمال'}
                                        className="w-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/90 via-[#0B1120]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                        {img.title && (
                                            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-white font-bold text-lg backdrop-blur-sm bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                                                {img.title}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 8) FINAL CTA SECTION */}
            <section className="relative py-24 md:py-32 text-center bg-background-dark overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={getBgUrl('services.cta.background_image', '/images/services_hero_bg.png')} alt="CTA Background" className="w-full h-full object-cover filter blur-md scale-110 opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-[#0B1120]/90 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-3xl mx-auto px-4 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                    <DynamicIcon name={pageContents?.['services.cta.icon'] ?? 'rocket_launch'} className="text-primary text-6xl mb-8 animate-bounce" />
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {pageContents?.['services.cta.title'] ?? 'هل لديك مشروع قادم؟'}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 font-light leading-relaxed">
                        {pageContents?.['services.cta.description'] ?? 'نحن هنا لنحول أفكارك وتصوراتك إلى واقع ملموس باحترافية عالية.'}
                    </p>
                    <Link href={`${route('contact')}#contact-form-section`} className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-gradient-to-l from-[#D4AF37] to-primary text-slate-900 font-bold text-lg py-4 px-10 rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(201,162,39,0.3)] hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(201,162,39,0.5)]">
                        {pageContents?.['services.cta.button_text'] ?? 'اطلب استشارة مجانية الآن'}
                        <DynamicIcon name="arrow_forward" className="rotate-180" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}