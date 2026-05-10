import React, { useState, useMemo } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function ContentsIndex({ contents }) {
    const [selectedPage, setSelectedPage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Group contents by their 'page' attribute
    const pagesData = useMemo(() => {
        const grouped = {};
        contents.forEach(content => {
            if (!grouped[content.page]) {
                grouped[content.page] = [];
            }
            grouped[content.page].push(content);
        });
        return grouped;
    }, [contents]);

    const pageNames = Object.keys(pagesData);

    const { data, setData, post, processing, errors, reset } = useForm({
        contents: []
    });

    const openModal = (pageName) => {
        setSelectedPage(pageName);
        setSearchTerm('');
        const pageContents = pagesData[pageName];

        // Prepare form data
        setData('contents', pageContents.map(c => ({
            id: c.id,
            key: c.key,
            section: c.section,
            type: c.type,
            value: c.type === 'image' ? (c.value || '') : (c.value || ''),
            originalValue: c.value,
            file: null
        })));
    };

    const closeModal = () => {
        setSelectedPage(null);
        setSearchTerm('');
        reset();
    };

    const handleContentChange = (index, field, val) => {
        const newContents = [...data.contents];
        newContents[index][field] = val;
        setData('contents', newContents);
    };

    const submit = (e) => {
        e.preventDefault();

        // Use POST with forceFormData to handle potential file uploads
        post(route('admin.contents.bulk-update', selectedPage), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    return (
        <AdminLayout header={<h2 className="font-semibold text-xl text-white leading-tight">إدارة الواجهات</h2>}>
            <Head title="محتوى الصفحات" />

            <div className="flex flex-col md:flex-row justify-between items-center bg-surface-dark p-6 rounded-2xl shadow-lg border border-white/10 mb-8 gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">محتوى الصفحات</h3>
                    <p className="text-slate-400 text-sm">إختر الصفحة لتعديل النصوص والصور الرئيسية الخاصة بها</p>
                </div>
            </div>

            {/* Page Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {pageNames.map(pageName => (
                    <div
                        key={pageName}
                        onClick={() => openModal(pageName)}
                        className="bg-surface-dark rounded-2xl p-6 shadow-lg border border-white/10 hover:border-[#22C55E] cursor-pointer transition-all hover:-translate-y-1 group"
                    >
                        <div className="w-12 h-12 bg-surface-dark rounded-xl flex items-center justify-center text-[#22C55E] mb-4 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-2xl">web</span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">{pageName}</h4>
                        <p className="text-slate-400 text-sm">{pagesData[pageName].length} عناصر قابلة للتعديل</p>
                        <div className="mt-4 flex justify-end">
                            <span className="text-sm text-[#22C55E] flex items-center gap-1 font-bold group-hover:gap-2 transition-all">
                                تعديل المحتوى <span className="material-symbols-outlined text-sm">arrow_left_alt</span>
                            </span>
                        </div>
                    </div>
                ))}

                {pageNames.length === 0 && (
                    <div className="col-span-full text-center py-12 text-slate-500 bg-surface-dark rounded-2xl border border-white/10">
                        لا توجد بيانات مهيأة بعد. يرجى تشغيل seeder.
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {selectedPage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-surface-dark rounded-2xl shadow-2xl w-full max-w-4xl border border-white/10 overflow-hidden my-8 max-h-[90vh] flex flex-col">

                        {/* Modal Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b border-white/10 bg-background-dark shrink-0 gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#22C55E]">edit_document</span>
                                    تعديل {selectedPage}
                                </h3>
                                <p className="text-sm text-slate-400 mt-1">قم بتحديث النصوص والصور واحفظ التغييرات</p>
                            </div>
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="relative w-full md:w-64">
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                                    <input
                                        type="text"
                                        placeholder="ابحث عن نص أو قسم..."
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        className="w-full bg-surface-dark border border-white/10 rounded-xl py-2 pr-10 pl-4 text-white focus:ring-[#22C55E] focus:border-[#22C55E] text-sm"
                                    />
                                </div>
                                <button onClick={closeModal} title="إغلاق" className="text-slate-400 hover:text-white transition-colors w-10 h-10 flex flex-col justify-center items-center rounded-full hover:bg-surface-dark shrink-0">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                        </div>

                        {/* Modal Toolbar - Specific for Landscaping */}
                        {selectedPage === 'تنسيق الحدائق' && (
                            <div className="px-6 py-3 bg-background-dark/50 border-b border-white/10 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const nextIdx = data.contents.filter(c => c.key.startsWith('services.landscaping.why.item')).length / 2 + 1;
                                        const newItems = [...data.contents];
                                        newItems.push({
                                            key: `services.landscaping.why.item${nextIdx}.title`,
                                            section: 'لماذا تختارنا (جديد)',
                                            type: 'short_text',
                                            value: '',
                                            file: null
                                        });
                                        newItems.push({
                                            key: `services.landscaping.why.item${nextIdx}.desc`,
                                            section: 'لماذا تختارنا (جديد)',
                                            type: 'long_text',
                                            value: '',
                                            file: null
                                        });
                                        setData('contents', newItems);
                                    }}
                                    className="text-xs bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 px-3 py-1.5 rounded-lg hover:bg-[#22C55E]/20 transition-all flex items-center gap-1 font-bold"
                                >
                                    <span className="material-symbols-outlined text-sm">add</span>
                                    إضافة ميزة جديدة
                                </button>
                            </div>
                        )}

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                            <form id="bulk-edit-form" onSubmit={submit} className="space-y-8">
                                {data.contents.map((item, index) => {
                                    if (searchTerm) {
                                        const searchLower = searchTerm.toLowerCase();
                                        const sectionMatch = item.section && item.section.toLowerCase().includes(searchLower);
                                        const keyMatch = item.key && item.key.toLowerCase().includes(searchLower);
                                        const valueMatch = typeof item.value === 'string' && item.value.toLowerCase().includes(searchLower);

                                        if (!sectionMatch && !keyMatch && !valueMatch) return null;
                                    }

                                    return (
                                        <div key={item.key} className="bg-surface-dark/50 p-5 rounded-xl border border-white/10/50">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {/* Details sidebar */}
                                                <div className="md:w-1/3">
                                                    <h5 className="text-white font-bold mb-1">{item.section}</h5>
                                                    <span className="text-xs font-mono text-slate-400 bg-black/50 px-2 py-1 rounded select-all">{item.key}</span>
                                                </div>

                                                {/* Input Area */}
                                                <div className="md:w-2/3">
                                                    {item.type === 'short_text' && (
                                                        <input
                                                            type="text"
                                                            value={item.value || ''}
                                                            onChange={e => handleContentChange(index, 'value', e.target.value)}
                                                            className="w-full bg-background-dark border border-white/20 rounded-xl py-2 px-4 text-white focus:ring-[#22C55E] focus:border-[#22C55E]"
                                                        />
                                                    )}

                                                    {item.type === 'long_text' && (
                                                        <textarea
                                                            rows="4"
                                                            value={item.value || ''}
                                                            onChange={e => handleContentChange(index, 'value', e.target.value)}
                                                            className="w-full bg-background-dark border border-white/20 rounded-xl py-3 px-4 text-white focus:ring-[#22C55E] focus:border-[#22C55E] resize-y"
                                                        />
                                                    )}

                                                    {item.type === 'image' && (
                                                        <div className="flex flex-col gap-3">
                                                            {item.originalValue && (
                                                                <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-white/20 group">
                                                                    <img
                                                                        src={item.originalValue.startsWith('http') ? item.originalValue : `/storage/${item.originalValue}`}
                                                                        alt={item.section}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                        <span className="text-xs text-white bg-black/70 px-2 py-1 rounded">الصورة الحالية</span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={e => handleContentChange(index, 'file', e.target.files[0])}
                                                                className="w-full bg-background-dark border border-white/20 rounded-xl py-2 px-4 text-slate-300 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#22C55E] file:text-[#0f172a] hover:file:bg-[#b8860b] cursor-pointer"
                                                            />
                                                            {errors[`contents.${index}.file`] && <p className="text-red-400 text-xs">{errors[`contents.${index}.file`]}</p>}
                                                        </div>
                                                    )}

                                                    {errors[`contents.${index}.value`] && <p className="text-red-400 text-xs mt-1">{errors[`contents.${index}.value`]}</p>}
                                                    {errors[`contents.${index}.key`] && <p className="text-red-400 text-xs mt-1">{errors[`contents.${index}.key`]}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-white/10 bg-background-dark shrink-0 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-6 py-2 rounded-xl text-slate-300 bg-surface-dark hover:bg-white/10 font-bold transition-colors"
                            >
                                إلغاء
                            </button>
                            <button
                                type="submit"
                                form="bulk-edit-form"
                                disabled={processing}
                                className="px-8 py-2 rounded-xl text-[#0f172a] bg-[#22C55E] hover:bg-[#b8860b] font-bold transition-colors flex items-center gap-2 disabled:opacity-70 shadow-lg shadow-[#22C55E]/20"
                            >
                                {processing && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
                                حفظ التعديلات
                            </button>
                        </div>

                    </div>
                </div>
            )}

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #334155;
                    border-radius: 10px;
                }
            `}</style>
        </AdminLayout>
    );
}
