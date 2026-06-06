import React, { useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';
import GallerySection from '@/Components/GallerySection';
import Footer from '@/Components/Footer';

export default function LandscapingService({ projects = [], galleryImages = [] }) {
    const { globalSettings, pageContents = {}, pageContentExtras = {} } = usePage().props;
    const siteName = globalSettings?.site_name?.value || 'شركة مظلات التميز';

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
        { title: getContent('services.landscaping.services.item1.title', 'تصميم 3D للديكورات'), icon: 'architecture', desc: getContent('services.landscaping.services.item1.desc', 'نقدم تصاميم ثلاثية الأبعاد مبتكرة تعكس رؤيتك للحديقة قبل التنفيذ.') },
        { title: getContent('services.landscaping.services.item2.title', 'زراعة النباتات والأشجار'), icon: 'park', desc: getContent('services.landscaping.services.item2.desc', 'اختيار وزراعة أفضل أنواع النباتات والأشجار التي تناسب مناخ منطقتك.') },
        { title: getContent('services.landscaping.services.item3.title', 'تركيب شبكات الري'), icon: 'water_drop', desc: getContent('services.landscaping.services.item3.desc', 'تصميم وتركيب شبكات ري أوتوماتيكية ذكية توفر المياه وتحافظ على نضارة الحديقة.') },
        { title: getContent('services.landscaping.services.item4.title', 'العناية الشاملة'), icon: 'eco', desc: getContent('services.landscaping.services.item4.desc', 'خدمات صيانة دورية للديكورات تشمل التقليم والتسميد ومكافحة الآفات الفنية.') }
    ];


    // Dynamic Advantages (Why Choose Us)
    const advantages = Object.keys(pageContents)
        .filter(key => key.startsWith('services.landscaping.why.item') && key.endsWith('.title'))
        .map(key => {
            const baseKey = key.replace('.title', '');
            return {
                title: pageContents[key],
                desc: pageContents[`${baseKey}.desc`] || '',
                icon: pageContents[`${baseKey}.icon`] || 'verified' // Default icon if not specified
            };
        });

    // Fallback if none found in DB
    const displayAdvantages = advantages.length > 0 ? advantages : [
        { title: getContent('services.landscaping.why.item1.title', 'إبداع في التصميم'), icon: 'emoji_objects', desc: getContent('services.landscaping.why.item1.desc', 'نبتكر أفكاراً فريدة تجعل حديقتك لوحة فنية مميزة تعكس ذوقك الرفيع.') },
        { title: getContent('services.landscaping.why.item2.title', 'مهندسون زراعيون'), icon: 'nature_people', desc: getContent('services.landscaping.why.item2.desc', 'فريق متخصص من المهندسين الزراعيين ذوي الخبرة الطويلة في الديكورات.') },
        { title: getContent('services.landscaping.why.item3.title', 'جودة المواد والنباتات'), icon: 'verified', desc: getContent('services.landscaping.why.item3.desc', 'نستخدم أفضل المواد الفنية والنباتات المنتقاة بعناية لضمان استدامتها.') },
        { title: getContent('services.landscaping.why.item4.title', 'التزام تام'), icon: 'schedule', desc: getContent('services.landscaping.why.item4.desc', 'نحترم مواعيدنا ونلتزم بتقديم أعلى مستويات الجودة في التنفيذ والتسليم.') }
    ];

    const landscapeProjects = projects.length > 0 ? projects.slice(0, 4) : [];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-primary selection:text-slate-900" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <Head>
                <title>{`ديكورات داخلية فاخرة بالرياض – تنسيق وتصميم احترافي | ${siteName}`}</title>
                <meta name="description" content="شركة مظلات التميز متخصصون في تركيب المظلات والسواتر والبرجولات والهناجر بالرياض بأحدث أساليب التظليل." />
                <meta name="keywords" content="ديكورات داخلية، تصميم ديكور، ديكورات فاخرة، ديكور مودرن، ديكورات الرياض، تشطيبات داخلية، ديكور فلل، ديكور مكتب، شركة ديكور الرياض" />
                <meta property="og:title" content={`ديكورات داخلية فاخرة | ${siteName}`} />
                <meta property="og:description" content="شركة مظلات التميز – خبرة أكثر من 10 سنوات في تصميم وتنفيذ أعمال التظليل بالرياض." />
                <meta property="og:type" content="website" />
                <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet" />
                <link rel="canonical" href={window.location.href} />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "name": "ديكورات داخلية",
                    "description": "تصميم وتنسيق الديكورات الداداخلية في الرياض والمملكة العربية السعودية",
                    "provider": { "@type": "Organization", "name": "شركة مظلات التميز" },
                    "areaServed": "المملكة العربية السعودية",
                    "serviceType": "ديكورات داخلية"
                })}</script>
                <style>{`
                    .hero-gradient { background-image: linear-gradient(180deg, rgba(11,31,58,0.5) 0%, rgba(11,31,58,0.95) 100%); }
                    .decoration-gradient { background-image: linear-gradient(135deg, #D4AF37 0%, #C5A059 100%); }
                `}</style>
            </Head>

            <Navbar />

            {/* HERO SECTION */}
            <section className="relative h-[65vh] min-h-[550px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt={getContent('services.landscaping.hero.title', 'ديكورات داخلية')}
                        className="w-full h-full object-cover"
                        src={getImageUrl('services.landscaping.hero.image', 'https://images.unsplash.com/photo-1558904541-efa843a96f09?q=80&w=2070&auto=format&fit=crop')}
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-20">
                    <span className="inline-block py-1.5 px-6 rounded-full border border-primary/30 text-primary font-bold text-sm tracking-widest uppercase mb-6 backdrop-blur shadow-sm">
                        {getContent('services.landscaping.hero.badge', 'ديكورات وتنسيق')}
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-xl reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                        {getContent('services.landscaping.hero.title', 'ديكورات داخلية')}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100">
                        {getContent('services.landscaping.hero.subtitle', 'نحول مساحاتك الخارجية إلى واحات خضراء ساحرة تنبض بالحياة، بأحدث أساليب الديكورات العالمية.')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                        <Link href={`${route('contact')}#contact-form-section`} className="decoration-gradient hover:brightness-110 text-slate-900 font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:-translate-y-1 text-lg flex items-center justify-center gap-2">
                            اطلب عرض السعر
                            <DynamicIcon name="request_quote" />
                        </Link>
                    </div>
                </div>
            </section>
            {/* GALLERY – right below hero */}
            <GallerySection images={galleryImages} title="صور من أعمال ديكورات داخلية" />

            {/* ABOUT SERVICE SECTION */}
            <section className="py-24 bg-white dark:bg-surface-dark relative z-20">
                <div className="max-w-7xl mx-auto px-4 text-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                    <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-4">{getContent('services.landscaping.services.badge', 'ماذا نقدم؟')}</span>
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-8">{getContent('services.landscaping.services.title', 'خدمات الديكورات والتنسيق')}</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                        {services.map((service, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-background-dark p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 dark:border-white/5">
                                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                                    <DynamicIcon name={service.icon} className="text-3xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{service.desc}</p>
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
                            <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-4">{getContent('services.landscaping.why.badge', 'لماذا تختار شركة مظلات التميز؟')}</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8">{getContent('services.landscaping.why.title', 'نضمن لك الجمال والاحترافية في التنفيذ')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                                {getContent('services.landscaping.why.desc', 'نحن نمزج بين الفن والهندسة لنخلق مساحات خضراء تريح النفس وتسعد العين، باستخدام أجود المواد والنباتات وأحدث تقنيات الري الذكية.')}
                            </p>
                            <div className="space-y-6">
                                {displayAdvantages.map((adv, idx) => (
                                    <div key={idx} className="flex items-center gap-5 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-surface-dark transition-colors">
                                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
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
                                <img src={getImageUrl('services.landscaping.why.image', 'https://images.unsplash.com/photo-1594922119159-4d22edfa5041?q=80&w=2070&auto=format&fit=crop')} alt="Why Choose Us" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/90 via-[#0B1120]/20 to-transparent"></div>
                                <div className="absolute bottom-10 right-10 left-10 text-white">
                                    <div className="text-3xl font-bold mb-2">{getContent('services.landscaping.why.experience.title', 'أكثر من 10 سنوات خبرة')}</div>
                                    <div className="text-xl text-primary">{getContent('services.landscaping.why.experience.subtitle', 'في تصميم وديكورات داخلية')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECTS / GALLERY */}
            {landscapeProjects.length > 0 && (
                <section className="py-24 bg-background-light dark:bg-background-dark border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <div>
                                <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-3">معرض الأعمال</span>
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white">أحدث مشاريع الديكورات</h2>
                            </div>
                            <Link href={route('our-projects.index')} className="decoration-gradient text-slate-900 font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center gap-2">
                                عرض جميع مشاريعنا
                                <DynamicIcon name="arrow_forward" className="text-sm rotate-180" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                            {landscapeProjects.map((project, idx) => (
                                <Link href={route('our-projects.show', project.id)} key={project.id} className="group rounded-2xl overflow-hidden shadow-md bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 hover:border-primary/50 block transition-all hover:-translate-y-2 reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${idx * 150}ms` }}>
                                    <div className="h-64 overflow-hidden relative">
                                        <img
                                            src={project.image_path ? `/storage/${project.image_path}` : (project.image_url?.startsWith('http') ? project.image_url : `/storage/${project.image_url}`)}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1558904541-efa843a96f09?q=80&w=2070&auto=format&fit=crop'; }}
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors"></div>
                                        <div className="absolute top-4 right-4 bg-white/95 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur">
                                            {project.category ?? 'ديكورات مودرن'}
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
            {/* ===== SEO RICH CONTENT SECTION ===== */}
            <section className="py-20 bg-gray-50 dark:bg-background-dark border-t border-gray-100 dark:border-white/5">
                <div className="max-w-5xl mx-auto px-4">

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                        {[
                            { number: '+300', label: 'مشروع ديكور داخلي', icon: 'home_work' },
                            { number: '+10', label: 'سنوات خبرة في الرياض', icon: 'military_tech' },
                            { number: '100%', label: 'رضا العملاء', icon: 'thumb_up' },
                            { number: '3D', label: 'تصميم ثلاثي مجاني', icon: 'view_in_ar' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-6 text-center border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-3xl md:text-4xl font-black text-primary mb-2">{stat.number}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-snug">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Long SEO Text Article */}
                    <article className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700" dir="rtl">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">المظلات والسواتر بالرياض – شركة مظلات التميز</h2>
                        <p className="text-base leading-8 mb-6 text-gray-600 dark:text-gray-400">
                            تتميز <strong className="text-gray-900 dark:text-white">شركة مظلات التميز</strong> بتقديم خدمات شاملة في مجال المظلات والسواتر والبرجولات، تجمع بين الجودة ودقة التنفيذ لتحويل مساحاتك إلى بيئة آمنة ومظللة. نخدم عملاءنا في كافة أرجاء الرياض والمدن الكبرى في المملكة العربية السعودية.
                        </p>
                        <p className="text-base leading-8 mb-6 text-gray-600 dark:text-gray-400">
                            نمزج بين الفن والهندسة لنخلق مساحات داخلية تريح النفس وتسعد العين، باستخدام <strong className="text-gray-900 dark:text-white">أجود المواد وأحدث منتجات الديكور العالمية</strong>.
                        </p>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 mt-8">خدمات الديكورات الداخلية التي نتخصص فيها</h3>
                        <ul className="space-y-3 mb-6">
                            {[
                                'تصميم ديكورات داخلية فاخرة للمنازل والفلل',
                                'ديكورات معاصرة وكلاسيكية بأعلى المعايير',
                                'تصميم ثلاثي الأبعاد (3D) مجاني قبل التنفيذ',
                                'تشطيبات داخلية شاملة: جبس بورد، رخام، دهانات، ورق جدران',
                                'ديكورات مكاتب ومحلات تجارية بتصاميم عصرية',
                                'إضاءة ديكورية مخفية وإبداعية لكل غرفة',
                                'أعمال نجارة وتفصيل أثاث وخزائن ملابس',
                                'صيانة وتجديد الديكورات القديمة',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-base">
                                    <span className="text-primary text-xl mt-0.5">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 mt-8">لماذا نحن الخيار الأمثل لديكوراتك الداخلية؟</h3>
                        <p className="text-base leading-8 mb-4 text-gray-600 dark:text-gray-400">
                            يعتمد فريقنا على <strong className="text-gray-900 dark:text-white">منهجية مدروسة</strong> تبدأ بفهم احتياجاتك وأسلوبك الحياتي قبل انطلاق أي مشروع. نستخدم <strong className="text-gray-900 dark:text-white">مواد خام عالية الجودة</strong> معتمدة محلياً وعالمياً لضمان جمال ومتانة الديكورات على مدى سنوات.
                        </p>
                    </article>

                    {/* FAQ Section */}
                    <div className="mt-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8 text-center">أسئلة شائعة حول خدمات الديكورات الداخلية</h3>
                        <script type="application/ld+json">{JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                { "@type": "Question", "name": "هل تقدمون تصميم ثلاثي الأبعاد للديكور الداخلي؟", "acceptedAnswer": { "@type": "Answer", "text": "نعم، نقدم خدمة التصميم ثلاثي الأبعاد (3D) لجميع مشاريع الديكورات الداخلية مجاناً قبل التنفيذ." } },
                                { "@type": "Question", "name": "كم تكلفة الديكورات الداخلية بالرياض؟", "acceptedAnswer": { "@type": "Answer", "text": "تتفاوت الأسعار حسب المساحة ونوع التصميم. نقدم أسعاراً تنافسية تناسب جميع الميزانيات مع ضمان أعلى جودة." } },
                                { "@type": "Question", "name": "ما هي أنواع الديكور الداخلي التي تقدمونها؟", "acceptedAnswer": { "@type": "Answer", "text": "نقدم جميع أنواع الديكور الداخلي: مودرن، كلاسيك، كونتمبوراري، مينيمالست، فندقي، والعديد من الأساليب العالمية." } },
                                { "@type": "Question", "name": "هل تقدمون خدمة الديكور للمكاتب والمحلات التجارية؟", "acceptedAnswer": { "@type": "Answer", "text": "نعم، نخدم القطاع التجاري بتصاميم ديكورية متكاملة تشمل المكاتب، المحلات، المطاعم، والمرافق العامة." } },
                            ]
                        })}</script>
                        <div className="space-y-4">
                            {[
                                { q: 'هل تقدمون تصميم ثلاثي الأبعاد للديكور الداخلي؟', a: 'نعم، نقدم خدمة التصميم ثلاثي الأبعاد (3D) لجميع مشاريع الديكورات الداخلية مجاناً قبل التنفيذ.' },
                                { q: 'كم تكلفة الديكورات الداخلية بالرياض؟', a: 'تتفاوت الأسعار حسب المساحة ونوع التصميم. نقدم أسعاراً تنافسية تناسب جميع الميزانيات مع ضمان أعلى جودة.' },
                                { q: 'ما هي أنواع الديكور الداخلي التي تقدمونها؟', a: 'نقدم جميع أنواع الديكور: مودرن، كلاسيك، كونتمبوراري، مينيمالست، فندقي، والعديد من الأساليب العالمية.' },
                                { q: 'هل تقدمون خدمة الديكور للمكاتب والمحلات؟', a: 'نعم، نخدم القطاع التجاري بتصاميم ديكورية متكاملة تشمل المكاتب، المحلات، المطاعم، والمرافق العامة.' },
                                { q: 'هل تقدمون ضمانات على أعمال الديكور؟', a: 'نعم، نقدم ضمانات حقيقية على جميع أعمال الديكور الداخلي تشمل جودة المواد والتشطيب وثبات التركيبات.' },
                            ].map((faq, i) => (
                                <details key={i} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden group">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-gray-900 dark:text-white hover:text-primary transition-colors list-none">
                                        <span>{faq.q}</span>
                                        <span className="text-primary text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed text-base border-t border-gray-100 dark:border-white/5 pt-4">
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="relative py-28 text-center bg-background-dark overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={getImageUrl('services.landscaping.hero.image', 'https://images.unsplash.com/photo-1558904541-efa843a96f09?q=80&w=2070&auto=format&fit=crop')} alt="bg" className="w-full h-full object-cover filter scale-110 opacity-60" />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                    <DynamicIcon name="support_agent" className="text-primary text-6xl mb-6" />
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {getContent('services.landscaping.cta.title', 'هل حديقتك تحتاج إلى تنسيق احترافي؟')}
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        {getContent('services.landscaping.cta.subtitle', 'تواصل معنا الآن للحصول على استشارة وتصميم مبدئي لتبدأ رحلة التغيير.')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={`${route('contact')}#contact-form-section`} className="inline-flex justify-center items-center gap-3 bg-primary hover:bg-white text-slate-900 font-bold text-xl py-5 px-10 rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(201,162,39,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(201,162,39,0.4)]">
                            اطلب عرض السعر
                            <DynamicIcon name="arrow_forward" className="rotate-180" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
