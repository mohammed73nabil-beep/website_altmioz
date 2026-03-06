import React, { useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';
import GallerySection from '@/Components/GallerySection';

export default function CaravansMaintenance({ projects = [], galleryImages = [] }) {
    const { globalSettings, pageContents = {}, pageContentExtras = {} } = usePage().props;
    console.log('DEBUG [Caravans]: pageContents keys:', Object.keys(pageContents));
    console.log('DEBUG [Caravans]: hero image value:', pageContents['services.caravans.hero.image']);
    const siteName = globalSettings?.site_name?.value || 'صيانة وفخامة الكرفانات والبركسات';

    // Helper function to get content by key
    const getContent = (key, defaultValue = '') => {
        return pageContents[key] ?? defaultValue;
    };

    // Helper function to get image URL
    const getImageUrl = (key, defaultUrl = '') => {
        const val = pageContents[key];
        if (!val) return defaultUrl;
        if (val.startsWith('http') || val.startsWith('/')) return val;
        return `/storage/${val}`;
    };


    // Helper function to get opacity
    const getOpacity = (key, defaultOpacity = 70) => {
        return pageContentExtras[key] ? parseInt(pageContentExtras[key]) : defaultOpacity;
    };


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

    const services = [
        { title: getContent('services.caravans.services.item1.title', 'صيانة كهربائية'), icon: 'electrical_services', desc: getContent('services.caravans.services.item1.desc', 'تأسيس وإصلاح كافة التمديدات الكهربائية لضمان الجودة والأمان.') },
        { title: getContent('services.caravans.services.item2.title', 'صيانة ميكانيكية'), icon: 'handyman', desc: getContent('services.caravans.services.item2.desc', 'إصلاح جميع الأعطال الميكانيكية بقطع غيار أصلية وخبرة وكفاءة.') },
        { title: getContent('services.caravans.services.item3.title', 'تجديد داخلي'), icon: 'architecture', desc: getContent('services.caravans.services.item3.desc', 'إعادة تصميم وفرش الكرفانات داخلياً بأحدث الديكورات العصرية.') },
        { title: getContent('services.caravans.services.item4.title', 'تنظيف وتجهيز'), icon: 'cleaning_services', desc: getContent('services.caravans.services.item4.desc', 'تجهيز الكرفان وتنظيفه بالكامل ليكون جاهزاً للاستخدام المباشر.') }
    ];

    const steps = [
        { title: getContent('services.caravans.process.step1.title', 'تقييم الكرفان'), icon: 'assignment_turned_in', desc: getContent('services.caravans.process.step1.desc', 'نقوم بفحص الكرفان بشكل كامل لتحديد احتياجات الصيانة بدقة.') },
        { title: getContent('services.caravans.process.step2.title', 'عرض السعر'), icon: 'request_quote', desc: getContent('services.caravans.process.step2.desc', 'نقدم لك عرض سعر تفصيلي وشفاف بناءً على الفحص الميداني.') },
        { title: getContent('services.caravans.process.step3.title', 'التنفيذ'), icon: 'build', desc: getContent('services.caravans.process.step3.desc', 'يبدأ فريقنا المتخصص بتنفيذ أعمال الصيانة بأعلى المعايير.') },
        { title: getContent('services.caravans.process.step4.title', 'الفحص النهائي'), icon: 'verified', desc: getContent('services.caravans.process.step4.desc', 'نسلمك الكرفان بعد إجراء فحص شامل لضمان جودة العمل.') }
    ];

    const advantages = [
        { title: getContent('services.caravans.why.item1.title', 'تنفيذ سريع'), icon: 'timer', desc: getContent('services.caravans.why.item1.desc', 'نلتزم بالمواعيد المحددة ونسلمك الكرفان في الوقت المتفق عليه.') },
        { title: getContent('services.caravans.why.item2.title', 'فريق متخصص'), icon: 'groups', desc: getContent('services.caravans.why.item2.desc', 'مهندسون وفنيون ذوو خبرة طويلة في صيانة وتجديد الكرفانات.') },
        { title: getContent('services.caravans.why.item3.title', 'أسعار تنافسية'), icon: 'payments', desc: getContent('services.caravans.why.item3.desc', 'نقدم خدمات استثنائية بأسعار مدروسة تناسب ميزانيتك.') },
        { title: getContent('services.caravans.why.item4.title', 'رضا العملاء'), icon: 'thumb_up', desc: getContent('services.caravans.why.item4.desc', 'نضع رضا العميل على رأس أولوياتنا مع ضمان على الخدمات.') }
    ];

    const caravanProjects = projects.length > 0 ? projects.slice(0, 4) : [];

    return (
        <div className="bg-[#f8f7f6] dark:bg-[#071324] min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-[#C9A227] selection:text-[#0B1F3A]" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <Head>
                <title>{`صيانة الكرفانات - ${siteName}`}</title>
                <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet" />

                <style>{`
                    .hero-gradient { background-image: linear-gradient(180deg, rgba(11,31,58,0.5) 0%, rgba(11,31,58,0.95) 100%); }
                    .gold-gradient { background-image: linear-gradient(135deg, #e3c059 0%, #C9A227 100%); }
                `}</style>
            </Head>

            <Navbar />

            {/* HERO SECTION */}
            <section className="relative h-[65vh] min-h-[550px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt={getContent('services.caravans.hero.title', 'صيانة الكرفانات')}
                        className="w-full h-full object-cover transform scale-105 animate-[pulse_20s_infinite_alternate]"
                        src={getImageUrl('services.caravans.hero.image', '/images/hero-bg.svg')}
                    />
                    <div className="absolute inset-0 bg-[#0B1F3A]/30" style={{ opacity: getOpacity('services.caravans.hero.image', 30) / 100 }}></div>
                    <div className="absolute inset-0 hero-gradient" style={{ opacity: Math.min((getOpacity('services.caravans.hero.image', 30) + 40) / 100, 1) }}></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-20">
                    <span className="inline-block py-1.5 px-6 rounded-full border border-[#C9A227]/30 text-[#C9A227] font-bold text-sm tracking-widest uppercase mb-6 backdrop-blur shadow-sm">
                        {getContent('services.caravans.hero.badge', 'تجهيز وتجديد')}
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-xl reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                        {getContent('services.caravans.hero.title', 'صيانة الكرفانات')}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100">
                        {getContent('services.caravans.hero.subtitle', 'نقدم خدمات متكاملة لصيانة وتجديد وتجهيز الكرفانات بأحدث المواصفات لتلبية كافة احتياجاتك.')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                        <Link href={`${route('contact')}#contact-form-section`} className="gold-gradient hover:brightness-110 text-[#0B1F3A] font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:-translate-y-1 text-lg flex items-center justify-center gap-2">
                            اطلب عرض السعر
                            <DynamicIcon name="request_quote" />
                        </Link>
                    </div>
                </div>
            </section>
            {/* GALLERY – right below hero */}
            <GallerySection images={galleryImages} title="صور من أعمال الكرفانات" />

            {/* ABOUT SERVICE SECTION */}
            <section className="py-24 bg-white dark:bg-[#0B1F3A] relative z-20">
                <div className="max-w-7xl mx-auto px-4 text-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                    <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-4">{getContent('services.caravans.services.badge', 'ماذا نقدم؟')}</span>
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-8">{getContent('services.caravans.services.title', 'خدمات صيانة الكرفانات')}</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                        {services.map((service, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-[#071324] p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 dark:border-white/5">
                                <div className="w-16 h-16 mx-auto rounded-full bg-[#C9A227]/10 flex items-center justify-center text-[#C9A227] mb-6">
                                    <DynamicIcon name={service.icon} className="text-3xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/*  PROCESS / STEPS SECTION */}
            <section className="py-24 bg-[#0B1F3A] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-4">{getContent('services.caravans.process.badge', 'آلية العمل')}</span>
                    <h2 className="text-4xl font-black text-white mb-16">{getContent('services.caravans.process.title', 'خطوات الصيانة خطوة بخطوة')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative group reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${idx * 150}ms` }}>
                                {idx < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-l from-[#C9A227]/50 to-transparent -z-10 transform -translate-x-1/2"></div>
                                )}
                                <div className="w-24 h-24 mx-auto rounded-full border-4 border-[#C9A227] bg-[#071324] flex items-center justify-center text-[#C9A227] mb-6 shadow-[0_0_20px_rgba(201,162,39,0.2)] group-hover:scale-110 transition-transform duration-500">
                                    <DynamicIcon name={step.icon} className="text-4xl" />
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                                    <div className="text-[#C9A227] font-bold text-xl mb-3">{idx + 1}. {step.title}</div>
                                    <p className="text-gray-400 text-sm">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ADVANTAGES */}
            <section className="py-24 bg-white dark:bg-[#040A12] border-t border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-4">{getContent('services.caravans.why.badge', 'لماذا نحن؟')}</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8">{getContent('services.caravans.why.title', 'نضمن لك الجودة والسرعة في التنفيذ')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                                {getContent('services.caravans.why.desc', 'فريقنا المتميز يضع معايير الجودة نُصب عينيه، لضمان استلامك كرفانك جاهزاً وكأنه جديد، بأفضل التقنيات الحديثة وأجود المواد الخام المتاحة.')}
                            </p>
                            <div className="space-y-6">
                                {advantages.map((adv, idx) => (
                                    <div key={idx} className="flex items-center gap-5 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-[#0B1F3A] transition-colors">
                                        <div className="w-14 h-14 rounded-full bg-[#C9A227]/10 flex items-center justify-center text-[#C9A227] shrink-0">
                                            <DynamicIcon name={adv.icon} className="text-2xl" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white text-lg">{adv.title}</h4>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{adv.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[600px]">
                                <img src={getImageUrl('services.caravans.why.image', 'https://images.unsplash.com/photo-1594922119159-4d22edfa5041?q=80&w=2070&auto=format&fit=crop')} alt="Why Choose Us" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/20 to-transparent"></div>
                                <div className="absolute bottom-10 right-10 left-10 text-white">
                                    <div className="text-3xl font-bold mb-2">أكثر من 10 سنوات خبرة</div>
                                    <div className="text-xl text-[#C9A227]">في صيانة وتأهيل الكرفانات</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECTS / GALLERY */}
            {caravanProjects.length > 0 && (
                <section className="py-24 bg-[#f8f7f6] dark:bg-[#071324] border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <div>
                                <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-3">معرض الأعمال</span>
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white">أحدث مشاريع صيانة الكرفانات</h2>
                            </div>
                            <Link href={route('our-projects.index')} className="gold-gradient text-[#0B1F3A] font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center gap-2">
                                عرض جميع مشاريعنا
                                <DynamicIcon name="arrow_forward" className="text-sm rotate-180" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                            {caravanProjects.map((project, idx) => (
                                <Link href={route('our-projects.show', project.id)} key={project.id} className="group rounded-2xl overflow-hidden shadow-md bg-white dark:bg-[#0B1F3A] border border-gray-100 dark:border-white/5 hover:border-[#C9A227]/50 block transition-all hover:-translate-y-2 reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${idx * 150}ms` }}>
                                    <div className="h-64 overflow-hidden relative">
                                        <img
                                            src={project.image_path ? `/storage/${project.image_path}` : (project.image_url?.startsWith('http') ? project.image_url : `/storage/${project.image_url}`)}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1594922119159-4d22edfa5041?q=80&w=2070&auto=format&fit=crop'; }}
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors"></div>
                                        <div className="absolute top-4 right-4 bg-white/95 text-[#0B1F3A] text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur">
                                            {project.category ?? 'كرفانات'}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2">{project.title || project.title_ar}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            {/* CTA SECTION */}
            <section className="relative py-28 text-center bg-[#071324] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={getImageUrl('services.caravans.hero.image', '/images/services/caravans_bg.png')} alt="bg" className="w-full h-full object-cover filter scale-110 opacity-60" />
                    <div className="absolute inset-0 bg-[#0B1F3A]/40" style={{ opacity: getOpacity('services.caravans.hero.image', 40) / 100 }}></div>
                    <div className="absolute inset-0 hero-gradient" style={{ opacity: Math.min((getOpacity('services.caravans.hero.image', 40) + 40) / 100, 1) }}></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                    <DynamicIcon name="support_agent" className="text-[#C9A227] text-6xl mb-6" />
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {getContent('services.caravans.cta.title', 'هل كرفانك يحتاج إلى صيانة؟')}
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        {getContent('services.caravans.cta.subtitle', 'تواصل معنا الآن للحصول على استشارة وعرض سعر.')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={`${route('contact')}#contact-form-section`} className="inline-flex justify-center items-center gap-3 bg-[#C9A227] hover:bg-white text-[#0B1F3A] font-bold text-xl py-5 px-10 rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(201,162,39,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(201,162,39,0.4)]">
                            اطلب عرض السعر
                            <DynamicIcon name="arrow_forward" className="rotate-180" />
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="bg-[#040A12] py-8 text-center text-sm text-gray-400 border-t border-white/5 relative z-20">
                <p>نظام صيانة الكرفانات والبركسات © {new Date().getFullYear()} — صُمِّم بواسطة <a href="https://wa.me/967781582995" target="_blank" rel="noopener noreferrer" className="text-[#C9A227] font-bold hover:underline">شركة Aboras Soft</a></p>
            </footer>
        </div>
    );
}
