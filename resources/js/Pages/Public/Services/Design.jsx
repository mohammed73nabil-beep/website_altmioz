import React, { useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';
import GallerySection from '@/Components/GallerySection';
import Footer from '@/Components/Footer';

export default function DesignService({ projects = [], galleryImages = [] }) {
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
        { title: getContent('services.design.services.item1.title', 'تصميم وتنسيق'), icon: 'design_services', desc: getContent('services.design.services.item1.desc', 'تصاميم ديكورات عصرية ومبتكرة تضفي جمالاً طبيعياً على مساحتك الخاصة.') },
        { title: getContent('services.design.services.item2.title', 'العناية الشاملة'), icon: 'park', desc: getContent('services.design.services.item2.desc', 'صيانة وتجديد الديكورات القديمة لتعود كالجديدة وتحسين مظهرها الطبيعي.') },
        { title: getContent('services.design.services.item3.title', 'ديكورات منزلية وديكورات مائية'), icon: 'water_drop', desc: getContent('services.design.services.item3.desc', 'تصميم وبناء أحدث الديكورات مائية والديكورات منزلية المائية بتصاميم حجرية خلابة.') },
        { title: getContent('services.design.services.item4.title', 'تجهيز الجلسات'), icon: 'deck', desc: getContent('services.design.services.item4.desc', 'تنفيذ وتجهيز جلسات خارجية وبرجولات خشبية ومظلات بتصاميم راقية.') }
    ];


    const advantages = [
        { title: getContent('services.design.why.item1.title', 'تنفيذ في الوقت المحدد'), icon: 'timer', desc: getContent('services.design.why.item1.desc', 'نلتزم بالخطة الزمنية لتنفيذ الحديقة بأسرع وقت وأعلى جودة ممكنة.') },
        { title: getContent('services.design.why.item2.title', 'كوادر هندسية'), icon: 'groups', desc: getContent('services.design.why.item2.desc', 'فريق من المهندسين الزراعيين ذوي الكفاءة العالية في أعمال الديكورات.') },
        { title: getContent('services.design.why.item3.title', 'أسعار مدروسة'), icon: 'payments', desc: getContent('services.design.why.item3.desc', 'نقدم أسعاراً تنافسية تتناسب مع جميع الميزانيات دون التنازل عن الجودة.') },
        { title: getContent('services.design.why.item4.title', 'ضمان وصيانة'), icon: 'thumb_up', desc: getContent('services.design.why.item4.desc', 'نقدم ضمانات حقيقية على كافة الأعمال مع إمكانية التعاقد للصيانة الدورية.') }
    ];

    const designProjects = projects.length > 0 ? projects.slice(0, 4) : [];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-primary selection:text-slate-900" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <Head>
                <title>{`ديكورات الرياض - تصميم وديكورات داخلية احترافية | ${siteName}`}</title>
                <meta name="description" content={getContent('services.design.hero.desc', 'شركة مظلات التميز متخصصون في تركيب المظلات والسواتر والبرجولات بالرياض والمملكة العربية السعودية بضمانات حقيقية.')} />
                <meta name="keywords" content="مظلات الرياض، مظلات سيارات، سواتر حديد، برجولات خشبية، هناجر، مظلات بالرياض، شركة مظلات، تركيب مظلات" />
                <meta property="og:title" content={`مظلات وسواتر وبرجولات بالرياض | ${siteName}`} />
                <meta property="og:description" content="شركة مظلات التميز – خبرة أكثر من 10 سنوات في تركيب المظلات والسواتر بالرياض. اتصل بنا الآن للحصول على استشارة مجانية." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={window.location.href} />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "name": "تصميم وديكورات داخلية",
                    "description": "تصميم وتنفيذ الديكورات الداخلية للمنازل والفلل والمكاتب في الرياض والمملكة العربية السعودية",
                    "provider": { "@type": "Organization", "name": "شركة مظلات التميز" },
                    "areaServed": "المملكة العربية السعودية",
                    "serviceType": "تصميم ديكور داخلي"
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
                        alt={getContent('services.design.hero.title', 'ديكورات الرياض والديكورات')}
                        className="w-full h-full object-cover"
                        src={getImageUrl('services.design.hero.image', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop')}
                        fetchpriority="high"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-20">
                    <span className="inline-block py-1.5 px-6 rounded-full border border-primary/30 text-primary font-bold text-sm tracking-widest uppercase mb-6 backdrop-blur shadow-sm">
                        {getContent('services.design.hero.badge', 'تصميم وتنسيق')}
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-xl reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                        {getContent('services.design.hero.title', 'ديكورات الرياض')}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100">
                        {getContent('services.design.hero.subtitle', 'نقدم خدمات متكاملة لتصميم وديكورات داخلية وبناء الديكورات مائية بأحدث المواصفات لتلبية كافة احتياجاتك.')}
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
            <GallerySection images={galleryImages} title="صور من أعمال ديكورات الرياض" />

            {/* ABOUT SERVICE SECTION */}
            <section className="py-24 bg-white dark:bg-surface-dark relative z-20">
                <div className="max-w-7xl mx-auto px-4 text-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                    <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-4">{getContent('services.design.services.badge', 'ماذا نقدم؟')}</span>
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-8">{getContent('services.design.services.title', 'خدمات ديكورات الرياض')}</h2>

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
                            <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-4">{getContent('services.design.why.badge', 'لماذا نحن؟')}</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8">{getContent('services.design.why.title', 'نضمن لك الجودة والسرعة في التنفيذ')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                                {getContent('services.design.why.desc', 'فريقنا المتميز يضع معايير الجودة نُصب عينيه، لضمان استلامك حديقتك جاهزة وكأنها قطعة من الجنة، بأفضل التقنيات الحديثة وأجود المواد الخام المتاحة.')}
                            </p>
                            <div className="space-y-6">
                                {advantages.map((adv, idx) => (
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
                                <img src={getImageUrl('services.design.why.image', 'https://images.unsplash.com/photo-1594922119159-4d22edfa5041?q=80&w=2070&auto=format&fit=crop')} alt="Why Choose Us" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/90 via-[#0B1120]/20 to-transparent"></div>
                                <div className="absolute bottom-10 right-10 left-10 text-white">
                                    <div className="text-3xl font-bold mb-2">أكثر من 10 سنوات خبرة</div>
                                    <div className="text-xl text-primary">في تصميم وتأهيل الديكورات</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECTS / GALLERY */}
            {designProjects.length > 0 && (
                <section className="py-24 bg-background-light dark:bg-background-dark border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <div>
                                <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-3">معرض الأعمال</span>
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white">أحدث مشاريع ديكورات الرياض</h2>
                            </div>
                            <Link href={route('our-projects.index')} className="decoration-gradient text-slate-900 font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center gap-2">
                                عرض جميع مشاريعنا
                                <DynamicIcon name="arrow_forward" className="text-sm rotate-180" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                            {designProjects.map((project, idx) => (
                                <Link href={route('our-projects.show', project.id)} key={project.id} className="group rounded-2xl overflow-hidden shadow-md bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 hover:border-primary/50 block transition-all hover:-translate-y-2 reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${idx * 150}ms` }}>
                                    <div className="h-64 overflow-hidden relative">
                                        <img
                                            src={project.image_path ? `/storage/${project.image_path}` : (project.image_url?.startsWith('http') ? project.image_url : `/storage/${project.image_url}`)}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1594922119159-4d22edfa5041?q=80&w=2070&auto=format&fit=crop'; }}
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors"></div>
                                        <div className="absolute top-4 right-4 bg-white/95 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur">
                                            {project.category ?? 'تصميم'}
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
                            { number: '+500', label: 'مشروع ديكور منجز', icon: 'home_work' },
                            { number: '+10', label: 'سنوات خبرة في الرياض', icon: 'military_tech' },
                            { number: '100%', label: 'رضا العملاء', icon: 'thumb_up' },
                            { number: '+50', label: 'مهندس ومصمم متخصص', icon: 'groups' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-6 text-center border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-3xl md:text-4xl font-black text-primary mb-2">{stat.number}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-snug">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Long SEO Text Article */}
                    <article className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700" dir="rtl">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">تركيب مظلات وسواتر فاخرة بالرياض – شركة مظلات التميز</h2>
                        <p className="text-base leading-8 mb-6 text-gray-600 dark:text-gray-400">
                            تُعدّ <strong className="text-gray-900 dark:text-white">شركة مظلات التميز</strong> من أبرز شركات تركيب المظلات والسواتر والبرجولات في الرياض والمملكة العربية السعودية، إذ تمتلك خبرة تتجاوز عشر سنوات في تصميم وتنفيذ مشاريع التظليل للمنازل والحدائق والمسابح والمدارس.
                        </p>
                        <p className="text-base leading-8 mb-6 text-gray-600 dark:text-gray-400">
                            نقدم خدمات <strong className="text-gray-900 dark:text-white">تصميم الديكور الداخلي</strong> الشاملة التي تبدأ من الاستشارة المجانية وحتى التسليم النهائي، مروراً برسم المخططات الثلاثية الأبعاد، واختيار المواد والألوان، وتنفيذ جميع أعمال الديكور بدقة عالية. نتخصص في أنماط التصميم المودرن، الكلاسيك، الكونتمبوراري، والمينيمالست، وفق أحدث الاتجاهات العالمية للديكور.
                        </p>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 mt-8">خدمات الديكور الداخلي التي نقدمها في الرياض</h3>
                        <ul className="space-y-3 mb-6">
                            {[
                                'تصميم وتنفيذ ديكورات المنازل والفلل السكنية في الرياض',
                                'ديكورات الأسقف المعلقة والجبس بورد بتصاميم مبتكرة',
                                'تركيب ورق الجدران وبديل الرخام والخشب للواجهات الداخلية',
                                'تصميم وتنفيذ ديكورات المكاتب والمحلات التجارية',
                                'إضاءة ديكورية وإضاءة مخفية لتعزيز جماليات المكان',
                                'تفصيل وتركيب الأثاث الداخلي المدمج وخزائن الملابس',
                                'دهانات وتشطيبات داخلية بأجود أنواع الطلاء',
                                'ديكورات حمامات ومطابخ عصرية وأنيقة',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-base">
                                    <span className="text-primary text-xl mt-0.5">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 mt-8">لماذا تختار شركة مظلات التميز لخدمات التظليل؟</h3>
                        <p className="text-base leading-8 mb-6 text-gray-600 dark:text-gray-400">
                            ما يميزنا عن غيرنا أننا لا نكتفي بتنفيذ الأفكار، بل نبتكر حلولاً ذكية تجمع بين الجمالية والوظيفية. فريقنا من <strong className="text-gray-900 dark:text-white">المهندسين المعماريين ومصممي الديكور</strong> يتمتع بخبرة واسعة في التعامل مع مختلف أنواع الفراغات والأنماط المعمارية. نحرص على توظيف أفضل المواد الخام المحلية والمستوردة لضمان جودة التشطيب ومتانته على مدى السنوات.
                        </p>
                        <p className="text-base leading-8 mb-6 text-gray-600 dark:text-gray-400">
                            كما نقدم خدمة <strong className="text-gray-900 dark:text-white">التصميم ثلاثي الأبعاد</strong> مجاناً قبل البدء في التنفيذ، مما يتيح لك رؤية شكل منزلك النهائي والموافقة على كل التفاصيل قبل تنفيذها على أرض الواقع. نلتزم بالجدول الزمني المتفق عليه، ونوفر ضمانات حقيقية على جميع أعمال الديكور.
                        </p>
                    </article>

                    {/* FAQ Section */}
                    <div className="mt-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8 text-center">أسئلة شائعة حول خدمات الديكور الداخلي</h3>
                        <script type="application/ld+json">{JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                { "@type": "Question", "name": "كم تكلفة تركيب المظلات في الرياض؟", "acceptedAnswer": { "@type": "Answer", "text": "تتفاوت أسعار المظلات في الرياض حسب المساحة والنوع. نقدم في شركة مظلات التميز أسعاراً تنافسية تناسب مختلف الميزانيات، مع ضمان أعلى معايير الجودة. تواصل معنا للحصول على عرض سعر مجاني." } },
                                { "@type": "Question", "name": "كم المدة الزمنية لتنفيذ مشروع الديكور؟", "acceptedAnswer": { "@type": "Answer", "text": "تختلف مدة التنفيذ حسب حجم المشروع. المشاريع الصغيرة (غرفة واحدة) قد تستغرق أسبوعاً، بينما المشاريع الكاملة للفلل قد تستغرق من 4 إلى 8 أسابيع. نلتزم دائماً بالجداول الزمنية المتفق عليها." } },
                                { "@type": "Question", "name": "هل تقدمون ضماناً على أعمال الديكور؟", "acceptedAnswer": { "@type": "Answer", "text": "نعم، نقدم ضمانات حقيقية على جميع أعمال الديكور الداخلي التي ننفذها، تشمل جودة المواد والتشطيب وثبات التركيبات. اتصل بنا لمعرفة تفاصيل الضمان الخاص بمشروعك." } },
                                { "@type": "Question", "name": "هل تقدمون خدمة التصميم الثلاثي الأبعاد قبل التنفيذ؟", "acceptedAnswer": { "@type": "Answer", "text": "نعم، نوفر خدمة التصميم ثلاثي الأبعاد (3D Rendering) لمشاريع الديكور الداخلي، مما يتيح لك رؤية النتيجة النهائية والتعديل عليها قبل البدء في التنفيذ." } },
                            ]
                        })}</script>
                        <div className="space-y-4">
                            {[
                                { q: 'كم تكلفة تصميم الديكور الداخلي في الرياض؟', a: 'تتفاوت أسعار الديكور الداخلي حسب المساحة وطبيعة التصميم. نقدم أسعاراً تنافسية تناسب مختلف الميزانيات مع ضمان أعلى معايير الجودة. تواصل معنا للحصول على عرض سعر مجاني.' },
                                { q: 'كم المدة الزمنية لتنفيذ مشروع الديكور؟', a: 'تختلف المدة حسب حجم المشروع. المشاريع الصغيرة قد تستغرق أسبوعاً، بينما المشاريع الكاملة للفلل من 4 إلى 8 أسابيع. نلتزم دائماً بالجداول الزمنية المتفق عليها.' },
                                { q: 'هل تقدمون ضماناً على أعمال الديكور؟', a: 'نعم، نقدم ضمانات حقيقية على جميع أعمال الديكور الداخلي تشمل جودة المواد والتشطيب وثبات التركيبات.' },
                                { q: 'هل تقدمون خدمة التصميم الثلاثي الأبعاد؟', a: 'نعم، نوفر خدمة التصميم ثلاثي الأبعاد (3D Rendering) مما يتيح لك رؤية النتيجة النهائية والتعديل عليها قبل البدء في التنفيذ.' },
                                { q: 'ما هي مناطق الخدمة التي تغطيها شركة مظلات التميز؟', a: 'نغطي جميع أحياء مدينة الرياض بالإضافة إلى المدن الرئيسية في المملكة العربية السعودية. تواصل معنا لتحديد إمكانية الخدمة في منطقتك.' },
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
                    <img src={getImageUrl('services.design.hero.image', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop')} alt="bg" className="w-full h-full object-cover filter scale-110 opacity-60" />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                    <DynamicIcon name="support_agent" className="text-primary text-6xl mb-6" />
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {getContent('services.design.cta.title', 'هل حديقتك تحتاج إلى تصميم جديد؟')}
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        {getContent('services.design.cta.subtitle', 'تواصل معنا الآن للحصول على استشارة وعرض سعر.')}
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
