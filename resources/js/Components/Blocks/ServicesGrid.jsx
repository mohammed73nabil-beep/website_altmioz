import React from 'react';
import { Link } from '@inertiajs/react';
import DynamicIcon from '@/Components/DynamicIcon';

export default function ServicesGrid({ data }) {
    // We mock the services since retrieving them from the database dynamically requires passing them implicitly from the render controller. 
    // In a production scenario, you would execute an API call here or pass global page props.
    const mockServices = [
        { id: 1, title: 'صيانة المباني', icon: 'home_repair_service', desc: 'حلول متكاملة للصيانة.' },
        { id: 2, title: 'تركيب الكرفانات', icon: 'rv_hookup', desc: 'تجهيزات ميدانية عالية الأداء.' },
        { id: 3, title: 'البناء السريع', icon: 'domain', desc: 'تنفيذ المشروعات في وقت قياسي.' },
        { id: 4, title: 'الأعمال الكهربائية', icon: 'electrical_services', desc: 'تأسيس شبكات كهربائية آمنة.' },
        { id: 5, title: 'تنسيق الحدائق', icon: 'yard', desc: 'تصاميم خارجية مذهلة.' },
        { id: 6, title: 'السباكة والمياه', icon: 'water_drop', desc: 'خدمات متطورة للشبكات المائية.' },
    ];

    const limit = data?.limit || 6;
    const servicesToDisplay = mockServices.slice(0, limit);

    return (
        <section className="py-24 relative bg-[#f8f7f6] dark:bg-[#071324] z-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-3">مجالات التخصص</span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
                        {data?.heading?.ar || 'خدماتنا المميزة'}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#C9A227] to-[#e3c059] mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesToDisplay.map((service) => (
                        <div key={service.id} className={`bg-white dark:bg-[#0B1F3A] p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-white/5 hover:-translate-y-2 hover:border-[#C9A227]/50 transition-all duration-500 group`}>
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-[#071324] flex items-center justify-center text-[#C9A227] mb-6 group-hover:bg-[#C9A227] group-hover:text-[#0B1F3A] transition-colors border border-gray-100 dark:border-white/5 group-hover:border-transparent">
                                <DynamicIcon name={service.icon} className="text-3xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#C9A227] transition-colors">{service.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-sm">
                                {service.desc}
                            </p>
                            <Link href={route('services.index')} className="inline-flex items-center gap-2 text-[#0B1F3A] dark:text-white font-bold group-hover:text-[#C9A227] transition-colors text-sm">
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
