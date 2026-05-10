import React from 'react';
import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import DynamicIcon from '@/Components/DynamicIcon';

export default function ContactForm({ data }) {
    const { data: formData, setData, post, processing, reset } = useForm({
        name: '', email: '', subject: '', message: ''
    });

    const submit = (e) => {
        e.preventDefault();
        axios.post('/api/contact', formData)
            .then(res => {
                toast.success('تم إرسال رسالتك بنجاح!');
                reset();
            })
            .catch(err => {
                toast.error('الرجاء التأكد من جميع الحقول.');
            });
    };

    return (
        <section className="py-24 bg-white dark:bg-[#040A12]">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-gray-50 dark:bg-[#064E3B] p-10 md:p-14 rounded-3xl border border-gray-100 dark:border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#16A34A]/10 rounded-full blur-[80px] pointer-events-none"></div>

                    <div className="text-center mb-10 relative z-10">
                        <DynamicIcon name="mail" className="text-5xl text-[#16A34A] mb-3" />
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">تواصل مع إدارة المشاريع</h2>
                        <p className="text-gray-500">نحن سعداء بتلقي استفساراتك وطلباتك للخدمات.</p>
                    </div>

                    <form onSubmit={submit} className="relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الاسم الكامل *</label>
                                <input required type="text" value={formData.name} onChange={e => setData('name', e.target.value)} className="w-full bg-white dark:bg-[#022C22] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] dark:text-white transition-all shadow-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني *</label>
                                <input required type="email" value={formData.email} onChange={e => setData('email', e.target.value)} className="w-full bg-white dark:bg-[#022C22] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] dark:text-white transition-all shadow-sm" />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الموضوع</label>
                            <input required type="text" value={formData.subject} onChange={e => setData('subject', e.target.value)} className="w-full bg-white dark:bg-[#022C22] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] dark:text-white transition-all shadow-sm" />
                        </div>
                        <div className="mb-8">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">الرسالةالتفصيلية *</label>
                            <textarea required rows="4" value={formData.message} onChange={e => setData('message', e.target.value)} className="w-full bg-white dark:bg-[#022C22] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] dark:text-white transition-all shadow-sm"></textarea>
                        </div>
                        <button disabled={processing} type="submit" className="w-full bg-gradient-to-r from-[#16A34A] to-[#4ADE80] text-[#064E3B] font-black text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                            {processing ? <DynamicIcon name="sync" className="animate-spin" /> : <DynamicIcon name="send" />}
                            إرسال الطلب
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
