import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import DynamicIcon from '@/Components/DynamicIcon';

export default function ServicesGrid({ data }) {
    const { pageContents } = usePage().props;

    const dynamicServices = [
        { 
            id: 1, 
            title: pageContents?.['home.services.maintenance.title'] || 'ديكورات داخلية', 
            icon: pageContents?.['home.services.maintenance.icon'] || 'yard', 
            desc: pageContents?.['home.services.maintenance.description'] || 'تصاميم خارجية مذهلة وتحويل المساحات.' 
        },
        { 
            id: 2, 
            title: pageContents?.['home.services.caravans.title'] || 'تصميم 3D', 
            icon: pageContents?.['home.services.caravans.icon'] || 'design_services', 
            desc: pageContents?.['home.services.caravans.description'] || 'رؤية حديقتك قبل التنفيذ.' 
        },
        { 
            id: 3, 
            title: pageContents?.['home.services.portacabins.title'] || 'بديل الرخام', 
            icon: pageContents?.['home.services.portacabins.icon'] || 'grass', 
            desc: pageContents?.['home.services.portacabins.description'] || 'أفضل أنواع العشب المعتمد عالمياً.' 
        },
        { 
            id: 4, 
            title: pageContents?.['home.services.renovation.title'] || 'ديكورات منزلية وديكورات مائية', 
            icon: pageContents?.['home.services.renovation.icon'] || 'pool', 
            desc: pageContents?.['home.services.renovation.description'] || 'إضافة لمسة مائية ساحرة.' 
        },
        { 
            id: 5, 
            title: pageContents?.['home.services.insulation.title'] || 'مظلات وجلسات', 
            icon: pageContents?.['home.services.insulation.icon'] || 'deck', 
            desc: pageContents?.['home.services.insulation.description'] || 'مساحات مريحة للعائلة.' 
        },
        { 
            id: 6, 
            title: pageContents?.['home.services.electrical.title'] || 'شبكات الري', 
            icon: pageContents?.['home.services.electrical.icon'] || 'water_drop', 
            desc: pageContents?.['home.services.electrical.description'] || 'أنظمة ري ذكية ومخفية.' 
        },
    ];

    const limit = data?.limit || 6;
    const servicesToDisplay = dynamicServices.slice(0, limit);

    return (
        <section className="py-24 relative bg-background-light dark:bg-background-dark z-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-3">{pageContents?.['home.services.badge'] || 'مجالات التخصص'}</span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
                        {pageContents?.['home.services.title'] || data?.heading?.ar || 'خدماتنا المميزة'}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-[#D4AF37] mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesToDisplay.map((service) => (
                        <div key={service.id} className={`bg-white dark:bg-surface-dark p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-white/5 hover:-translate-y-2 hover:border-primary/50 transition-all duration-500 group`}>
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-background-dark flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-slate-900 transition-colors border border-gray-100 dark:border-white/5 group-hover:border-transparent">
                                <DynamicIcon name={service.icon} className="text-3xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-sm">
                                {service.desc}
                            </p>
                            <Link href={route('services.index')} className="inline-flex items-center gap-2 text-slate-900 dark:text-white font-bold group-hover:text-primary transition-colors text-sm">
                                عرض الخدمة
                                <DynamicIcon name="arrow_forward" className="text-sm rotate-180" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
