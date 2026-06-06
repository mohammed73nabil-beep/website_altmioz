import React, { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';
import GallerySection from '@/Components/GallerySection';
import Footer from '@/Components/Footer';

const SUB_SERVICES = [
    {
        slug: 'gypsum-board',
        title: 'جبس بورد',
        icon: 'architecture',
        desc: 'تركيب ديكورات جبس بورد وسمنت بورد للأسقف والجدران بتصاميم عصرية ومتينة.',
        color: '#D4AF37',
        details: [
            { icon: 'verified', label: 'أسقف معلقة بتصاميم مبتكرة' },
            { icon: 'layers', label: 'جدران جبسية بلمسات حديثة' },
            { icon: 'wb_shade', label: 'إضاءة مخفية وتكسيات داخلية' },
            { icon: 'construction', label: 'تركيب سمنت بورد مقاوم للرطوبة' },
        ]
    },
    {
        slug: 'alternative-marble',
        title: 'بديل الرخام',
        icon: 'layers',
        desc: 'أفخم تشطيبات بديل الرخام وبديل الشيبورد للجدران والمداخل، لمسة جمالية تدوم طويلاً.',
        color: '#C5A059',
        details: [
            { icon: 'verified', label: 'تشطيبات بديل رخام للجدران والأرضيات' },
            { icon: 'layers', label: 'بديل شيبورد للمداخل والواجهات' },
            { icon: 'wb_shade', label: 'ألوان وأنماط متعددة تحاكي الرخام الطبيعي' },
            { icon: 'construction', label: 'خامات عالية المتانة وسهلة التنظيف' },
        ]
    },
    {
        slug: 'alternative-wood',
        title: 'بديل الخشب',
        icon: 'forest',
        desc: 'ديكورات بديل الخشب وبديل الحجر للواجهات الداخلية والخارجية بلمسات مستوحاة من الطبيعة.',
        color: '#A0845C',
        details: [
            { icon: 'verified', label: 'بنلات بديل خشب للجدران والأسقف' },
            { icon: 'layers', label: 'تشطيبات بديل حجر للواجهات الداخلية' },
            { icon: 'wb_shade', label: 'مقاوم للحرارة والرطوبة والحشرات' },
            { icon: 'construction', label: 'خامات صديقة للبيئة وسهلة التركيب' },
        ]
    },
    {
        slug: 'wallpapers',
        title: 'ورق جدران',
        icon: 'wallpaper',
        desc: 'تركيب أحدث تشكيلات ورق الجدران وقواطع الجبس لتقسيم وتجميل المساحات بأسلوب عصري.',
        color: '#B09A70',
        details: [
            { icon: 'verified', label: 'أحدث تشكيلات ورق الجدران العالمية' },
            { icon: 'layers', label: 'قواطع جبس لتقسيم المساحات' },
            { icon: 'wb_shade', label: 'ورق جدران ثلاثي الأبعاد وطباعة خاصة' },
            { icon: 'construction', label: 'مقاوم للرطوبة وسهل التنظيف' },
        ]
    },
    {
        slug: 'foam-interior',
        title: 'فوم وتشطيبات',
        icon: 'chair',
        desc: 'أعمال الفوم، والتشطيب الداخلي الفاخر، وتفصيل أرفف غرف النوم وخزائن الملابس.',
        color: '#C9A227',
        details: [
            { icon: 'verified', label: 'تركيب فوم ديكوري للأسقف والجدران' },
            { icon: 'layers', label: 'تفصيل خزائن ملابس وأرفف غرف النوم' },
            { icon: 'wb_shade', label: 'تشطيب داخلي فاخر بأعلى المعايير' },
            { icon: 'construction', label: 'أعمال نجارة وتجليد بجودة احترافية' },
        ]
    },
];

export default function InteriorFinishes({ galleryImages = [], projects = [] }) {
    const { globalSettings } = usePage().props;
    const siteName = globalSettings?.site_name?.value || 'شركة مظلات التميز';
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [activeTab]);

    const active = SUB_SERVICES[activeTab];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-primary selection:text-slate-900" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <Head>
                <title>تشطيبات داخلية شاملة بالرياض – جبس بورد ورخام وخشب | {siteName}</title>
                <meta name="description" content="شركة مظلات التميز متخصصون في تركيب المظلات والسواتر والبرجولات بالرياض بأعلى جودة وأسعار تنافسية." />
                <meta property="og:title" content="خدمات شاملة | شركة مظلات التميز" />
                <meta property="og:description" content="شركة مظلات التميز – متخصصون في تركيب المظلات والسواتر والبرجولات بالرياض تحت سقف واحد." />
                <meta property="og:type" content="website" />
                <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet" />
                <link rel="canonical" href={window.location.href} />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "name": "تشطيبات داخلية",
                    "description": "تشطيبات داخلية شاملة: جبس بورد، بديل الرخام، بديل الخشب، ورق جدران، فوم بالرياض",
                    "provider": { "@type": "Organization", "name": "شركة مظلات التميز" },
                    "areaServed": "المملكة العربية السعودية",
                    "serviceType": "تشطيبات داخلية"
                })}</script>
                <style>{`
                    .hero-gradient { background-image: linear-gradient(180deg, rgba(11,31,58,0.5) 0%, rgba(11,31,58,0.95) 100%); }
                    .decoration-gradient { background-image: linear-gradient(135deg, #D4AF37 0%, #C5A059 100%); }
                    .tab-active { background: linear-gradient(135deg, #D4AF37 0%, #C5A059 100%); color: #0f172a; }
                    .tab-item { transition: all 0.3s ease; }
                `}</style>
            </Head>

            <Navbar />

            {/* ===== HERO ===== */}
            <section className="relative h-[65vh] min-h-[520px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="تشطيبات داخلية"
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=2070&auto=format&fit=crop"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-16">
                    <span className="inline-block py-1.5 px-6 rounded-full border border-primary/40 text-primary font-bold text-sm tracking-widest uppercase mb-6 backdrop-blur shadow-sm">
                        تشطيبات داخلية متكاملة
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-xl reveal opacity-0 translate-y-10 transition-all duration-1000">
                        تشطيبات داخلية
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light reveal opacity-0 translate-y-10 transition-all duration-1000 delay-100">
                        نوفر لك كل ما تحتاجه من تشطيبات داخلية فاخرة تحت سقف واحد — من الجبس والرخام إلى ورق الجدران والفوم
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 reveal opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                        <Link href={`${route('contact')}#contact-form-section`} className="decoration-gradient hover:brightness-110 text-slate-900 font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(201,162,39,0.3)] hover:-translate-y-1 text-lg flex items-center justify-center gap-2">
                            اطلب عرض السعر
                            <DynamicIcon name="request_quote" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== TABS NAV ===== */}
            <section className="sticky top-[56px] md:top-16 z-40 bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-white/10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
                        {SUB_SERVICES.map((srv, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveTab(idx)}
                                className={`tab-item flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap shrink-0 ${
                                    activeTab === idx
                                        ? 'tab-active shadow-md'
                                        : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                                }`}
                            >
                                <DynamicIcon name={srv.icon} className="text-base" />
                                {srv.title}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== ACTIVE SERVICE CONTENT ===== */}
            <section key={activeTab} className="py-20 bg-white dark:bg-surface-dark">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Text */}
                        <div className="w-full lg:w-1/2 reveal opacity-0 translate-y-10 transition-all duration-700">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${active.color}22` }}>
                                <DynamicIcon name={active.icon} className="text-3xl" style={{ color: active.color }} />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
                                {active.title}
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                                {active.desc}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {active.details.map((d, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-background-dark border border-gray-100 dark:border-white/5">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: `${active.color}22`, color: active.color }}>
                                            <DynamicIcon name={d.icon} className="text-xl" />
                                        </div>
                                        <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">{d.label}</span>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href={`${route('contact')}#contact-form-section`}
                                className="mt-10 inline-flex items-center gap-2 decoration-gradient text-slate-900 font-bold py-3.5 px-8 rounded-xl hover:-translate-y-1 transition-all duration-300 shadow-lg"
                            >
                                احصل على عرض سعر
                                <DynamicIcon name="arrow_forward" className="rotate-180" />
                            </Link>
                        </div>

                        {/* Image */}
                        <div className="w-full lg:w-1/2 reveal opacity-0 translate-y-10 transition-all duration-700 delay-200">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[480px]">
                                <img
                                    src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=2070&auto=format&fit=crop"
                                    alt={active.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-8 right-8 left-8">
                                    <div className="text-2xl font-bold text-white mb-1">{active.title}</div>
                                    <div className="text-primary font-bold">تشطيبات داخلية احترافية</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== ALL SERVICES OVERVIEW ===== */}
            <section className="py-24 bg-background-light dark:bg-background-dark border-t border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16 reveal opacity-0 translate-y-10 transition-all duration-700">
                        <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-4">خدماتنا الداخلية</span>
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white">كل تشطيباتك في مكان واحد</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {SUB_SERVICES.map((srv, idx) => (
                            <button
                                key={idx}
                                onClick={() => { setActiveTab(idx); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className={`reveal opacity-0 translate-y-10 transition-all duration-700 text-right p-6 rounded-2xl border hover:-translate-y-2 hover:shadow-xl cursor-pointer group ${
                                    activeTab === idx
                                        ? 'border-primary/50 bg-primary/5 dark:bg-primary/10'
                                        : 'border-gray-100 dark:border-white/5 bg-white dark:bg-surface-dark'
                                }`}
                                style={{ transitionDelay: `${idx * 80}ms` }}
                            >
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background: `${srv.color}22`, color: srv.color }}>
                                    <DynamicIcon name={srv.icon} className="text-2xl" />
                                </div>
                                <h3 className="font-black text-gray-900 dark:text-white text-lg mb-2">{srv.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">{srv.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== GALLERY ===== */}
            <GallerySection images={galleryImages} title="معرض أعمال التشطيبات الداخلية" />

            {/* ===== WHY US ===== */}
            <section className="py-24 bg-white dark:bg-[#040A12] border-t border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="reveal opacity-0 translate-y-10 transition-all duration-700 mb-16">
                        <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-4">لماذا تختارنا؟</span>
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white">نضمن لك الدقة والاحترافية</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: 'military_tech', title: 'خبرة طويلة', desc: 'سنوات من التميز والنجاح في تقديم خدمات التشطيب الداخلي.' },
                            { icon: 'payments', title: 'أسعار تنافسية', desc: 'نقدم أفضل العروض والأسعار بما يتناسب مع ميزانيتك.' },
                            { icon: 'model_training', title: 'دقة واحترافية', desc: 'نحرص على أدق التفاصيل لضمان تقديم عمل متقن.' },
                            { icon: 'schedule', title: 'التزام تام', desc: 'نحترم مواعيدنا ونلتزم بأعلى مستويات الجودة والتسليم.' },
                        ].map((item, idx) => (
                            <div key={idx} className="reveal opacity-0 translate-y-10 transition-all duration-700 bg-gray-50 dark:bg-surface-dark p-8 rounded-2xl border border-gray-100 dark:border-white/5 hover:-translate-y-2 hover:shadow-xl transition-all" style={{ transitionDelay: `${idx * 100}ms` }}>
                                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                                    <DynamicIcon name={item.icon} className="text-3xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== SEO RICH CONTENT SECTION ===== */}
            <section className="py-20 bg-gray-50 dark:bg-background-dark border-t border-gray-100 dark:border-white/5">
                <div className="max-w-5xl mx-auto px-4">

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 reveal opacity-0 translate-y-10 transition-all duration-700">
                        {[
                            { number: '+400', label: 'مشروع تشطيب منجز', icon: 'layers' },
                            { number: '+10', label: 'سنوات خبرة', icon: 'military_tech' },
                            { number: '5', label: 'خدمات تشطيب متكاملة', icon: 'verified' },
                            { number: '100%', label: 'رضا العملاء', icon: 'thumb_up' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-6 text-center border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-3xl md:text-4xl font-black text-primary mb-2">{stat.number}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-snug">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Long SEO Text Article */}
                    <article className="prose prose-lg max-w-none reveal opacity-0 translate-y-10 transition-all duration-700" dir="rtl">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">خدمات المظلات والسواتر بالرياض – شركة مظلات التميز</h2>
                        <p className="text-base leading-8 mb-6 text-gray-600 dark:text-gray-400">
                            تتخصص <strong className="text-gray-900 dark:text-white">شركة مظلات التميز</strong> في تقديم جميع خدمات التظليل والحماية تحت سقف واحد في الرياض والمملكة العربية السعودية. نوفر لعملائنا كل ما يحتاجونه من مظلات وسواتر وبرجولات وهناجر بأعلى جودة.
                        </p>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 mt-8">خدمات التشطيبات الداخلية الشاملة التي نقدمها</h3>
                        <ul className="space-y-3 mb-6">
                            {[
                                'تركيب جبس بورد وسمنت بورد للأسقف المعلقة والجدران بتصاميم مبتكرة',
                                'تركيب بديل الرخام (PVC) للجدران والمداخل',
                                'تركيب بديل الخشب (SPC) للبنلات والواجهات',
                                'تركيب ورق الجدران بأحدث التشكيلات العالمية',
                                'أعمال فوم ديكوري للأسقف والجدران',
                                'تفصيل خزائن ملابس وأرفف غرف النوم',
                                'قواطع جبس لتقسيم المساحات الداخلية',
                                'دهانات وتشطيبات داخلية بأجود أنواع الطلاء',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-base">
                                    <span className="text-primary text-xl mt-0.5">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 mt-8">لماذا شركة مظلات التميز هي الخيار الأمثل لخدمات التظليل؟</h3>
                        <p className="text-base leading-8 mb-4 text-gray-600 dark:text-gray-400">
                            ما يميز <strong className="text-gray-900 dark:text-white">شركة مظلات التميز</strong> هو تقديم جميع خدمات التظليل تحت سقف واحد، مما يوفر عليك عناء التعامل مع مقاولين متعددين. فريقنا متخصص في كل أعمال <strong className="text-gray-900 dark:text-white">المظلات والسواتر والبرجولات والهناجر</strong> وجميع أعمال التظليل. نلتزم بأعلى معايير الجودة ونستخدم أجود المواد الخام المعتمدة.
                        </p>
                    </article>

                    {/* FAQ Section */}
                    <div className="mt-16 reveal opacity-0 translate-y-10 transition-all duration-700">
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8 text-center">أسئلة شائعة حول خدمات التشطيبات الداخلية</h3>
                        <script type="application/ld+json">{JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                { "@type": "Question", "name": "ما هي الخدمات التي تقدمها شركة مظلات التميز؟", "acceptedAnswer": { "@type": "Answer", "text": "نقدم خدمات شاملة: مظلات سيارات، مظلات حدائق، سواتر، برجولات، هناجر، وبيوت شعر." } },
                                { "@type": "Question", "name": "كم تكلفة التشطيبات الداخلية بالرياض؟", "acceptedAnswer": { "@type": "Answer", "text": "تتفاوت الأسعار حسب نوع التشطيب والمساحة. نقدم أسعاراً تنافسية تناسب جميع الميزانيات. تواصل معنا للحصول على عرض سعر مجاني." } },
                                { "@type": "Question", "name": "ما هو جبس بورد وما هي استخداماته؟", "acceptedAnswer": { "@type": "Answer", "text": "جبس بورد هو مادة بناء خفيفة وسهلة التشكيل. يستخدم لعمل الأسقف المعلقة والقواطع والتكسيات الجدارية بتصاميم مبتكرة." } },
                                { "@type": "Question", "name": "هل تقدمون خدمة تفصيل خزائن الملابس؟", "acceptedAnswer": { "@type": "Answer", "text": "نعم، نقدم خدمة تفصيل خزائن الملابس وأرفف غرف النوم بتصاميم عصرية وأحجام مختلفة." } },
                            ]
                        })}</script>
                        <div className="space-y-4">
                            {[
                                { q: 'ما هي الخدمات التي تقدمها شركة مظلات التميز؟', a: 'نقدم خدمات شاملة: مظلات سيارات، مظلات حدائق، سواتر، برجولات، هناجر، وبيوت شعر.' },
                                { q: 'كم تكلفة التشطيبات الداخلية بالرياض؟', a: 'تتفاوت الأسعار حسب نوع التشطيب والمساحة. نقدم أسعاراً تنافسية تناسب جميع الميزانيات. تواصل معنا للحصول على عرض سعر مجاني.' },
                                { q: 'ما هو جبس بورد وما هي استخداماته؟', a: 'جبس بورد هو مادة بناء خفيفة وسهلة التشكيل. يستخدم لعمل الأسقف المعلقة والقواطع والتكسيات الجدارية بتصاميم مبتكرة.' },
                                { q: 'هل تقدمون خدمة تفصيل خزائن الملابس؟', a: 'نعم، نقدم خدمة تفصيل خزائن الملابس وأرفف غرف النوم بتصاميم عصرية وأحجام مختلفة.' },
                                { q: 'هل تقدمون تشطيبات للمكاتب والمحلات التجارية؟', a: 'نعم، نخدم القطاع التجاري بتشطيبات داخلية متكاملة تشمل المكاتب، المحلات، المطاعم، والمرافق العامة.' },
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

            {/* ===== CTA ===== */}
            <section className="relative py-28 text-center bg-background-dark overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=2070&auto=format&fit=crop" alt="bg" className="w-full h-full object-cover opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 reveal opacity-0 translate-y-10 transition-all duration-1000">
                    <DynamicIcon name="support_agent" className="text-primary text-6xl mb-6" />
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        هل تبحث عن تشطيبات داخلية احترافية؟
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر لمشروعك
                    </p>
                    <Link href={`${route('contact')}#contact-form-section`} className="inline-flex justify-center items-center gap-3 bg-primary hover:bg-white text-slate-900 font-bold text-xl py-5 px-10 rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(201,162,39,0.3)] hover:-translate-y-1">
                        اطلب عرض السعر
                        <DynamicIcon name="arrow_forward" className="rotate-180" />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
