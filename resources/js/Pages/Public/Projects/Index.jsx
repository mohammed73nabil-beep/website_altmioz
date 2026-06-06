import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';
import Footer from '@/Components/Footer';

export default function ProjectsIndex({ projects = [] }) {
    const { globalSettings, pageContents, pageContentExtras = {} } = usePage().props;
    const siteName = globalSettings?.site_name?.value || 'شركة مظلات التميز';
    const projectsArray = Array.isArray(projects) ? projects : (projects?.data || []);
    const paginationLinks = Array.isArray(projects?.links) ? projects.links : null;

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

    const getContent = (key, defaultVal = '') => {
        return pageContents?.[key] || defaultVal;
    };
    const filteredProjects = projectsArray;

    return (
        <div className="bg-background-light dark:bg-surface-dark min-h-screen text-gray-800 dark:text-gray-100 transition-colors duration-300" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <Head>
                <title>{`مشاريعنا - ${siteName}`}</title>
                <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet" />

                <style>{`
                    .hero-gradient { background-image: linear-gradient(180deg, rgba(11,31,58,0.3) 0%, rgba(11,31,58,0.9) 100%); }
                    .decoration-gradient { background-image: linear-gradient(135deg, #D4AF37 0%, #C5A059 100%); }
                    .text-green { color: #C5A059; }
                    .hover-zoom-img:hover { transform: scale(1.05); }
                    .project-card:hover .project-overlay { opacity: 1; }
                `}</style>
            </Head>

            <Navbar />

            {/* 1) HERO SECTION */}
            <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="High-end interior design project background"
                        className="w-full h-full object-cover"
                        src={getImageUrl('projects.hero.background_image', "https://images.unsplash.com/photo-1558904541-efa843a96f09?q=80&w=2070&auto=format&fit=crop")}
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center mt-20">
                    {pageContents?.['projects.hero.badge'] && (
                        <span className="inline-block py-1.5 px-4 rounded-full border border-primary/40 text-primary font-bold text-sm tracking-widest uppercase mb-6 backdrop-blur shadow-sm">
                            {pageContents?.['projects.hero.badge']}
                        </span>
                    )}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight drop-shadow-xl">
                        {pageContents?.['projects.hero.title'] || ''}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
                        {pageContents?.['projects.hero.subtitle'] || ''}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {pageContents?.['projects.hero.primary_button_text'] && (
                            <a href={pageContents?.['projects.hero.primary_button_link'] || '#projects-grid'} className="decoration-gradient hover:brightness-110 text-slate-900 font-bold py-4 px-10 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(201,162,39,0.4)] hover:-translate-y-1">
                                {pageContents?.['projects.hero.primary_button_text']}
                            </a>
                        )}
                        {pageContents?.['projects.hero.secondary_button_text'] && (
                            <Link href={pageContents?.['projects.hero.secondary_button_link'] || route('contact')} className="border-2 border-white/30 hover:bg-white hover:text-slate-900 text-white font-bold py-4 px-10 rounded-lg transition-all duration-300 backdrop-blur-sm hover:-translate-y-1">
                                {pageContents?.['projects.hero.secondary_button_text']}
                            </Link>
                        )}
                    </div>
                </div>
            </section>


            {/* 3) PROJECT GRID */}
            <section className="py-20 bg-background-light dark:bg-surface-dark">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project, index) => {
                                // Dynamic CMS keys based on index limit (e.g. project1 up to project6 for static overrides)
                                const cmsKeyPrefix = `projects.grid.project${index + 1}`;

                                return (
                                    <div key={project.id} className="project-card group relative bg-white dark:bg-background-dark rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-white/5 transition-all duration-500 hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)] hover:-translate-y-2 flex flex-col h-full">
                                        <div className="relative h-80 md:h-96 overflow-hidden">
                                            <img
                                                src={project.image_path ? `/storage/${project.image_path}` : (project.image_url?.startsWith('http') ? project.image_url : `/storage/${project.image_url}`)}
                                                alt={pageContents?.[`${cmsKeyPrefix}.title`] || project.title || project.title_ar}
                                                className="w-full h-full object-cover hover-zoom-img transition-transform duration-700"
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1558904541-efa843a96f09?q=80&w=2070&auto=format&fit=crop'; }} // Fallback if image missing
                                            />
                                            <div className="absolute top-4 right-4 bg-white/90 dark:bg-surface-dark/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full text-primary shadow-sm">
                                                {pageContents?.[`${cmsKeyPrefix}.category`] || project.category}
                                            </div>
                                            {/* Hover Overlay */}
                                            <div className="project-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 flex flex-col justify-end p-6">
                                                <p className="text-gray-300 text-sm line-clamp-3 mb-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                                    {pageContents?.[`${cmsKeyPrefix}.description`] || project.description || project.description_ar || ''}
                                                </p>
                                                <Link href={pageContents?.[`${cmsKeyPrefix}.details_button_link`] || route('our-projects.show', project.id)} className="inline-flex items-center gap-2 text-white font-bold hover:text-primary transition-colors w-fit">
                                                    {pageContents?.[`${cmsKeyPrefix}.details_button_text`] || 'عرض التفاصيل'}
                                                    <DynamicIcon name="arrow_forward" className="text-sm rotate-180" />
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{pageContents?.[`${cmsKeyPrefix}.title`] || project.title || project.title_ar}</h3>

                                                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <DynamicIcon name="location_on" className="text-[16px] text-primary" />
                                                        <span>{pageContents?.[`${cmsKeyPrefix}.location`] || 'السعودية'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <DynamicIcon name="calendar_today" className="text-[16px] text-primary" />
                                                        <span dir="ltr">{pageContents?.[`${cmsKeyPrefix}.year`] || new Date(project.created_at).getFullYear()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <Link href={pageContents?.[`${cmsKeyPrefix}.details_button_link`] || route('our-projects.show', project.id)} className="mt-6 w-full flex justify-center py-3 text-center border border-primary/30 text-primary hover:bg-primary hover:text-slate-900 font-bold rounded-lg transition-colors duration-300">
                                                {pageContents?.[`${cmsKeyPrefix}.details_button_text`] || 'عرض تفاصيل المشروع'}
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <DynamicIcon name="construction" className="text-6xl text-gray-300 dark:text-white/20 mb-4 block" />
                                <h3 className="text-2xl font-bold text-gray-500 dark:text-gray-400">لا توجد مشاريع في هذا القسم حالياً</h3>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 4) PAGINATION */}
            {paginationLinks && paginationLinks.length > 0 && (
                <section className="pb-14 bg-background-light dark:bg-surface-dark">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {paginationLinks.map((link, idx) => (
                                <Link
                                    key={`${idx}-${link.label}`}
                                    href={link.url || '#'}
                                    preserveScroll
                                    className={`px-4 py-2 rounded-lg border text-sm font-bold transition-colors ${
                                        link.active
                                            ? 'bg-primary text-slate-900 border-primary'
                                            : 'bg-white dark:bg-background-dark text-gray-700 dark:text-gray-200 border-gray-200 dark:border-white/10 hover:border-primary/50'
                                    } ${!link.url ? 'opacity-50 pointer-events-none' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 5) STATISTICS SECTION */}
            <section className="py-20 bg-white dark:bg-background-dark border-y border-gray-100 dark:border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 dark:bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {/* Projects Completed */}
                        <div className="p-4 flex flex-col items-center text-center">
                            <DynamicIcon name={pageContents?.['projects.stats.projects_completed.icon'] || 'done_all'} className="text-primary text-4xl mb-4" />
                            <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text decoration-gradient mb-3" style={{ fontFamily: '"Manrope", sans-serif' }}>
                                {pageContents?.['projects.stats.projects_completed.value'] || '+150'}
                            </div>
                            <div className="text-gray-900 dark:text-white font-medium text-lg">
                                {pageContents?.['projects.stats.projects_completed.title'] || 'مشروع مكتمل'}
                            </div>
                        </div>

                        {/* Years Experience */}
                        <div className="p-4 flex flex-col items-center text-center">
                            <DynamicIcon name={pageContents?.['projects.stats.years_experience.icon'] || 'military_tech'} className="text-primary text-4xl mb-4" />
                            <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text decoration-gradient mb-3" style={{ fontFamily: '"Manrope", sans-serif' }}>
                                {pageContents?.['projects.stats.years_experience.value'] || '10'}
                            </div>
                            <div className="text-gray-900 dark:text-white font-medium text-lg">
                                {pageContents?.['projects.stats.years_experience.title'] || 'سنوات خبرة'}
                            </div>
                        </div>

                        {/* Customer Satisfaction */}
                        <div className="p-4 flex flex-col items-center text-center">
                            <DynamicIcon name={pageContents?.['projects.stats.customer_satisfaction.icon'] || 'sentiment_very_satisfied'} className="text-primary text-4xl mb-4" />
                            <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text decoration-gradient mb-3" style={{ fontFamily: '"Manrope", sans-serif' }}>
                                {pageContents?.['projects.stats.customer_satisfaction.value'] || '%98'}
                            </div>
                            <div className="text-gray-900 dark:text-white font-medium text-lg">
                                {pageContents?.['projects.stats.customer_satisfaction.title'] || 'رضا العملاء'}
                            </div>
                        </div>

                        {/* Professional Team */}
                        <div className="p-4 flex flex-col items-center text-center">
                            <DynamicIcon name={pageContents?.['projects.stats.engineers.icon'] || 'groups'} className="text-primary text-4xl mb-4" />
                            <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text decoration-gradient mb-3" style={{ fontFamily: '"Manrope", sans-serif' }}>
                                {pageContents?.['projects.stats.engineers.value'] || '50'}
                            </div>
                            <div className="text-gray-900 dark:text-white font-medium text-lg">
                                {pageContents?.['projects.stats.engineers.title'] || 'حداد وفني متخصص'}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6) CLIENT TESTIMONIALS */}
            <section className="py-24 bg-white dark:bg-surface-dark">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        {pageContents?.['projects.testimonials.badge'] && (
                            <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-3">{pageContents?.['projects.testimonials.badge']}</span>
                        )}
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            {pageContents?.['projects.testimonials.title'] || 'آراء شركاء النجاح'}
                        </h2>
                        <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((index) => {
                            const cmsKeyPrefix = `projects.testimonials.item${index}`;

                            const name = pageContents?.[`${cmsKeyPrefix}.name`];
                            if (!name) return null; // Only render if the testimonial is populated in the CMS

                            const text = pageContents?.[`${cmsKeyPrefix}.text`] || '';
                            const position = pageContents?.[`${cmsKeyPrefix}.position`] || '';

                            return (
                                <div key={index} className="bg-gray-50 dark:bg-background-dark p-8 rounded-2xl border border-gray-100 dark:border-white/5 relative">
                                    <DynamicIcon name="format_quote" className="absolute top-6 left-6 text-6xl text-primary/10 rotate-180" />
                                    <div className="flex items-center gap-1 text-primary mb-6">
                                        {[1, 2, 3, 4, 5].map(star => <DynamicIcon key={star} name="star" className="text-[18px]" />)}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 relative z-10">{text}</p>
                                    <div className="flex items-center gap-4 border-t border-gray-200 dark:border-white/10 pt-6">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center font-bold text-slate-900 dark:text-white">
                                            {name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 dark:text-white">{name}</div>
                                            <div className="text-sm text-primary">
                                                {position}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 7) STRONG CALL TO ACTION */}
            <section className="relative py-28 text-center bg-background-dark overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={getImageUrl('projects.cta.background_image', "https://images.unsplash.com/photo-1558904541-efa843a96f09?q=80&w=2070&auto=format&fit=crop")} alt="bg" className="w-full h-full object-cover filter scale-110 opacity-60" />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 reveal-on-scroll">
                    <DynamicIcon name={getContent('projects.cta.icon', 'support_agent')} className="text-primary text-6xl mb-6" />
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {getContent('projects.cta.title', 'هل لديك مشروع قادم؟ دعنا نبدأ اليوم.')}
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        {getContent('projects.cta.description', 'تواصل معنا الآن للحصول على استشارة ومعاينة مجانية لتنفيذ وتشييد مظلات وسواتر بأعلى معايير الجودة والأمان.')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={getContent('projects.cta.button_link', route('contact'))} className="inline-flex justify-center items-center gap-3 bg-primary hover:bg-white text-slate-900 font-bold text-xl py-5 px-10 rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(201,162,39,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(201,162,39,0.4)]">
                            {getContent('projects.cta.button_text', 'تواصل معنا الآن')}
                            <DynamicIcon name="arrow_forward" className="rotate-180" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
