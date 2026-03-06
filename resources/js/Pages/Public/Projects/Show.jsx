import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import DynamicIcon from '@/Components/DynamicIcon';

export default function ProjectShow({ project, relatedProjects = [] }) {
    // Generate realistic mocked project info based on the instructions
    const mockDetails = {
        duration: '45 يوم عمل',
        area: '120 متر مربع',
        materials: ['ساندوتش بانل عازل 10سم', 'أرضيات باركيه ألماني', 'نظام إضاءة ذكي LED', 'عوازل صوتية وحرارية'],
        challenges: 'العمل في ظروف مناخية صعبة مع ضرورة إنهاء الهيكل قبل موسم الأمطار، بالإضافة إلى تصميم داخلي يتطلب استخدام مساحات ضيقة بكفاءة.',
        solutions: 'استخدام وحدات مسبقة الصنع لتقليل وقت التركيب في الموقع بنسبة 40%، وتصميم أثاث قابل للطي للحد الأقصى من استغلال المساحة.'
    };

    // Images for gallery
    const mainImg = project.image_path ? `/storage/${project.image_path}` : (project.image_url?.startsWith('http') ? project.image_url : `/storage/${project.image_url}`);

    // Fake a secondary image for before/after if none exists
    const beforeImg = "https://lh3.googleusercontent.com/aida-public/AB6AXuC9VU744Jq6xYpxUhQ4MzbeFvSLMiuEOiNQjCpYicpelFUp1R7esi4j3OLd26TK8tgtwVL7y22wIrs8wsldM-VQAfM7XtGqg4yNEM0Ty8shT8LUSUTMIKNnTH5CaUgg-Qg09ySnvOhGlJ6mHzAlqrgBDOTAWjWSYKem5NKb_OWsxeoa273DboegaHpfe1sdJiv-lAsoxJQDejekvoh-mNzeBhcEOBLE_z851gU3BxIoZDQgWlBZDtxiu1Qicl4s3V_9aDiMXATkQLn6";
    const afterImg = mainImg;

    const [sliderValue, setSliderValue] = useState(50);

    return (
        <div className="bg-[#f8f7f6] dark:bg-[#071324] min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-[#C9A227] selection:text-[#0B1F3A]" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <Head>
                <title>{`${project.title || project.title_ar} - مشاريعنا`}</title>
                <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet" />

                <style>{`
                    .hero-gradient { background-image: linear-gradient(0deg, rgba(7,19,36,1) 0%, rgba(7,19,36,0.4) 50%, rgba(7,19,36,0.8) 100%); }
                    .gold-gradient { background-image: linear-gradient(135deg, #e3c059 0%, #C9A227 100%); }
                    
                    /* Custom Before/After Slider Range Input styling */
                    input[type=range]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        height: 40px; width: 40px;
                        border-radius: 50%;
                        background: #C9A227;
                        cursor: ew-resize;
                        box-shadow: 0 0 0 4px rgba(255,255,255,0.8);
                        border: none;
                        background-image: url('data:image/svg+xml;utf8,<svg fill="%230B1F3A" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 14V10L4 12L8 14ZM16 10V14L20 12L16 10Z"/></svg>');
                        background-position: center; background-repeat: no-repeat;
                    }
                `}</style>
            </Head>

            <Navbar />

            {/* 1) PROJECT HERO */}
            <section className="relative h-[70vh] min-h-[500px] flex items-end pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img alt={project.title} className="w-full h-full object-cover" src={mainImg} />
                    <div className="absolute inset-0 bg-[#0B1F3A]/40 mix-blend-multiply"></div>
                    <div className="absolute inset-0 hero-gradient"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                    <Link href={route('our-projects.index')} className="inline-flex items-center gap-2 text-white/70 hover:text-[#C9A227] mb-6 transition-colors text-sm font-bold tracking-wider uppercase backdrop-blur-sm bg-black/20 py-2 px-4 rounded-full w-fit">
                        <DynamicIcon name="arrow_forward" className="text-sm" />
                        العودة للمشاريع
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-3xl">
                            <span className="text-[#C9A227] font-bold text-sm tracking-wider uppercase mb-3 block drop-shadow-md">
                                {project.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight drop-shadow-lg mb-4">
                                {project.title || project.title_ar}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 mt-6">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <DynamicIcon name="location_on" className="text-[#C9A227]" />
                                    <span className="font-medium">المملكة العربية السعودية</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <DynamicIcon name="calendar_month" className="text-[#C9A227]" />
                                    <span className="font-medium">تاريخ التسليم: {new Date(project.created_at).getFullYear()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <section className="py-20 bg-white dark:bg-[#071324] relative">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                        {/* LEFT COLUMN: ABOUT PROJECT & COMPARISON */}
                        <div className="lg:col-span-2 space-y-16">

                            {/* Project Overview */}
                            <div>
                                <h2 className="text-3xl font-bold border-b-2 border-[#C9A227] inline-block pb-3 pr-2 mb-8 text-[#0B1F3A] dark:text-white">نظرة عامة على المشروع</h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300 leading-loose text-justify relative z-10">
                                    {project.description || project.description_ar || 'تم تنفيذ هذا المشروع وفق أعلى المقاييس والمواصفات المعتمدة عالمياً في بناء الكرفانات والبرت كابن. ركزنا في التصميم على تكامل المساحات الداخلية مع العزل الحراري التام لتحمل الظروف المناخية القاسية، مع الحفاظ على المظهر الفاخر الخارجي ليعكس هوية العميل.'}
                                </p>
                            </div>

                            {/* Before & After Interactive Slider */}
                            <div>
                                <h2 className="text-3xl font-bold border-b-2 border-[#C9A227] inline-block pb-3 pr-2 mb-8 text-[#0B1F3A] dark:text-white">الفارق الذي نصنعه (قبل وبعد)</h2>
                                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl group border border-gray-200 dark:border-white/10 select-none">
                                    {/* After Image (Background) */}
                                    <img src={afterImg} alt="After Completion" className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />

                                    {/* Before Image (Clipped) */}
                                    <img
                                        src={beforeImg}
                                        alt="Before Start"
                                        className="absolute top-0 right-0 w-full h-full object-cover pointer-events-none filter grayscale sepia-[30%]"
                                        style={{ clipPath: `polygon(100% 0, ${100 - sliderValue}% 0, ${100 - sliderValue}% 100%, 100% 100%)` }}
                                    />

                                    {/* Slider Input overlay */}
                                    <input
                                        type="range" min="0" max="100" value={sliderValue}
                                        onChange={(e) => setSliderValue(e.target.value)}
                                        className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-ew-resize z-20"
                                    />

                                    {/* Visual Slider Line */}
                                    <div
                                        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 pointer-events-none transition-all duration-75"
                                        style={{ right: `${sliderValue}%`, transform: 'translateX(50%)' }}
                                    >
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#C9A227] rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                                            <DynamicIcon name="swap_horiz" className="text-[#0B1F3A] text-lg font-bold" />
                                        </div>
                                    </div>

                                    {/* Labels */}
                                    <div className="absolute top-6 right-6 bg-black/60 text-white px-4 py-2 rounded-lg font-bold backdrop-blur-sm shadow z-0">قبل التنفيذ</div>
                                    <div className="absolute top-6 left-6 bg-[#C9A227]/90 text-[#0B1F3A] px-4 py-2 rounded-lg font-bold backdrop-blur-sm shadow z-0">النتيجة النهائية</div>
                                </div>
                            </div>

                            {/* Challenges & Solutions */}
                            <div className="bg-gray-50 dark:bg-[#0A182E] p-10 rounded-3xl border border-gray-100 dark:border-white/5 shadow-inner">
                                <div className="grid md:grid-cols-2 gap-10">
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-400">
                                                <DynamicIcon name="warning" className="text-2xl" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#0B1F3A] dark:text-white">التحديات</h3>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                                            {mockDetails.challenges}
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400">
                                                <DynamicIcon name="verified" className="text-2xl" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#0B1F3A] dark:text-white">الحلول المبتكرة</h3>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                                            {mockDetails.solutions}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN: PROJECT INFORMATION PANEL */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 bg-[#0B1F3A] rounded-3xl p-8 shadow-2xl overflow-hidden border border-white/10">
                                <div className="absolute top-0 left-0 w-full h-2 gold-gradient"></div>
                                <h3 className="text-2xl font-bold text-white mb-8 mt-2 flex items-center gap-3">
                                    <DynamicIcon name="info" className="text-[#C9A227]" />
                                    بطاقة المشروع
                                </h3>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#C9A227] shrink-0">
                                            <DynamicIcon name="category" className="text-sm" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">الخدمة المُقدمة</div>
                                            <div className="font-bold text-white text-lg">{project.category}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#C9A227] shrink-0">
                                            <DynamicIcon name="schedule" className="text-sm" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">مدة التنفيذ</div>
                                            <div className="font-bold text-white text-lg">{mockDetails.duration}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#C9A227] shrink-0">
                                            <DynamicIcon name="square_foot" className="text-sm" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">مساحة المشروع</div>
                                            <div className="font-bold text-white text-lg">{mockDetails.area}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <h4 className="text-white font-bold mb-4">المواد المستخدمة:</h4>
                                    <ul className="space-y-3">
                                        {mockDetails.materials.map((mat, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                                                <DynamicIcon name="check_circle" className="text-[#C9A227] text-sm" />
                                                {mat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-10">
                                    <Link href={route('contact')} className="w-full flex items-center justify-center gap-2 bg-[#C9A227] hover:bg-white text-[#0B1F3A] font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_10px_20px_rgba(201,162,39,0.3)] hover:-translate-y-1">
                                        اطلب مشروعاً مماثلاً
                                        <DynamicIcon name="arrow_forward" className="rotate-180" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* RELATED PROJECTS GRID */}
            {relatedProjects.length > 0 && (
                <section className="py-20 bg-[#f8f7f6] dark:bg-[#040A12] border-t border-gray-200 dark:border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-3xl font-bold text-[#0B1F3A] dark:text-white">مشاريع ذات صلة</h2>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">تصفح المزيد من أعمالنا في نفس المجال</p>
                            </div>
                            <Link href={route('our-projects.index')} className="text-[#C9A227] font-bold hover:text-[#0B1F3A] dark:hover:text-white transition-colors hidden md:flex items-center gap-2">
                                كل المشاريع
                                <DynamicIcon name="arrow_forward" className="rotate-180 text-sm" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProjects.map(rel => (
                                <Link href={route('our-projects.show', rel.id)} key={rel.id} className="group overflow-hidden rounded-2xl bg-white dark:bg-[#0B1F3A] shadow-md hover:shadow-xl transition-all border border-transparent dark:border-white/5 hover:border-[#C9A227]/30 block">
                                    <div className="h-48 overflow-hidden relative">
                                        <img src={rel.image_path ? `/storage/${rel.image_path}` : rel.image_url} alt={rel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                                        <div className="absolute bottom-4 right-4 bg-[#C9A227] text-[#0B1F3A] text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                            {rel.category}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2 line-clamp-1">{rel.title || rel.title_ar}</h4>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
                                            عرض تفاصيل المشروع
                                            <DynamicIcon name="arrow_forward" className="text-[16px] rotate-180 transition-transform group-hover:-translate-x-2" />
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CALL TO ACTION */}
            <section className="py-20 bg-[#0B1F3A] text-center border-t border-[#C9A227]/20 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] to-transparent"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">هل أعجبك مستوى التنفيذ؟</h2>
                    <p className="text-xl text-gray-400 mb-10">شاركنا أفكارك وسنقوم بتحويلها إلى واقع ملموس</p>
                    <Link href={route('contact')} className="inline-block bg-[#C9A227] hover:bg-white text-[#0B1F3A] font-bold text-xl py-4 px-12 rounded-lg transition-all duration-300 shadow-xl">
                        ابدأ مشروعك الآن
                    </Link>
                </div>
            </section>
        </div>
    );
}
