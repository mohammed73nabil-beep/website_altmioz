import React, { useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';
import GallerySection from '@/Components/GallerySection';

export default function PortacabinsMaintenance({ projects = [], galleryImages = [] }) {
    const { globalSettings, pageContents = {}, pageContentExtras = {} } = usePage().props;
    const siteName = globalSettings?.site_name?.value || 'صيانة وفخامة الكرفانات والبركسات';

    // Helper function to get content by key
    const getContent = (key, defaultValue = '') => {
        return pageContents[key] ?? defaultValue;
    };


    // Helper function to get opacity
    const getOpacity = (key, defaultOpacity = 70) => {
        return pageContentExtras[key] ? parseInt(pageContentExtras[key]) : defaultOpacity;
    };

    // Helper function to get proper image URL
    const getImageUrl = (key, defaultValue) => {
        const value = pageContents[key];
        if (!value) return defaultValue;
        if (value.startsWith('http') || value.startsWith('/')) return value;
        return `/storage/${value}`;
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
        { title: getContent('services.portacabins.services.item1.title', 'تنفيذ المشاريع الجديدة'), icon: 'foundation', desc: getContent('services.portacabins.services.item1.desc', 'نصمم ونبني بركسات جديدة بمساحات وتصاميم مخصصة لتلبية احتياجات مشروعك الميداني بشكل مثالي.') },
        { title: getContent('services.portacabins.services.item2.title', 'الصيانة الشاملة'), icon: 'format_paint', desc: getContent('services.portacabins.services.item2.desc', 'صيانة وتجديد البركسات القديمة لتعود كالجديدة، مما يطيل عمرها الافتراضي ويوفر عليك التكاليف.') },
        { title: getContent('services.portacabins.services.item3.title', 'تحديث الأنظمة'), icon: 'plumbing', desc: getContent('services.portacabins.services.item3.desc', 'ترقية أنظمة الكهرباء، التكييف، والسباكة في البركسات بأحدث التقنيات لضمان الكفاءة والأمان.') },
        { title: getContent('services.portacabins.services.item4.title', 'تطوير العزل'), icon: 'dashboard', desc: getContent('services.portacabins.services.item4.desc', 'تحسين العزل الحراري بنظام البانل ساندوتش لضمان تحمل أقسى الظروف المناخية في الموقع.') }
    ];

    const steps = [
        { title: getContent('services.portacabins.process.step1.title', 'معاينة الموقع والبركس'), icon: 'location_on', desc: getContent('services.portacabins.process.step1.desc', 'زيارة الموقع لتقييم حالة البركس ومعرفة متطلبات الصيانة.') },
        { title: getContent('services.portacabins.process.step2.title', 'تحديد خطة العمل'), icon: 'architecture', desc: getContent('services.portacabins.process.step2.desc', 'رسم خطة تفصيلية للخطوات المطلوبة لضمان سير العمل بسلاسة.') },
        { title: getContent('services.portacabins.process.step3.title', 'التنفيذ والإصلاح'), icon: 'construction', desc: getContent('services.portacabins.process.step3.desc', 'استخدام أحدث الأدوات لتنفيذ أعمال الصيانة بدقة وسرعة.') },
        { title: getContent('services.portacabins.process.step4.title', 'التسليم والضمان'), icon: 'verified_user', desc: getContent('services.portacabins.process.step4.desc', 'تسليم البركس بعد التأكد من جودته مع توفير ضمان على الإصلاحات.') }
    ];

    const advantages = [
        { title: getContent('services.portacabins.why.item1.title', 'مواد عالية الجودة'), icon: 'diamond', desc: getContent('services.portacabins.why.item1.desc', 'نختار أفضل الخامات والمواد لضمان العمر الافتراضي الطويل.') },
        { title: getContent('services.portacabins.why.item2.title', 'حلول عملية ومبتكرة'), icon: 'lightbulb', desc: getContent('services.portacabins.why.item2.desc', 'نوفر تصاميم وحلول تتناسب مع مختلف مساحات واستخدامات البركسات.') },
        { title: getContent('services.portacabins.why.item3.title', 'دقة في الإنجاز'), icon: 'task_alt', desc: getContent('services.portacabins.why.item3.desc', 'نلتزم بأعلى معايير الدقة والجودة في كل مرحلة من مراحل العمل.') },
        { title: getContent('services.portacabins.why.item4.title', 'تغطية واسعة'), icon: 'public', desc: getContent('services.portacabins.why.item4.desc', 'نقدم خدماتنا في الرياض ومختلف المناطق المحيطة بكفاءة عالية.') }
    ];

    const portacabinProjects = projects.length > 0 ? projects.slice(0, 4) : [];

    return (
        <div className="bg-[#f8f7f6] dark:bg-[#071324] min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-[#C9A227] selection:text-[#0B1F3A]" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <Head>
                <title>{`صيانة البركسات - ${siteName}`}</title>
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
                        alt={getContent('services.portacabins.hero.title', 'صيانة وتجهيز البركسات')}
                        className="w-full h-full object-cover transform scale-105 animate-[pulse_20s_infinite_alternate]"
                        src={getImageUrl('services.portacabins.hero.image', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop')}
                    />
                    <div className="absolute inset-0 bg-[#0B1F3A]/30" style={{ opacity: getOpacity('services.portacabins.hero.image', 30) / 100 }}></div>
                    <div className="absolute inset-0 hero-gradient" style={{ opacity: Math.min((getOpacity('services.portacabins.hero.image', 30) + 40) / 100, 1) }}></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-20">
                    <span className="inline-block py-1.5 px-6 rounded-full border border-[#C9A227]/30 text-[#C9A227] font-bold text-sm tracking-widest uppercase mb-6 backdrop-blur shadow-sm">
                        {getContent('services.portacabins.hero.badge', 'تجهيز وتجديد')}
                    </span>
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-xl reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                        {getContent('services.portacabins.hero.title', 'صيانة البركسات')}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100">
                        {getContent('services.portacabins.hero.subtitle', 'نقدم خدمات متكاملة لصيانة وتجديد وتجهيز البركسات بأحدث المواصفات لتلبية كافة احتياجاتك.')}
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
            <GallerySection images={galleryImages} title="صور من أعمال البركسات" />

            {/* ABOUT SERVICE SECTION */}
            <section className="py-24 bg-white dark:bg-[#0B1F3A] relative z-20">
                <div className="max-w-7xl mx-auto px-4 text-center reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                    <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-4">{getContent('services.portacabins.services.badge', 'ماذا نقدم؟')}</span>
                    <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-8">{getContent('services.portacabins.services.title', 'خدمات صيانة البركسات')}</h2>

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
                    <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-4">{getContent('services.portacabins.process.badge', 'آلية العمل')}</span>
                    <h2 className="text-4xl font-black text-white mb-16">{getContent('services.portacabins.process.title', 'خطوات الصيانة خطوة بخطوة')}</h2>

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
                            <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-4">{getContent('services.portacabins.why.badge', 'لماذا نحن؟')}</span>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8">{getContent('services.portacabins.why.title', 'نضمن لك الجودة والسرعة في التنفيذ')}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                                {getContent('services.portacabins.why.desc', 'فريقنا المتميز يضع معايير الجودة نُصب عينيه، لضمان استلامك بركسك جاهزاً وكأنه جديد، بأفضل التقنيات الحديثة وأجود المواد الخام المتاحة.')}
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
                                <img src={getImageUrl('services.portacabins.why.image', 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')} alt="Why Choose Us" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/20 to-transparent"></div>
                                <div className="absolute bottom-10 right-10 left-10 text-white">
                                    <div className="text-3xl font-bold mb-2">حلول متكاملة</div>
                                    <div className="text-xl text-[#C9A227]">في صيانة وتأهيل البركسات</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECTS / GALLERY */}
            {portacabinProjects.length > 0 && (
                <section className="py-24 bg-[#f8f7f6] dark:bg-[#071324] border-t border-gray-100 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                            <div>
                                <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-3">معرض الأعمال</span>
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white">أحدث مشاريع صيانة البركسات</h2>
                            </div>
                            <Link href={route('our-projects.index')} className="gold-gradient text-[#0B1F3A] font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center gap-2">
                                عرض جميع مشاريعنا
                                <DynamicIcon name="arrow_forward" className="text-sm rotate-180" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                            {portacabinProjects.map((project, idx) => (
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
                                            {project.category ?? 'بركسات'}
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
                    <img src={getImageUrl('services.portacabins.hero.image', '/images/services/portacabins_bg.png')} alt="bg" className="w-full h-full object-cover filter scale-110 opacity-60" />
                    <div className="absolute inset-0 bg-[#0B1F3A]/40" style={{ opacity: getOpacity('services.portacabins.hero.image', 40) / 100 }}></div>
                    <div className="absolute inset-0 hero-gradient" style={{ opacity: Math.min((getOpacity('services.portacabins.hero.image', 40) + 40) / 100, 1) }}></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                    <DynamicIcon name="support_agent" className="text-[#C9A227] text-6xl mb-6" />
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {getContent('services.portacabins.cta.title', 'هل بركسك يحتاج إلى صيانة؟')}
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        {getContent('services.portacabins.cta.subtitle', 'تواصل معنا الآن للحصول على استشارة وعرض سعر.')}
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
