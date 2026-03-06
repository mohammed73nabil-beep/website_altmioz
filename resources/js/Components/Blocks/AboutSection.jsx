import React from 'react';
import { Link } from '@inertiajs/react';
import DynamicIcon from '@/Components/DynamicIcon';

export default function AboutSection({ data }) {
    return (
        <section className="py-24 relative overflow-hidden bg-[#f8f7f6] dark:bg-[#071324] border-t border-gray-100 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2 min-h-[400px] relative rounded-3xl overflow-hidden shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" alt="من نحن" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-[#0B1F3A]/40"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#0B1F3A] p-8 rounded-3xl shadow-2xl text-center backdrop-blur-sm">
                            <DynamicIcon name="business" className="text-5xl text-[#C9A227] mb-2" />
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white">خبرة واسعة</h3>
                            <p className="text-[#C9A227] font-bold mt-1 tracking-wider text-sm">في عالم المقاولات</p>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-4">
                            عن الشركة
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
                            {data?.heading?.ar || 'من نحن'}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify mb-10 whitespace-pre-line">
                            {data?.text?.ar || 'أضف نص من نحن من لوحة التحكم...'}
                        </p>

                        <div className="flex gap-6 items-center">
                            <Link href={route('services.index')} className="bg-gradient-to-r from-[#C9A227] to-[#e3c059] hover:brightness-110 text-[#0B1F3A] font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1">
                                خدماتنا
                            </Link>
                            <div className="flex items-center gap-3">
                                <DynamicIcon name="support_agent" className="text-[#C9A227] text-4xl p-3 bg-white dark:bg-[#0B1F3A] rounded-full shadow-md" />
                                <div>
                                    <div className="text-xs text-gray-500 font-bold mb-1">دعم متواصل</div>
                                    <div className="text-xl font-black text-gray-900 dark:text-white" dir="ltr">24/7</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
