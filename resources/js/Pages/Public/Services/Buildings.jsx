import React, { useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';
import GallerySection from '@/Components/GallerySection';

export default function BuildingsMaintenance({ projects = [], galleryImages = [] }) {
    const { globalSettings, pageContents = {}, pageContentExtras = {} } = usePage().props;
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
        { title: getContent('services.buildings.services.item1.title', 'الترميم الشامل'), icon: 'home_repair_service', desc: getContent('services.buildings.services.item1.desc', 'تجديد داخلي وخارجي للفلل والمجمعات السكنية والتجارية لتعود متألقة وقوية الهيكل.') },
        { title: getContent('services.buildings.services.item2.title', 'العزل الهندسي'), icon: 'security', desc: getContent('services.buildings.services.item2.desc', 'تنفيذ أنظمة العزل الحراري والمائي للأسطح والواجهات لحمايتها من تسربات المياه والتغيرات المناخية.') },
        { title: getContent('services.buildings.services.item3.title', 'السباكة والكهرباء'), icon: 'engineering', desc: getContent('services.buildings.services.item3.desc', 'فحص وصيانة وتحديث جميع شبكات الكهرباء وأنظمة المياه والصرف الصحي بأعلى معايير السلامة.') },
        { title: getContent('services.buildings.services.item4.title', 'التشطيبات والدهانات'), icon: 'format_paint', desc: getContent('services.buildings.services.item4.desc', 'لمسـات أخيرة احترافية تشمل دهانات عصرية وأسقف معلقة وتكسيات للواجهات تعكس رقياً فائقاً.') }
    ];

    const steps = [
        { title: getContent('services.buildings.process.step1.title', 'فحص المبنى'), icon: 'search', desc: getContent('services.buildings.process.step1.desc', 'فحص هندسي دقيق لحالة المبنى وتحديد الأولويات والأعطال.') },
        { title: getContent('services.buildings.process.step2.title', 'دراسة التكاليف'), icon: 'calculate', desc: getContent('services.buildings.process.step2.desc', 'إعداد مقايسة تفصيلية لتكاليف المواد والعمل وتقديمها للعميل.') },
        { title: getContent('services.buildings.process.step3.title', 'تنفيذ الأعمال'), icon: 'construction', desc: getContent('services.buildings.process.step3.desc', 'البدء بالتنفيذ وفق جدول زمني محدد مع التنسيق المستمر.') },
        { title: getContent('services.buildings.process.step4.title', 'التسليم وإصدار الشهادات'), icon: 'assignment_turned_in', desc: getContent('services.buildings.process.step4.desc', 'تسليم الموقع بعد التأكد من مطابقة المواصفات القياسية المطلوبة.') }
    ];

    const advantages = [
        { title: getContent('services.buildings.why.item1.title', 'تشخيص دقيق'), icon: 'architecture', desc: getContent('services.buildings.why.item1.desc', 'نستخدم أدوات وتقنيات متطورة للكشف عن التصدعات وأماكن التسرب المائي المخفية دون تكسير للحوائط.') },
        { title: getContent('services.buildings.why.item2.title', 'مواد صيانة متطورة'), icon: 'access_time', desc: getContent('services.buildings.why.item2.desc', 'اختيار مواد بناء وحقن كيماوي للخرسانة معتمدة لضمان عدم تكرار المشكلة ومعالجة أساس الخلل.') },
        { title: getContent('services.buildings.why.item3.title', 'حفاظ عالٍ على النظافة'), icon: 'savings', desc: getContent('services.buildings.why.item3.desc', 'نحرص على احترام مساحات العملاء، ونقوم بعمليات الصيانة بطريقة منظمة ونظيفة قدر الإمكان.') },
        { title: getContent('services.buildings.why.item4.title', 'ضمانات ممتازة'), icon: 'verified', desc: getContent('services.buildings.why.item4.desc', 'نمنحك شهادات ضمان موثقة على كافة أعمال العزل الشاملة والصيانة الإنشائية التي ننفذها.') }
    ];

    const buildingProjects = projects.length > 0 ? projects.slice(0, 4) : [];

    return (
        <div className="bg-[#f8f7f6] dark:bg-[#071324] min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-[#C9A227] selection:text-[#0B1F3A]" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <Head>
                <title>{`صيانة المباني - ${siteName}`}</title>
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
                        alt={getContent('services.buildings.hero.title', 'صيانة المباني')}
                        className="w-full h-full object-cover transform scale-105 animate-[pulse_20s_infinite_alternate]"
                        src={getImageUrl('services.buildings.hero.image', 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')}
                    />
                    <div className="absolute inset-0 bg-[#0B1F3A]/30" style={{ opacity: getOpacity('services.buildings.hero.image', 30) / 100 }}></div>
                    <div className="absolute inset-0 hero-gradient" style={{ opacity: Math.min((getOpacity('services.buildings.hero.image', 30) + 40) / 100, 1) }}></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-20">
                    <span className="inline-block py-1.5 px-6 rounded-full border border-[#C9A227]/30 text-[#C9A227] font-bold text-sm tracking-widest uppercase mb-6 backdrop-blur shadow-sm">
                        {getContent('services.buildings.hero.badge', 'حماية واستدامة')}
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-xl reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                        {getContent('services.buildings.hero.title', 'صيانة شاملة للمباني')}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100">
                        {getContent('services.buildings.hero.subtitle', 'نوفر خدمات متكاملة للحفاظ على استدامة وجمالية المباني السكنية والتجارية، بخبرات هندسية رائدة وتكنولوجيا صيانة حديثة.')}
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
            <GallerySection images={galleryImages} title="صور من أعمال المباني" />

            {/* ABOUT SERVICE SECTION */}
            <section className="py-24 bg-white dark:bg-[#0B1F3A] relative z-20">
                <div className="max-w-7xl mx-auto px-4 text-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                    <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-4">{getContent('services.buildings.services.badge', 'تغدية شاملة لاحتياجاتك')}</span>
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-8">{getContent('services.buildings.services.title', 'حلول الصيانة المتكاملة التي نقدمها')}</h2>

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
                    <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-4">{getContent('services.buildings.process.badge', 'آلية العمل')}</span>
                    <h2 className="text-4xl font-black text-white mb-16">{getContent('services.buildings.process.title', 'خطوات الصيانة خطوة بخطوة')}</h2>

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
                            <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-4">{getContent('services.buildings.why.badge', 'رؤية هندسية واضحة')}</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8">{getContent('services.buildings.why.title', 'إطالة عمر المبنى والحفاظ على قيمته')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                                {getContent('services.buildings.why.desc', 'تتعرض المباني مع مرور الوقت لتحديات بيئية وإنشائية عديدة. فريقنا الهندسي المجهز بأحدث أجهزة الفحص، يقوم برصد أسباب المشكلة ومعالجتها جذرياً لا مؤقتاً، لحماية استثمارك العقاري للحاضر والمستقبل.')}
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
                                <img src={getImageUrl('services.buildings.why.image', 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2000&auto=format&fit=crop')} alt="Why Choose Us" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/20 to-transparent"></div>
                                <div className="absolute bottom-10 right-10 left-10 text-white">
                                    <div className="text-3xl font-bold mb-2">إشراف هندسي متكامل</div>
                                    <div className="text-xl text-[#C9A227]">في صيانة وترميم المباني</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECTS / GALLERY */}
            {buildingProjects.length > 0 && (
                <section className="py-24 bg-[#f8f7f6] dark:bg-[#071324] border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <div>
                                <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-3">معرض الأعمال</span>
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white">أحدث مشاريع المباني</h2>
                            </div>
                            <Link href={route('our-projects.index')} className="gold-gradient text-[#0B1F3A] font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center gap-2">
                                عرض جميع مشاريعنا
                                <DynamicIcon name="arrow_forward" className="text-sm rotate-180" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                            {buildingProjects.map((project, idx) => (
                                <Link href={route('our-projects.show', project.id)} key={project.id} className="group rounded-2xl overflow-hidden shadow-md bg-white dark:bg-[#0B1F3A] border border-gray-100 dark:border-white/5 hover:border-[#C9A227]/50 block transition-all hover:-translate-y-2 reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${idx * 150}ms` }}>
                                    <div className="h-64 overflow-hidden relative">
                                        <img
                                            src={project.image_path ? `/storage/${project.image_path}` : (project.image_url?.startsWith('http') ? project.image_url : `/storage/${project.image_url}`)}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'; }}
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors"></div>
                                        <div className="absolute top-4 right-4 bg-white/95 text-[#0B1F3A] text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur">
                                            {project.category ?? 'مباني'}
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

            <section className="relative py-28 text-center bg-[#071324] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={getImageUrl('services.buildings.hero.image', '/images/services/buildings_bg.png')} alt="bg" className="w-full h-full object-cover filter scale-110 opacity-60" />
                    <div className="absolute inset-0 bg-[#0B1F3A]/40" style={{ opacity: getOpacity('services.buildings.hero.image', 40) / 100 }}></div>
                    <div className="absolute inset-0 hero-gradient" style={{ opacity: Math.min((getOpacity('services.buildings.hero.image', 40) + 40) / 100, 1) }}></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                    <DynamicIcon name="support_agent" className="text-[#C9A227] text-6xl mb-6" />
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {getContent('services.buildings.cta.title', 'براءات اختراع في إطالة عمر مبناك!')}
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        {getContent('services.buildings.cta.subtitle', 'مهما كان نوع التدخل الذي يحتاجه العقار السكني أو المرفق التجاري الخاص بك، اترك عبء الصيانة لنا بأمان. اطلب معاينة للبدء في تشخيص وحل المشكلة بشكل فوري.')}
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
