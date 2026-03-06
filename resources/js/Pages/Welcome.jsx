import React, { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';
import GallerySection from '@/Components/GallerySection';

export default function Welcome({ projects, siteContents, galleryImages = [] }) {
    const { globalSettings, pageContents, pageContentExtras = {} } = usePage().props;
    const defaultSiteContents = siteContents || {};
    const siteName = globalSettings?.site_name?.value || 'صيانة وفخامة المقاولات';

    const [stats, setStats] = useState({
        projects: 0,
        experience: 0,
        satisfaction: 0
    });

    // Helper function to get image URL
    const getImageUrl = (key, defaultUrl = '') => {
        const val = pageContents?.[key];
        if (!val) return defaultUrl;
        if (val.startsWith('http') || val.startsWith('/')) return val;
        return `/storage/${val}`;
    };

    // Helper function to get opacity
    const getOpacity = (key, defaultOpacity = 60) => {
        return pageContentExtras[key] ? parseInt(pageContentExtras[key]) : defaultOpacity;
    };

    useEffect(() => {
        // Scroll reveal animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));

        // Counter animation
        let startTimestamp = null;
        const duration = 2000;

        const animateCounters = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Ease out quad
            const easeProgress = progress * (2 - progress);

            setStats({
                projects: Math.floor(easeProgress * (parseInt(pageContents?.['home.hero.stats.projects.number']) || 150)),
                experience: Math.floor(easeProgress * (parseInt(pageContents?.['home.hero.stats.experience.number']) || 10)),
                satisfaction: Math.floor(easeProgress * (parseInt(pageContents?.['home.hero.stats.satisfaction.number']) || 98))
            });

            if (progress < 1) {
                window.requestAnimationFrame(animateCounters);
            }
        };

        window.requestAnimationFrame(animateCounters);

        return () => observer.disconnect();
    }, []);

    const services = [
        {
            id: 1,
            title: pageContents?.['home.services.maintenance.title'] || 'صيانة المباني',
            icon: pageContents?.['home.services.maintenance.icon'] || 'home_repair_service',
            desc: pageContents?.['home.services.maintenance.description'] || 'حلول متكاملة لصيانة وترميم المباني والمرافق بأحدث المعدات لضمان استدامتها وديمومتها.',
            buttonText: pageContents?.['home.services.maintenance.button_text'] || 'المزيد من التفاصيل'
        },
        {
            id: 2,
            title: pageContents?.['home.services.caravans.title'] || 'تركيب الكرفانات',
            icon: pageContents?.['home.services.caravans.icon'] || 'rv_hookup',
            desc: pageContents?.['home.services.caravans.description'] || 'تصنيع وتجهيز الكرفانات الفاخرة لتناسب كافة الاحتياجات الميدانية والإدارية بمواصفات عالية.',
            buttonText: pageContents?.['home.services.caravans.button_text'] || 'المزيد من التفاصيل'
        },
        {
            id: 3,
            title: pageContents?.['home.services.portacabins.title'] || 'تنفيذ البركسات',
            icon: pageContents?.['home.services.portacabins.icon'] || 'domain',
            desc: pageContents?.['home.services.portacabins.description'] || 'بركسات مسبقة الصنع بتصاميم هندسية دقيقة للمشاريع والمعسكرات بسرعة تنفيذ فائقة.',
            buttonText: pageContents?.['home.services.portacabins.button_text'] || 'المزيد من التفاصيل'
        },
        {
            id: 4,
            title: pageContents?.['home.services.renovation.title'] || 'أعمال الترميم',
            icon: pageContents?.['home.services.renovation.icon'] || 'architecture',
            desc: pageContents?.['home.services.renovation.description'] || 'إعادة إحياء وتجديد العقارات السكنية والتجارية لتبدو كأنها جديدة تماماً مع الحفاظ على هويتها.',
            buttonText: pageContents?.['home.services.renovation.button_text'] || 'المزيد من التفاصيل'
        },
        {
            id: 5,
            title: pageContents?.['home.services.insulation.title'] || 'العزل الحراري والمائي',
            icon: pageContents?.['home.services.insulation.icon'] || 'water_drop',
            desc: pageContents?.['home.services.insulation.description'] || 'حماية المنشآت من التسربات والتأثيرات المناخية القاسية باستخدام أفضل المواد العازلة عالمياً.',
            buttonText: pageContents?.['home.services.insulation.button_text'] || 'المزيد من التفاصيل'
        },
        {
            id: 6,
            title: pageContents?.['home.services.electrical.title'] || 'الكهرباء والسباكة',
            icon: pageContents?.['home.services.electrical.icon'] || 'electrical_services',
            desc: pageContents?.['home.services.electrical.description'] || 'صيانة وتأسيس شبكات الكهرباء والسباكة بمعايير فنية وأمنية عالية لضمان السلامة التامة.',
            buttonText: pageContents?.['home.services.electrical.button_text'] || 'المزيد من التفاصيل'
        },
    ];

    const features = [
        { title: pageContents?.['home.why.features.team.title'] || 'فريق هندسي محترف', icon: pageContents?.['home.why.features.team.icon'] || 'engineering', desc: pageContents?.['home.why.features.team.text'] || 'كوادر متخصصة ذات كفاءة عالية.' },
        { title: pageContents?.['home.why.features.deadline.title'] || 'التزام بالمواعيد', icon: pageContents?.['home.why.features.deadline.icon'] || 'event_available', desc: pageContents?.['home.why.features.deadline.text'] || 'تسليم المشاريع في الوقت المحدد بدقة.' },
        { title: pageContents?.['home.why.features.quality.title'] || 'مواد عالية الجودة', icon: pageContents?.['home.why.features.quality.icon'] || 'diamond', desc: pageContents?.['home.why.features.quality.text'] || 'نستخدم أفضل الخامات والمواد المعتمدة.' },
        { title: pageContents?.['home.why.features.warranty.title'] || 'ضمان على الأعمال', icon: pageContents?.['home.why.features.warranty.icon'] || 'verified_user', desc: pageContents?.['home.why.features.warranty.text'] || 'نقدم ضمانات حقيقية على كافة مشاريعنا.' },
        { title: pageContents?.['home.why.features.support.title'] || 'خدمة سريعة 24/7', icon: pageContents?.['home.why.features.support.icon'] || 'support_agent', desc: pageContents?.['home.why.features.support.text'] || 'دعم فني واستجابة سريعة لحالات الطوارئ.' },
        { title: pageContents?.['home.why.features.pricing.title'] || 'أسعار تنافسية', icon: pageContents?.['home.why.features.pricing.icon'] || 'payments', desc: pageContents?.['home.why.features.pricing.text'] || 'أفضل قيمة مقابل جودة العمل الاستثنائية.' },
    ];

    return (
        <div className="bg-[#f8f7f6] dark:bg-[#071324] min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-[#C9A227] selection:text-[#0B1F3A]" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <Head>
                <title>{`الرئيسية - ${pageContents?.['home.hero.title'] || 'حلول صيانة وتنفيذ بمعايير هندسية'}`}</title>
                <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet" />

                <style>{`
                    .hero-gradient { background-image: linear-gradient(180deg, rgba(11,31,58,0.4) 0%, rgba(11,31,58,0.8) 100%); }
                    .gold-gradient { background-image: linear-gradient(135deg, #e3c059 0%, #C9A227 100%); }
                    .text-gold { color: #C9A227; }
                    .hover-zoom-img:hover { transform: scale(1.05); }
                    .glass-card { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }
                `}</style>
            </Head>

            <Navbar />

            {/* 1) HERO SECTION */}
            <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="مشروع صيانة هندسية متقدمة"
                        className="w-full h-full object-cover transform scale-105 animate-[pulse_30s_infinite_alternate]"
                        src={getImageUrl('home.hero.image', "/images/hero-bg-2.jpg")}
                    />
                    <div className="absolute inset-0 bg-[#0B1F3A]" style={{ opacity: getOpacity('home.hero.image', 30) / 100 }}></div>
                    <div className="absolute inset-0 hero-gradient" style={{ opacity: Math.min((getOpacity('home.hero.image', 30) + 40) / 100, 1) }}></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 mt-20">
                    <div className="max-w-4xl">

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.1] drop-shadow-2xl reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100">
                            {pageContents?.['home.hero.title'] ? (
                                <>
                                    {pageContents['home.hero.title'].split(' ').slice(0, -2).join(' ')} <span className="text-transparent bg-clip-text gold-gradient">{pageContents['home.hero.title'].split(' ').slice(-2).join(' ')}</span>
                                </>
                            ) : (
                                <>
                                    حلول صيانة وتنفيذ بمعايير <span className="text-transparent bg-clip-text gold-gradient">هندسية عالية</span>
                                </>
                            )}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed font-light reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200 max-w-2xl">
                            {pageContents?.['home.hero.subtitle'] || 'متخصصون في صيانة المباني، تركيب الكرفانات، وتنفيذ البركسات بأعلى مستويات الجودة والالتزام في المملكة والخليج.'}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300">
                            <Link href={`${route('contact')}#contact-form-section`} className="gold-gradient hover:brightness-110 text-[#0B1F3A] font-bold py-4 px-10 rounded-lg transition-all duration-300 shadow-[0_10px_30px_rgba(201,162,39,0.3)] hover:-translate-y-1 text-lg text-center">
                                {pageContents?.['home.hero.primary_button_text'] || 'اطلب عرض سعر'}
                            </Link>
                            <Link href={route('our-projects.index')} className="border border-white/30 hover:bg-white hover:text-[#0B1F3A] text-white font-bold py-4 px-10 rounded-lg transition-all duration-300 backdrop-blur-sm hover:-translate-y-1 text-lg text-center">
                                {pageContents?.['home.hero.secondary_button_text'] || 'تصفح مشاريعنا'}
                            </Link>
                        </div>

                        {/* Floating Statistics */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-500">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl font-black text-[#C9A227]">+{stats.projects}</span>
                                <span className="text-gray-300 text-sm font-bold uppercase tracking-wider">{pageContents?.['home.hero.stats.projects.label_line1'] || 'مشروع'}<br />{pageContents?.['home.hero.stats.projects.label_line2'] || 'مكتمل'}</span>
                            </div>
                            <div className="flex items-center gap-4 border-r border-white/10 pr-6">
                                <span className="text-4xl font-black text-[#C9A227]">+{stats.experience}</span>
                                <span className="text-gray-300 text-sm font-bold uppercase tracking-wider">{pageContents?.['home.hero.stats.experience.label_line1'] || 'سنوات'}<br />{pageContents?.['home.hero.stats.experience.label_line2'] || 'خبرة'}</span>
                            </div>
                            <div className="flex items-center gap-4 border-r border-white/10 pr-6">
                                <span className="text-4xl font-black text-[#C9A227]">{stats.satisfaction}%</span>
                                <span className="text-gray-300 text-sm font-bold uppercase tracking-wider">{pageContents?.['home.hero.stats.satisfaction.label_line1'] || 'رضا'}<br />{pageContents?.['home.hero.stats.satisfaction.label_line2'] || 'العملاء'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GALLERY – right below hero */}
            <GallerySection images={galleryImages} title="صور من أعمالنا" />

            {/* 2) SERVICES PREVIEW SECTION */}
            <section className="py-28 relative bg-[#f8f7f6] dark:bg-[#071324] z-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                        <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-3">{pageContents?.['home.services.badge'] || 'مجالات التخصص'}</span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">{pageContents?.['home.services.title'] || 'خدمات متكاملة وحلول مبكرة'}</h2>
                        {pageContents?.['home.services.subtitle'] ? (
                            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">{pageContents['home.services.subtitle']}</p>
                        ) : null}
                        <div className="w-24 h-1 gold-gradient mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={service.id} className={`bg-white dark:bg-[#0B1F3A] p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-white/5 hover:border-[#C9A227]/50 transition-all duration-500 group hover:-translate-y-3 reveal-on-scroll opacity-0 translate-y-10 delay-${(index % 3) * 100}`}>
                                <div className="w-20 h-20 rounded-2xl bg-gray-50 dark:bg-[#071324] flex items-center justify-center text-[#C9A227] mb-8 group-hover:scale-110 group-hover:bg-[#C9A227] group-hover:text-[#0B1F3A] transition-all duration-500 shadow-sm border border-gray-100 dark:border-white/5 group-hover:border-transparent">
                                    <DynamicIcon name={service.icon} className="text-4xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-[#C9A227] transition-colors">{service.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                                    {service.desc}
                                </p>
                                <Link href={route('services.index')} className="inline-flex items-center gap-2 text-[#0B1F3A] dark:text-white font-bold group-hover:text-[#C9A227] transition-colors">
                                    {service.buttonText}
                                    <DynamicIcon name="arrow_forward" className="text-sm rotate-180 transition-transform group-hover:-translate-x-2" />
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                        <Link href={route('services.index')} className="inline-block border-2 border-[#0B1F3A] dark:border-white text-[#0B1F3A] dark:text-white hover:bg-[#0B1F3A] hover:text-white dark:hover:bg-white dark:hover:text-[#0B1F3A] font-bold py-4 px-10 rounded-xl transition-all duration-300">
                            {pageContents?.['home.services.view_all_text'] || 'عرض كافة الخدمات المتوفرة'}
                        </Link>
                    </div>
                </div>
            </section>

            {/* 3) WHY CHOOSE US SECTION */}
            <section className="py-32 relative bg-[#0B1F3A] overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-30"></div>
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#C9A227]/15 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>
                <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#C9A227]/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="w-full lg:w-1/3 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-4">ميزتنا التنافسية</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">{pageContents?.['home.why.title'] || 'لماذا نحن خيارك الأول للمشاريع الكبرى؟'}</h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-10">
                                {pageContents?.['home.why.description'] || 'نعتمد في عملنا على أحدث التقنيات وأفضل الكفاءات الهندسية لضمان تنفيذ المشاريع بأعلى معايير الجودة، مع التزام تام بالجداول الزمنية المحددة.'}
                            </p>
                            <div className="flex flex-wrap items-center gap-6 mt-4">
                                <div className="text-center min-w-[100px]">
                                    <div className="text-4xl font-black text-[#C9A227] mb-2 whitespace-nowrap">+{stats.projects}</div>
                                    <div className="text-sm text-white uppercase tracking-wider font-bold whitespace-nowrap">{pageContents?.['home.why.stats.projects.label'] || 'مشروع موثق'}</div>
                                </div>
                                <div className="hidden sm:block w-px h-12 bg-white/20"></div>
                                <div className="text-center min-w-[100px]">
                                    <div className="text-4xl font-black text-[#C9A227] mb-2 whitespace-nowrap">+{stats.experience}</div>
                                    <div className="text-sm text-white uppercase tracking-wider font-bold whitespace-nowrap">{pageContents?.['home.why.stats.experience.label'] || 'سنوات الخبرة'}</div>
                                </div>
                                <div className="hidden sm:block w-px h-12 bg-white/20"></div>
                                <div className="text-center min-w-[100px]">
                                    <div className="text-4xl font-black text-[#C9A227] mb-2 whitespace-nowrap">% {stats.satisfaction}</div>
                                    <div className="text-sm text-white uppercase tracking-wider font-bold whitespace-nowrap">{pageContents?.['home.why.stats.satisfaction.label'] || 'رضا العملاء'}</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.map((feat, idx) => (
                                <div key={idx} className="glass-card rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-500 reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${idx * 100}ms` }}>
                                    <div className="flex items-start gap-5">
                                        <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-[#C9A227] to-[#e3c059] flex items-center justify-center text-[#0B1F3A] shadow-lg">
                                            <DynamicIcon name={feat.icon} className="text-3xl" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2">{feat.title}</h4>
                                            <p className="text-gray-400 leading-relaxed text-sm">{feat.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4) FEATURED PROJECTS SECTION */}
            {
                projects && projects.length > 0 && (
                    <section className="py-28 bg-white dark:bg-[#040A12]">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                                <div>
                                    <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-3">{pageContents?.['home.projects.badge'] || 'سجل أعمالنا الحافل'}</span>
                                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">{pageContents?.['home.projects.title'] || 'مشاريع مميزة قمنا بتنفيذها'}</h2>
                                </div>
                                <Link href={route('our-projects.index')} className="gold-gradient text-[#0B1F3A] font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center gap-2 shrink-0">
                                    {pageContents?.['home.projects.view_all_text'] || 'عرض جميع المشاريع'}
                                    <DynamicIcon name="arrow_forward" className="text-sm rotate-180" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projects.slice(0, 3).map((project, idx) => (
                                    <Link href={route('our-projects.show', project.id)} key={project.id} className={`group relative rounded-3xl overflow-hidden shadow-2xl block bg-black h-[400px] reveal-on-scroll opacity-0 translate-y-10 delay-${idx * 200}`}>
                                        <img
                                            src={project.image_path ? `/storage/${project.image_path}` : (project.image_url?.startsWith('http') ? project.image_url : `/storage/${project.image_url}`)}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-40"
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0JAHsObzIwnKDCWmYTUyAsR9C7WINbtHiv7-SNPFkwpvyHrGM42q9H2J-Ee7DLoDv4ZlMqlXqVtRvDB8vhp8nYJohCzmTUqr5HcXUp2SHaYN4S_QfhWu6bX_c7gpYGuWPRa3TtWsyF62L3fbjnXlfn_Kh-HQJS1zAnRNrpSODl5zr5LVSSkKw1K7FuK46TOtZOwKzrUUQO90P_O0bee6_wDBb7dO-38mIlKKEpPBEQdmTbOAymBm0rvhuCFlMrx_V9LhK3fdjmCeF'; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/40 to-transparent"></div>

                                        <div className="absolute top-6 right-6">
                                            <span className="bg-[#C9A227] text-[#0B1F3A] text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                                                {project.category}
                                            </span>
                                        </div>

                                        <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-center gap-2 text-[#C9A227] mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                <DynamicIcon name="location_on" className="text-sm" />
                                                <span className="text-sm font-bold">المملكة العربية السعودية</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">{project.title || project.title_ar}</h3>
                                            <div className="w-0 h-1 bg-[#C9A227] group-hover:w-16 transition-all duration-700 ease-out"></div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* 5) ABOUT COMPANY SECTION (Split Layout) */}
            <section className="py-0 relative overflow-hidden bg-[#f8f7f6] dark:bg-[#071324] border-t border-gray-100 dark:border-white/5">
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2 min-h-[500px] relative">
                        <img src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" alt="مهندسو صيانة محترفون" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-[#0B1F3A]/30"></div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#0B1F3A] p-8 rounded-3xl shadow-2xl text-center">
                            <DynamicIcon name="architecture" className="text-6xl text-[#C9A227] mb-4" />
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white">التزام استثنائي</h3>
                            <p className="text-[#C9A227] font-bold mt-2">بالجودة والمقاييس العالمية</p>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                        <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-4">{pageContents?.['home.about.badge'] || 'من نحن'}</span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 leading-tight">{pageContents?.['home.about.title'] || 'شريكك الموثوق في رحلة النجاح العمراني.'}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify mb-10">
                            {pageContents?.['home.about.paragraph_1'] || 'منذ انطلاقتنا، وضعنا نصب أعيننا معياراً واحداً: الدقة التي لا تساوم على الجودة. نحن نجمع بين العقول الهندسية الفذة والأيدي الماهرة لنقدم لعملائنا في جميع أنحاء المملكة مشاريع تتحدث عن نفسها.'}
                            <br /><br />
                            {pageContents?.['home.about.paragraph_2'] || 'سواء كان مشروعك صيانة وتجديداً أو تأسيساً لكرفانات وبركسات بأحجام ضخمة، فنحن نضمن لك رحلة عمل سلسة، احترافية، ونتائج تتخطى التوقعات وتدوم لأجيال.'}
                        </p>

                        <div className="flex gap-6 items-center">
                            <Link href={route('about')} className="gold-gradient hover:brightness-110 text-[#0B1F3A] font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1">
                                {pageContents?.['home.about.button_text'] || 'تعرّف علينا أكثر'}
                            </Link>
                            <div className="flex items-center gap-3">
                                <DynamicIcon name="phone_in_talk" className="text-[#C9A227] text-4xl" />
                                <div>
                                    <div className="text-xs text-gray-500 font-bold mb-1">{pageContents?.['home.about.phone_label'] || 'اتصل للحصول على مساعدة'}</div>
                                    <div className="text-xl font-black text-gray-900 dark:text-white" dir="ltr">{pageContents?.['home.about.phone_number'] || globalSettings?.contact_phone?.value || '+966 50 123 4567'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6) CLIENT TESTIMONIALS */}
            <section className="py-28 bg-white dark:bg-[#040A12] border-t border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                        <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-3">{pageContents?.['home.testimonials.badge'] || 'آراء العملاء'}</span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">{pageContents?.['home.testimonials.title'] || 'ماذا يقول شركاؤنا عنّا'}</h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">{pageContents?.['home.testimonials.subtitle'] || 'فخورون بكل كلمة طيبة وثقة منحها لنا شركاؤنا بعد إتمام مشاريعهم بنجاح واحترافية.'}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: pageContents?.['home.testimonials.item1.name'] || 'شركة المقاولون العرب',
                                company: pageContents?.['home.testimonials.item1.company'] || '',
                                reviewer: pageContents?.['home.testimonials.item1.position'] || 'مدير المشروع',
                                text: pageContents?.['home.testimonials.item1.text'] || 'كان التزام الفريق بالجدول الزمني مثيراً للإعجاب حقاً. نوعية الكرفانات الموردة وتفاصيل العزل الفاخر فاقت كل توقعاتنا المسبقة.'
                            },
                            {
                                name: pageContents?.['home.testimonials.item2.name'] || 'وزارة الإسكان',
                                company: pageContents?.['home.testimonials.item2.company'] || '',
                                reviewer: pageContents?.['home.testimonials.item2.position'] || 'مهندس مشرف',
                                text: pageContents?.['home.testimonials.item2.text'] || 'سرعة استجابة هائلة لأي متطلبات طارئة. دقة في ترميم الواجهات ونتائج مبهرة في أعمال السباكة والكهرباء بالمجمع السكني.'
                            },
                            {
                                name: pageContents?.['home.testimonials.item3.name'] || 'أحمد بن طلال',
                                company: pageContents?.['home.testimonials.item3.company'] || '',
                                reviewer: pageContents?.['home.testimonials.item3.position'] || 'مستثمر عقاري',
                                text: pageContents?.['home.testimonials.item3.text'] || 'تم تنفيذ بركس إداري متكامل لمشروعي الاستثماري بتصميم ذكي ومريح للعين. الجودة تظهر في أدق التفاصيل من الداخل والخارج.'
                            },
                        ].map((testimonial, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-[#071324] p-10 rounded-3xl border border-gray-100 dark:border-white/5 relative hover:-translate-y-2 transition-transform duration-500">
                                <DynamicIcon name="format_quote" className="absolute top-10 left-10 text-6xl text-gray-200 dark:text-white/5 rotate-180" />
                                <div className="flex gap-1 text-[#C9A227] mb-8">
                                    {[1, 2, 3, 4, 5].map(star => <DynamicIcon key={star} name="star" className="text-xl" />)}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-10 relative z-10">"{testimonial.text}"</p>
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-full bg-[#0B1F3A] flex items-center justify-center font-black text-white text-2xl border-2 border-[#C9A227]">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-black text-gray-900 dark:text-white text-lg">{testimonial.name}</div>
                                        <div className="text-sm text-[#C9A227] font-bold">{testimonial.reviewer}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section – only shown when images exist */}
            {galleryImages && galleryImages.length > 0 && (
                <section className="py-28 bg-[#f8f7f6] dark:bg-[#071324] border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-3">معرض أعمالنا</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">صور من مشاريعنا</h2>
                            <div className="w-24 h-1 gold-gradient mx-auto mt-6 rounded-full"></div>
                        </div>
                        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
                            {galleryImages.map((img, idx) => (
                                <div
                                    key={img.id}
                                    className={`break-inside-avoid rounded-2xl overflow-hidden shadow-md group reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-${(idx % 4) * 100}`}
                                >
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

            {/* 7) STRONG CALL TO ACTION */}
            <section className="relative py-32 text-center bg-[#071324] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={getImageUrl('home.cta.background', "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop")}
                        alt="cta bg"
                        className="w-full h-full object-cover filter blur-md scale-110 opacity-40"
                    />
                    <div className="absolute inset-0 bg-[#0B1F3A]" style={{ opacity: getOpacity('home.cta.background', 90) / 100 }}></div>
                    <div className="absolute inset-0 hero-gradient" style={{ opacity: Math.min((getOpacity('home.cta.background', 90) + 10) / 100, 1) }}></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                    <div className="w-24 h-24 mx-auto bg-white/10 backdrop-blur rounded-full flex items-center justify-center mb-8 border border-white/20">
                        <DynamicIcon name={pageContents?.['home.cta.icon'] || 'handshake'} className="text-[#C9A227] text-5xl" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                        {pageContents?.['home.cta.title'] || 'هل لديك مشروع قادم؟ دعنا نحوله إلى واقع احترافي.'}
                    </h2>
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        {pageContents?.['home.cta.description'] || 'نمتلك الجاهزية التامة للبدء في مشروعك مهما كان حجمه. تواصل معنا اليوم لتحصل على استشارة مبدئية وخطة عمل متكاملة.'}
                    </p>
                    <Link href={`${route('contact')}#contact-form-section`} className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 gold-gradient hover:bg-white text-[#0B1F3A] font-black text-2xl py-6 px-16 rounded-2xl transition-all duration-300 shadow-[0_15px_40px_rgba(201,162,39,0.3)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(201,162,39,0.5)] w-full sm:w-auto">
                        <span>{pageContents?.['home.cta.button_text'] || 'تواصل معنا الآن'}</span>
                        <DynamicIcon name="arrow_forward" className="rotate-180 text-3xl" />
                    </Link>
                </div>
            </section>

            <footer className="bg-[#040A12] py-8 border-t border-white/5 relative z-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="text-2xl font-black text-white mb-4">{siteName}</div>
                    <p className="text-sm text-gray-500">نظام صيانة الكرفانات والبركسات © {new Date().getFullYear()} — صُمِّم بواسطة <a href="https://wa.me/967781582995" target="_blank" rel="noopener noreferrer" className="text-[#C9A227] font-bold hover:underline">شركة Aboras Soft</a></p>
                </div>
            </footer>
        </div >
    );
}
