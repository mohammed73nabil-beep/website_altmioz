import React, { useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';
import GallerySection from '@/Components/GallerySection';
import Footer from '@/Components/Footer';

export default function ArtificialGrassService({ projects = [], galleryImages = [] }) {
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
        { title: getContent('services.artificial_grass.services.item1.title', 'العشب الجداري'), icon: 'eco', desc: getContent('services.artificial_grass.services.item1.desc', 'تركيب بديل الرخام الجداري بلمسات فنية تضفي جمالاً على الجدران.') },
        { title: getContent('services.artificial_grass.services.item2.title', 'عشب الملاعب'), icon: 'sports_soccer', desc: getContent('services.artificial_grass.services.item2.desc', 'توريد وتركيب بديل الرخام الخاص بالملاعب الرياضية بمواصفات الفيفا.') },
        { title: getContent('services.artificial_grass.services.item3.title', 'عشب الديكورات'), icon: 'grass', desc: getContent('services.artificial_grass.services.item3.desc', 'تركيب أجود أنواع بديل الرخام للديكورات المنزلية والعامة بكثافات مختلفة.') },
        { title: getContent('services.artificial_grass.services.item4.title', 'صيانة العشب'), icon: 'cleaning_services', desc: getContent('services.artificial_grass.services.item4.desc', 'خدمات تمشيط وتنظيف وصيانة بديل الرخام ليحافظ على رونقه وجماله.') }
    ];


    const advantages = [
        { title: getContent('services.artificial_grass.why.item1.title', 'جودة عالمية'), icon: 'diamond', desc: getContent('services.artificial_grass.why.item1.desc', 'نستخدم أنواع بديل الرخام والخشب عالية الجودة تتحمل درجات الحرارة العالية والأشعة فوق البنفسجية.') },
        { title: getContent('services.artificial_grass.why.item2.title', 'ضمان طويل'), icon: 'security', desc: getContent('services.artificial_grass.why.item2.desc', 'نقدم ضمانات تصل إلى 7 سنوات على بديل الرخام ضد تغير اللون أو تساقط الشعيرات.') },
        { title: getContent('services.artificial_grass.why.item3.title', 'توفير المياه'), icon: 'water_drop', desc: getContent('services.artificial_grass.why.item3.desc', 'يساعد بديل الرخام على توفير استهلاك المياه والوقت المستغرق في العناية والقص.') },
        { title: getContent('services.artificial_grass.why.item4.title', 'مظهر طبيعي'), icon: 'park', desc: getContent('services.artificial_grass.why.item4.desc', 'يتميز العشب بمظهره الطبيعي وملمسه الناعم الذي يشبه العشب الطبيعي تماماً.') }
    ];

    const grassProjects = projects.length > 0 ? projects.slice(0, 4) : [];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-primary selection:text-slate-900" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <Head>
                <title>{`بديل الرخام والخشب للديكور بالرياض – توريد وتركيب احترافي | ${siteName}`}</title>
                <meta name="description" content="شركة مظلات التميز متخصصون في تركيب المظلات والسواتر والبرجولات بالرياض بضمان يصل إلى 10 سنوات وأسعار تنافسية." />
                <meta name="keywords" content="بديل الرخام، بديل الخشب، تركيب بديل رخام، بديل شيبورد، ديكور بديل رخام، بديل رخام للجدران، بديل خشب للواجهات، بديل رخام الرياض" />
                <meta property="og:title" content={`بديل الرخام وبديل الخشب للديكور | ${siteName}`} />
                <meta property="og:description" content="شركة مظلات التميز – تركيب المظلات والسواتر بضمان 10 سنوات في الرياض." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={window.location.href} />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "name": "تركيب بديل الرخام وبديل الخشب",
                    "description": "توريد وتركيب بديل الرخام وبديل الخشب للديكورات الداخلية والخارجية في الرياض",
                    "provider": { "@type": "Organization", "name": "شركة مظلات التميز" },
                    "areaServed": "المملكة العربية السعودية",
                    "serviceType": "بديل الرخام وبديل الخشب",
                    "offers": { "@type": "Offer", "description": "ضمان 7 سنوات على بديل الرخام" }
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
                        alt={getContent('services.artificial_grass.hero.title', 'تركيب بديل الرخام')}
                        className="w-full h-full object-cover"
                        src={getImageUrl('services.artificial_grass.hero.image', 'https://images.unsplash.com/photo-1594922119159-4d22edfa5041?q=80&w=2070&auto=format&fit=crop')}
                        fetchpriority="high"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-20">
                    <span className="inline-block py-1.5 px-6 rounded-full border border-primary/30 text-primary font-bold text-sm tracking-widest uppercase mb-6 backdrop-blur shadow-sm">
                        {getContent('services.artificial_grass.hero.badge', 'توريد وتركيب')}
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-xl reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                        {getContent('services.artificial_grass.hero.title', 'بديل الرخام')}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100">
                        {getContent('services.artificial_grass.hero.subtitle', 'نقدم خدمات توريد وتركيب بديل الرخام للديكورات والملاعب والجدران بأعلى المواصفات والضمانات.')}
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
            <GallerySection images={galleryImages} title="صور من أعمال بديل الرخام" />

            {/* ABOUT SERVICE SECTION */}
            <section className="py-24 bg-white dark:bg-surface-dark relative z-20">
                <div className="max-w-7xl mx-auto px-4 text-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                    <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-4">{getContent('services.artificial_grass.services.badge', 'ماذا نقدم؟')}</span>
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-8">{getContent('services.artificial_grass.services.title', 'خدمات بديل الرخام')}</h2>

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
                            <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-4">{getContent('services.artificial_grass.why.badge', 'لماذا نحن؟')}</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8">{getContent('services.artificial_grass.why.title', 'نضمن لك الجودة والسرعة في التنفيذ')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                                {getContent('services.artificial_grass.why.desc', 'نستخدم أحدث التقنيات وأفضل أنواع بديل الرخام المعتمد عالمياً لنمنحك حديقة خضراء طوال العام دون الحاجة لعناء الري والصيانة الدورية.')}
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
                                <img src={getImageUrl('services.artificial_grass.why.image', 'https://images.unsplash.com/photo-1594922119159-4d22edfa5041?q=80&w=2070&auto=format&fit=crop')} alt="Why Choose Us" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/90 via-[#0B1120]/20 to-transparent"></div>
                                <div className="absolute bottom-10 right-10 left-10 text-white">
                                    <div className="text-3xl font-bold mb-2">أكثر من 10 سنوات خبرة</div>
                                    <div className="text-xl text-primary">في تركيب بديل الرخام</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECTS / GALLERY */}
            {grassProjects.length > 0 && (
                <section className="py-24 bg-background-light dark:bg-background-dark border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <div>
                                <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-3">معرض الأعمال</span>
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white">أحدث مشاريع بديل الرخام</h2>
                            </div>
                            <Link href={route('our-projects.index')} className="decoration-gradient text-slate-900 font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center gap-2">
                                عرض جميع مشاريعنا
                                <DynamicIcon name="arrow_forward" className="text-sm rotate-180" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                            {grassProjects.map((project, idx) => (
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
                                            {project.category ?? 'بديل الرخام والخشب'}
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
                            { number: '+200', label: 'مشروع بديل رخام منجز', icon: 'layers' },
                            { number: '7', label: 'سنوات ضمان', icon: 'security' },
                            { number: '+10', label: 'سنوات خبرة في الرياض', icon: 'military_tech' },
                            { number: '100%', label: 'رضا العملاء', icon: 'thumb_up' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-6 text-center border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-3xl md:text-4xl font-black text-primary mb-2">{stat.number}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-snug">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Long SEO Text Article */}
                    <article className="prose prose-lg max-w-none reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700" dir="rtl">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">خدمات التظليل بالرياض – شركة مظلات التميز</h2>
                        <p className="text-base leading-8 mb-6 text-gray-600 dark:text-gray-400">
                            تمتلك <strong className="text-gray-900 dark:text-white">شركة مظلات التميز</strong> خبرة واسعة في تركيب <strong className="text-gray-900 dark:text-white">المظلات والسواتر والبرجولات</strong> وجميع أعمال التظليل في الرياض والمملكة العربية السعودية بضمانات حقيقية.
                        </p>
                        <p className="text-base leading-8 mb-6 text-gray-600 dark:text-gray-400">
                            بديل الرخام متعدد الاستخدامات: يثالق على <strong className="text-gray-900 dark:text-white">جدران المنازل والمكاتب والمطاعم</strong>، ويستخدم للأرضيات والمداخل والواجهات الداخلية والخارجية. نستخدم أجود الأنواع المعتمدة عالمياً التي تتحمل درجات الحرارة العالية والأشعة فوق البنفسجية.
                        </p>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 mt-8">خدمات بديل الرخام وبديل الخشب التي نقدمها</h3>
                        <ul className="space-y-3 mb-6">
                            {[
                                'تركيب بديل الرخام (PVC) للجدران والمداخل الداخلية',
                                'تركيب بديل الخشب للبنلات والأسقف الداخلية',
                                'تركيب بديل الشيبورد للواجهات والمداخل الخارجية',
                                'تركيب بديل الحجر للواجهات الداخلية والخارجية',
                                'ألوان وأنماط متعددة تحاكي الرخام والخشب الطبيعي',
                                'خامات عالية المتانة سهلة التنظيف ومقاومة الرطوبة',
                                'ضمان يصل إلى 7 سنوات على المواد والتركيب',
                                'خدمات صيانة وتنظيف بديل الرخام بعد التركيب',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-base">
                                    <span className="text-primary text-xl mt-0.5">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 mt-8">مزايا بديل الرخام وبديل الخشب</h3>
                        <p className="text-base leading-8 mb-4 text-gray-600 dark:text-gray-400">
                            تمتاز شركة مظلات التميز بتقديم أجود مواد التظليل المعتمدة عالمياً بضمان يصل إلى 10 سنوات.
                        </p>
                    </article>

                    {/* FAQ Section */}
                    <div className="mt-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8 text-center">أسئلة شائعة حول بديل الرخام وبديل الخشب</h3>
                        <script type="application/ld+json">{JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                { "@type": "Question", "name": "ما هو بديل الرخام وما هي استخداماته؟", "acceptedAnswer": { "@type": "Answer", "text": "بديل الرخام هو مادة ديكورية تحاكي شكل ومظهر الرخام الطبيعي بتكلفة أقل. يستخدم لتكسية الجدران، الأرضيات، المداخل، والواجهات الداخلية والخارجية." } },
                                { "@type": "Question", "name": "كم مدة ضمان بديل الرخام؟", "acceptedAnswer": { "@type": "Answer", "text": "نقدم ضماناة تصل إلى 7 سنوات على بديل الرخام ضد تغير اللون والتآكل. ضماننا حقيقي يغطي جودة المواد والتركيب." } },
                                { "@type": "Question", "name": "ما الفرق بين بديل الرخام وبديل الخشب؟", "acceptedAnswer": { "@type": "Answer", "text": "بديل الرخام (PVC) يحاكي مظهر الرخام ويستخدم للجدران والمداخل، بينما بديل الخشب يحاكي مظهر الخشب ويستخدم للبنلات والأسقف والواجهات." } },
                                { "@type": "Question", "name": "هل يناسب بديل الرخام للاستخدام الخارجي؟", "acceptedAnswer": { "@type": "Answer", "text": "نعم، نوفر أنواع بديل رخام وبديل خشب مقاومة للعوامل المناخية ومناسبة للاستخدام الداخلي والخارجي." } },
                            ]
                        })}</script>
                        <div className="space-y-4">
                            {[
                                { q: 'ما هو بديل الرخام وما هي استخداماته؟', a: 'بديل الرخام هو مادة ديكورية تحاكي شكل ومظهر الرخام الطبيعي بتكلفة أقل. يستخدم لتكسية الجدران، الأرضيات، المداخل، والواجهات.' },
                                { q: 'كم مدة ضمان بديل الرخام؟', a: 'نقدم ضمانات تصل إلى 7 سنوات على بديل الرخام ضد تغير اللون والتآكل. ضماننا حقيقي يغطي جودة المواد والتركيب.' },
                                { q: 'ما الفرق بين بديل الرخام وبديل الخشب؟', a: 'بديل الرخام (PVC) يحاكي مظهر الرخام ويستخدم للجدران والمداخل، بينما بديل الخشب يحاكي مظهر الخشب ويستخدم للبنلات والأسقف.' },
                                { q: 'هل يناسب بديل الرخام للاستخدام الخارجي؟', a: 'نعم، نوفر أنواع بديل رخام وبديل خشب مقاومة للعوامل المناخية مناسبة للاستخدام الداخلي والخارجي.' },
                                { q: 'كم تكلفة تركيب بديل الرخام بالرياض؟', a: 'تختلف الأسعار حسب نوع المادة والمساحة. تواصل معنا للحصول على عرض سعر مجاني وتفصيلي.' },
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
                    <img src={getImageUrl('services.artificial_grass.hero.image', 'https://images.unsplash.com/photo-1594922119159-4d22edfa5041?q=80&w=2070&auto=format&fit=crop')} alt="bg" className="w-full h-full object-cover filter scale-110 opacity-60" />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                    <DynamicIcon name="support_agent" className="text-primary text-6xl mb-6" />
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {getContent('services.artificial_grass.cta.title', 'هل ترغب في تركيب بديل الرخام والخشب لحديقتك؟')}
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        {getContent('services.artificial_grass.cta.subtitle', 'تواصل معنا الآن للحصول على استشارة وعرض سعر.')}
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
