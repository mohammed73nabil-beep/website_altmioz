import React, { useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';

export default function ContactUs() {
    const { globalSettings, pageContents } = usePage().props;
    const siteName = globalSettings?.site_name?.value || 'صيانة وفخامة المقاولات';
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        client_name: '',
        phone: '',
        client_email: '',
        project_type: '',
        project_details: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/api/project-request', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
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

        return () => observer.disconnect();
    }, []);

    const scrollToForm = (e) => {
        e.preventDefault();
        document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-[#f8f7f6] dark:bg-[#071324] min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-[#C9A227] selection:text-[#0B1F3A]" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <Head>
                <title>{`اتصل بنا - ${siteName}`}</title>
                <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet" />

                <style>{`
                    .hero-gradient { background-image: linear-gradient(180deg, rgba(11,31,58,0.5) 0%, rgba(11,31,58,0.95) 100%); }
                    .gold-gradient { background-image: linear-gradient(135deg, #e3c059 0%, #C9A227 100%); }
                    .glass-card { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }
                    .map-filter { filter: grayscale(100%) invert(92%) hue-rotate(180deg) brightness(85%) contrast(120%); }
                    .dark .map-filter { filter: grayscale(100%) invert(92%) hue-rotate(180deg) brightness(85%) contrast(120%); }
                    select { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23C9A227' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e"); background-position: left 1rem center; background-repeat: no-repeat; background-size: 1.5em 1.5em; padding-left: 2.5rem; }
                `}</style>
            </Head>

            <Navbar />

            {/* 1) HERO SECTION */}
            <section className="relative h-[65vh] min-h-[550px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="تواصل معنا - مشروع صيانة"
                        className="w-full h-full object-cover transform scale-105 animate-[pulse_30s_infinite_alternate]"
                        src={pageContents?.['contact.header.image'] ? (pageContents['contact.header.image'].startsWith('http') ? pageContents['contact.header.image'] : `/storage/${pageContents['contact.header.image']}`) : "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"}
                    />
                    <div className="absolute inset-0 bg-[#0B1F3A]/60 mix-blend-multiply"></div>
                    <div className="absolute inset-0 hero-gradient"></div>
                </div>

                <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center mt-20">
                    <span className="inline-block py-1.5 px-6 rounded-full border border-[#C9A227]/40 text-[#C9A227] font-bold text-sm tracking-widest uppercase mb-6 backdrop-blur-sm reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                        الدعم والاستشارات
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-100">
                        {pageContents?.['contact.header.title'] || 'تواصل معنا'}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed font-light reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                        {pageContents?.['contact.header.subtitle'] || 'نحن هنا لخدمتك والإجابة على جميع استفساراتك بكل احترافية وشفافية.'}
                    </p>
                    <div className="reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300">
                        <a href="#contact-form-section" onClick={scrollToForm} className="gold-gradient hover:brightness-110 text-[#0B1F3A] font-black text-xl py-4 px-12 rounded-xl transition-all duration-300 shadow-[0_10px_30px_rgba(201,162,39,0.3)] hover:-translate-y-1 inline-flex items-center gap-3">
                            اطلب عرض سعر
                            <DynamicIcon name="arrow_forward" className="rotate-90" />
                        </a>
                    </div>
                </div>
            </section>

            {/* 2) CONTACT INFORMATION SECTION */}
            <section className="relative py-24 bg-white dark:bg-[#040A12] z-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transform -mt-40 relative z-30">
                        {/* Address */}
                        <div className="bg-white dark:bg-[#0B1F3A] p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-2xl border border-gray-100 dark:border-white/5 hover:-translate-y-2 transition-transform duration-500 text-center group reveal-on-scroll opacity-0 translate-y-10">
                            <div className="w-20 h-20 rounded-full bg-[#f8f7f6] dark:bg-[#071324] flex items-center justify-center text-[#C9A227] mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 border border-gray-100 dark:border-white/5">
                                <DynamicIcon name="location_on" className="text-4xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">المقر الرئيسي</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                المنطقة الصناعية<br />الرياض، المملكة العربية السعودية
                            </p>
                        </div>

                        {/* Phone */}
                        <div className="bg-white dark:bg-[#0B1F3A] p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-2xl border border-gray-100 dark:border-white/5 hover:-translate-y-2 transition-transform duration-500 text-center group reveal-on-scroll opacity-0 translate-y-10 delay-100">
                            <div className="w-20 h-20 rounded-full bg-[#f8f7f6] dark:bg-[#071324] flex items-center justify-center text-[#C9A227] mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 border border-gray-100 dark:border-white/5">
                                <DynamicIcon name="call" className="text-4xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">أرقام التواصل</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2" dir="ltr" style={{ textAlign: "center" }}>
                                {globalSettings?.contact_phone?.value || '+966 50 123 4567'}
                            </p>
                        </div>

                        {/* Email & Hours */}
                        <div className="bg-white dark:bg-[#0B1F3A] p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-2xl border border-gray-100 dark:border-white/5 hover:-translate-y-2 transition-transform duration-500 text-center group reveal-on-scroll opacity-0 translate-y-10 delay-200">
                            <div className="w-20 h-20 rounded-full bg-[#f8f7f6] dark:bg-[#071324] flex items-center justify-center text-[#C9A227] mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 border border-gray-100 dark:border-white/5">
                                <DynamicIcon name="mail" className="text-4xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">التواصل الرقمي</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                                {globalSettings?.contact_email?.value || 'info@company.com'}
                            </p>
                            <p className="text-sm font-bold text-[#C9A227] mt-4">
                                {globalSettings?.working_hours?.value || 'يومياً: 8:00 ص - 6:00 م'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3) CONTACT FORM & 5) TRUST FEATURES (Split Section) */}
            <section id="contact-form-section" className="py-24 bg-[#f8f7f6] dark:bg-[#071324] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#C9A227]/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                        <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-3">نموذج الطلبات</span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">ارسل تفاصيل مشروعك</h2>
                        <div className="w-24 h-1 gold-gradient mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch border border-gray-200 dark:border-white/10 rounded-[40px] overflow-hidden shadow-2xl bg-white dark:bg-[#0B1F3A]">
                        {/* Right: Form */}
                        <div className="w-full lg:w-3/5 p-10 lg:p-14 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                            {recentlySuccessful && (
                                <div className="mb-8 bg-[#C9A227]/10 border-r-4 border-[#C9A227] text-gray-900 dark:text-white p-6 rounded-lg flex items-center gap-4">
                                    <DynamicIcon name="check_circle" className="text-[#C9A227] text-3xl" />
                                    <div>
                                        <h4 className="font-bold text-lg">تم إرسال طلبك بنجاح!</h4>
                                        <p className="text-sm opacity-80 mt-1">سيقوم فريقنا بمراجعة التفاصيل والتواصل معك في أقرب وقت.</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="relative group/input">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الاسم الكامل</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#C9A227]">
                                                <DynamicIcon name="person" />
                                            </div>
                                            <input
                                                type="text"
                                                className={`w-full bg-gray-50 dark:bg-[#071324] border ${errors.client_name ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} rounded-xl py-4 pr-12 pl-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-all`}
                                                placeholder="أدخل اسمك الكريم"
                                                value={data.client_name}
                                                onChange={e => setData('client_name', e.target.value)}
                                            />
                                        </div>
                                        {errors.client_name && <p className="text-red-500 text-xs mt-2 font-bold">{errors.client_name}</p>}
                                    </div>

                                    <div className="relative group/input">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">رقم الجوال</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#C9A227]">
                                                <DynamicIcon name="phone_iphone" />
                                            </div>
                                            <input
                                                type="tel"
                                                className={`w-full bg-gray-50 dark:bg-[#071324] border border-gray-200 dark:border-white/10 rounded-xl py-4 pr-12 pl-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-all`}
                                                placeholder="مثال: 0501234567"
                                                value={data.phone}
                                                onChange={e => setData('phone', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="relative group/input">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#C9A227]">
                                                <DynamicIcon name="mail" />
                                            </div>
                                            <input
                                                type="email"
                                                className={`w-full bg-gray-50 dark:bg-[#071324] border ${errors.client_email ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} rounded-xl py-4 pr-12 pl-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-all`}
                                                placeholder="example@email.com"
                                                value={data.client_email}
                                                onChange={e => setData('client_email', e.target.value)}
                                            />
                                        </div>
                                        {errors.client_email && <p className="text-red-500 text-xs mt-2 font-bold">{errors.client_email}</p>}
                                    </div>

                                    <div className="relative group/input">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">نوع الخدمة المرجوة</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#C9A227] z-10">
                                                <DynamicIcon name="design_services" />
                                            </div>
                                            <select
                                                className={`w-full bg-gray-50 dark:bg-[#071324] border ${errors.project_type ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} rounded-xl py-4 pr-12 pl-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-all appearance-none relative z-0`}
                                                value={data.project_type}
                                                onChange={e => setData('project_type', e.target.value)}
                                            >
                                                <option value="" disabled>اختر القسم المناسب...</option>
                                                <option value="صيانة المباني">صيانة المباني</option>
                                                <option value="تركيب الكرفانات">تركيب الكرفانات</option>
                                                <option value="تنفيذ البركسات">تنفيذ البركسات (بورتبن)</option>
                                                <option value="أعمال الترميم">أعمال الترميم</option>
                                                <option value="أعمال العزل">أعمال العزل الحراري والمائي</option>
                                                <option value="خدمات أخرى">صيانة أخرى (سباكة/كهرباء)</option>
                                            </select>
                                        </div>
                                        {errors.project_type && <p className="text-red-500 text-xs mt-2 font-bold">{errors.project_type}</p>}
                                    </div>
                                </div>

                                <div className="relative group/input">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">رسالتك بالتفصيل</label>
                                    <div className="relative">
                                        <div className="absolute top-4 right-4 flex items-center pointer-events-none text-[#C9A227]">
                                            <DynamicIcon name="rate_review" />
                                        </div>
                                        <textarea
                                            className={`w-full bg-gray-50 dark:bg-[#071324] border ${errors.project_details ? 'border-red-500' : 'border-gray-200 dark:border-white/10'} rounded-xl py-4 pr-12 pl-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-all resize-none min-h-[160px]`}
                                            placeholder="اكتب تفاصيل طلبك والمساحة التقريبية وأي متطلبات خاصة..."
                                            value={data.project_details}
                                            onChange={e => setData('project_details', e.target.value)}
                                        ></textarea>
                                    </div>
                                    {errors.project_details && <p className="text-red-500 text-xs mt-2 font-bold">{errors.project_details}</p>}
                                </div>

                                <div>
                                    <button
                                        disabled={processing}
                                        className="w-full xl:w-auto gold-gradient text-[#0B1F3A] font-black py-5 px-14 rounded-xl shadow-[0_10px_25px_rgba(201,162,39,0.3)] hover:shadow-[0_15px_35px_rgba(201,162,39,0.5)] transition-all hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-70"
                                        type="submit"
                                    >
                                        {processing ? 'جاري التنفيذ...' : 'إرسـال الطـلـب'}
                                        {!processing && <DynamicIcon name="send" />}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Left: Image & Features */}
                        <div className="w-full lg:w-2/5 relative min-h-[500px] hidden md:block reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" alt="مشروع هندسي" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-[#0B1F3A]/80 mix-blend-multiply"></div>
                            <div className="absolute inset-0 p-12 flex flex-col justify-center">
                                <h3 className="text-3xl font-black text-white mb-10">لماذا تثق بخدماتنا؟</h3>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#C9A227]/20 flex items-center justify-center text-[#C9A227] shrink-0 border border-[#C9A227]/30">
                                            <DynamicIcon name="speed" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-1">استجابة سريعة</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">فريقنا جاهز للرد على طلباتك ومعاينة الموقع في أسرع وقت ممكن.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#C9A227]/20 flex items-center justify-center text-[#C9A227] shrink-0 border border-[#C9A227]/30">
                                            <DynamicIcon name="engineering" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-1">طاقم محترف</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">مهندسون ذوو خبرة وكفاءة عالية لضمان تنفيذ أدق التفاصيل باحترافية.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#C9A227]/20 flex items-center justify-center text-[#C9A227] shrink-0 border border-[#C9A227]/30">
                                            <DynamicIcon name="verified" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-1">ضمان الجودة</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">تقديم شهادات ضمان على مواد العزل وجميع أعمال الصيانة والتنفيذ.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#C9A227]/20 flex items-center justify-center text-[#C9A227] shrink-0 border border-[#C9A227]/30">
                                            <DynamicIcon name="support_agent" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-1">دعم على مدار الساعة</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">خدمات عملاء 24/7 للحالات الطارئة ومتابعة ما بعد التسليم.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4) GOOGLE MAP SECTION */}
            <section className="h-[500px] relative w-full reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                <iframe
                    allowFullScreen=""
                    className="w-full h-full border-0 map-filter"
                    loading="lazy"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115858.74542289136!2d46.74542491114251!3d24.843632970425785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2efb0d3eef8515%3A0xe511082fc1a2a46a!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2sae!4v1620000000000!5m2!1sen!2sae"
                    title="موقع الشركة"
                ></iframe>
                <div className="absolute inset-0 bg-[#0B1F3A]/10 pointer-events-none mix-blend-overlay"></div>

                <div className="absolute bottom-10 left-10 lg:left-20 bg-white/95 dark:bg-[#0B1F3A]/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-100 dark:border-[#C9A227]/30 max-w-xs">
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">تفضل بزيارتنا</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">يسعدنا استقبالكم في مقرنا لمناقشة تطلعاتكم وعرض نماذج أعمالنا على أرض الواقع.</p>
                </div>
            </section>

            {/* 6) STRONG CALL TO ACTION SECTION */}
            <section className="relative py-32 text-center bg-[#071324] overflow-hidden border-t-2 border-[#C9A227]">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" alt="cta bg" className="w-full h-full object-cover filter blur-md scale-110 opacity-30" />
                    <div className="absolute inset-0 bg-[#0B1F3A]/95 mix-blend-normal"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                    <DynamicIcon name="workspace_premium" className="text-[#C9A227] text-7xl mb-6" />
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                        هل تحتاج إلى صيانة عاجلة؟<br />فريقنا جاهز لخدمتك
                    </h2>
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        لا تتردد في الاتصال بنا للحصول على حلول فورية ومضمونة لجميع متطلبات الصيانة والمقاولات.
                    </p>
                    <a href={`tel:${globalSettings?.contact_phone?.value || '+966557781008'}`} className="inline-flex items-center justify-center gap-4 gold-gradient hover:bg-white text-[#0B1F3A] font-black text-2xl py-6 px-16 rounded-2xl transition-all duration-300 shadow-[0_15px_40px_rgba(201,162,39,0.4)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(201,162,39,0.6)] w-full sm:w-auto">
                        <DynamicIcon name="call" className="text-3xl" />
                        <span>اتصل الآن</span>
                    </a>
                </div>
            </section>

            {/* Simple Footer Placeholder */}
            <footer className="bg-[#040A12] py-8 border-t border-white/5 relative z-20">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-2xl font-black text-white">{globalSettings?.site_name?.value || 'صيانة وفخامة'}</div>
                    <p className="text-sm text-gray-500">نظام صيانة الكرفانات والبركسات © {new Date().getFullYear()} — صُمِّم بواسطة <a href="https://wa.me/967781582995" target="_blank" rel="noopener noreferrer" className="text-[#C9A227] font-bold hover:underline">شركة Aboras Soft</a></p>
                </div>
            </footer>
        </div>
    );
}
