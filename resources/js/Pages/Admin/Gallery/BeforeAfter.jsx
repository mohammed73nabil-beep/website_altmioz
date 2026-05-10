import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import toast from 'react-hot-toast';

// ─── WebP Conversion Utility ─────────────────────────────────────────────────
const convertToWebP = (file) =>
    new Promise((resolve) => {
        const originalKB = (file.size / 1024).toFixed(1);
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            const MAX = 1920;
            let { width, height } = img;
            if (width > MAX || height > MAX) {
                const r = Math.min(MAX / width, MAX / height);
                width = Math.round(width * r);
                height = Math.round(height * r);
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
                URL.revokeObjectURL(objectUrl);
                const compressedKB = (blob.size / 1024).toFixed(1);
                const webpFile = new File(
                    [blob],
                    file.name.replace(/\.[^.]+$/, '.webp'),
                    { type: 'image/webp', lastModified: Date.now() }
                );
                resolve({ file: webpFile, originalKB, compressedKB });
            }, 'image/webp', 0.85);
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve({ file, originalKB, compressedKB: originalKB });
        };

        img.src = objectUrl;
    });

export default function BeforeAfterIndex({ images = [] }) {
    const [previewBefore, setPreviewBefore] = useState(null);
    const [previewAfter, setPreviewAfter] = useState(null);
    const [editPreviewBefore, setEditPreviewBefore] = useState(null);
    const [editPreviewAfter, setEditPreviewAfter] = useState(null);
    const [editingImage, setEditingImage] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [compInfoBefore, setCompInfoBefore] = useState(null);
    const [compInfoAfter, setCompInfoAfter] = useState(null);
    const [editCompInfoBefore, setEditCompInfoBefore] = useState(null);
    const [editCompInfoAfter, setEditCompInfoAfter] = useState(null);

    const CompressionBadge = ({ info }) =>
        info ? (
            <div className="mt-2 flex items-center gap-2 text-[10px] sm:text-xs bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 rounded-lg px-2 py-1.5 w-full">
                <span className="material-symbols-outlined text-[14px] shrink-0">check_circle</span>
                <span className="truncate">
                    WebP ✅ | {info.originalKB}KB → {info.compressedKB}KB
                </span>
            </div>
        ) : null;

    // ── Add form ──────────────────────────────────────────────────────────────
    const addForm = useForm({ before_image: null, after_image: null, title: '' });

    const handleFileChange = async (e, type, isEdit = false) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const result = await convertToWebP(file);
        
        const reader = new FileReader();
        reader.onloadend = () => {
            if (isEdit) {
                if (type === 'before') {
                    setEditPreviewBefore(reader.result);
                    editForm.setData('before_image', result.file);
                    setEditCompInfoBefore(result);
                } else {
                    setEditPreviewAfter(reader.result);
                    editForm.setData('after_image', result.file);
                    setEditCompInfoAfter(result);
                }
            } else {
                if (type === 'before') {
                    setPreviewBefore(reader.result);
                    addForm.setData('before_image', result.file);
                    setCompInfoBefore(result);
                } else {
                    setPreviewAfter(reader.result);
                    addForm.setData('after_image', result.file);
                    setCompInfoAfter(result);
                }
            }
        };
        reader.readAsDataURL(result.file);
    };

    const submitAdd = (e) => {
        e.preventDefault();
        addForm.post(route('admin.before-after.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('تمت الإضافة بنجاح ✅');
                addForm.reset();
                setPreviewBefore(null);
                setPreviewAfter(null);
                setCompInfoBefore(null);
                setCompInfoAfter(null);
            },
            onError: () => toast.error('حدث خطأ أثناء الإضافة.'),
        });
    };

    // ── Edit form ─────────────────────────────────────────────────────────────
    const editForm = useForm({ before_image: null, after_image: null, title: '' });

    const openEdit = (img) => {
        setEditingImage(img);
        editForm.setData({ before_image: null, after_image: null, title: img.title || '' });
        setEditPreviewBefore(`/storage/${img.before_image_path}`);
        setEditPreviewAfter(`/storage/${img.after_image_path}`);
        setEditCompInfoBefore(null);
        setEditCompInfoAfter(null);
    };

    const submitEdit = (e) => {
        e.preventDefault();
        editForm.post(route('admin.before-after.update', editingImage.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('تم التعديل بنجاح ✅');
                setEditingImage(null);
            },
            onError: () => toast.error('حدث خطأ أثناء التعديل.'),
        });
    };

    // ── Delete ────────────────────────────────────────────────────────────────
    const confirmDelete = () => {
        router.delete(route('admin.before-after.destroy', deleteTarget.id), {
            onSuccess: () => {
                toast.success('تم الحذف بنجاح');
                setDeleteTarget(null);
            },
            onError: () => toast.error('حدث خطأ أثناء الحذف.'),
        });
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400">compare</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">صور الأعمال</span>
                    <span className="text-slate-400">/</span>
                    <span className="text-[#22C55E] font-bold">مقارنة قبل وبعد</span>
                </div>
            }
        >
            <Head title="مقارنة قبل وبعد" />

            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <a
                        href={route('admin.gallery.index')}
                        className="flex items-center gap-2 text-sm text-slate-500 hover:text-[#22C55E] transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        العودة لصور الأعمال
                    </a>
                </div>

                {/* ── Add Form ────────────────────────────────────── */}
                <div className="bg-white dark:bg-sidebar-dark rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                        <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#22C55E] text-[20px]">add_photo_alternate</span>
                            إضافة مقارنة جديدة
                        </h3>
                    </div>
                    <form onSubmit={submitAdd} className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Before Image */}
                            <div>
                                <InputLabel value="صورة قبل التنفيذ *" className="mb-2" />
                                <div className="relative h-48 w-full bg-slate-100 dark:bg-black/20 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-white/10 group flex flex-col items-center justify-center cursor-pointer">
                                    {previewBefore ? (
                                        <>
                                            <img src={previewBefore} className="w-full h-full object-cover" alt="preview" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-white text-sm font-medium flex items-center gap-2 bg-black/50 py-2 px-4 rounded-full">
                                                    <span className="material-symbols-outlined">upload</span> تغيير
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center text-slate-500 dark:text-slate-400 pointer-events-none">
                                            <span className="material-symbols-outlined text-4xl mb-2">image</span>
                                            <span className="text-sm">اختر صورة (قبل)</span>
                                        </div>
                                    )}
                                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onChange={(e) => handleFileChange(e, 'before')} />
                                </div>
                                <InputError message={addForm.errors.before_image} className="mt-1" />
                                <CompressionBadge info={compInfoBefore} />
                            </div>

                            {/* After Image */}
                            <div>
                                <InputLabel value="صورة بعد التنفيذ *" className="mb-2" />
                                <div className="relative h-48 w-full bg-slate-100 dark:bg-black/20 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-white/10 group flex flex-col items-center justify-center cursor-pointer">
                                    {previewAfter ? (
                                        <>
                                            <img src={previewAfter} className="w-full h-full object-cover" alt="preview" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-white text-sm font-medium flex items-center gap-2 bg-black/50 py-2 px-4 rounded-full">
                                                    <span className="material-symbols-outlined">upload</span> تغيير
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center text-slate-500 dark:text-slate-400 pointer-events-none">
                                            <span className="material-symbols-outlined text-4xl mb-2">image</span>
                                            <span className="text-sm">اختر صورة (بعد)</span>
                                        </div>
                                    )}
                                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onChange={(e) => handleFileChange(e, 'after')} />
                                </div>
                                <InputError message={addForm.errors.after_image} className="mt-1" />
                                <CompressionBadge info={compInfoAfter} />
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <InputLabel value="وصف المقارنة (اختياري)" className="mb-1" />
                            <input
                                type="text"
                                value={addForm.data.title}
                                onChange={e => addForm.setData('title', e.target.value)}
                                placeholder="مثال: حديقة منزل - الرياض"
                                className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-800 dark:text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#22C55E]/40"
                            />
                        </div>

                        <div className="flex justify-end">
                            <PrimaryButton disabled={addForm.processing || !addForm.data.before_image || !addForm.data.after_image} className="flex items-center gap-2 bg-[#22C55E] text-[#0a0a0a]">
                                {addForm.processing ? (
                                    <><span className="material-symbols-outlined animate-spin text-sm">sync</span>جاري الرفع...</>
                                ) : (
                                    <><span className="material-symbols-outlined text-sm">add</span>إضافة المقارنة</>
                                )}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>

                {/* ── List ───────────────────────────────────────── */}
                <div className="bg-white dark:bg-sidebar-dark rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex justify-between items-center">
                        <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#22C55E] text-[20px]">collections</span>
                            المقارنات المضافة
                            <span className="bg-[#22C55E]/10 text-[#22C55E] px-2 py-0.5 rounded-full text-xs font-bold">{images.length}</span>
                        </h3>
                    </div>

                    {images.length === 0 ? (
                        <div className="text-center py-20">
                            <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-white/10 mb-4 block">compare</span>
                            <p className="text-slate-500">لا توجد صور مقارنة مضافة حتى الآن.</p>
                        </div>
                    ) : (
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {images.map(img => (
                                <div key={img.id} className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm bg-black flex flex-col">
                                    <div className="relative h-48 w-full flex">
                                        <div className="w-1/2 h-full relative">
                                            <img src={`/storage/${img.before_image_path}`} className="w-full h-full object-cover" alt="Before" />
                                            <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded">قبل</span>
                                        </div>
                                        <div className="w-1/2 h-full relative border-r-2 border-[#22C55E]">
                                            <img src={`/storage/${img.after_image_path}`} className="w-full h-full object-cover" alt="After" />
                                            <span className="absolute top-2 left-2 bg-[#22C55E] text-black text-[10px] px-2 py-1 rounded">بعد</span>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-white dark:bg-sidebar-dark flex justify-between items-center">
                                        <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{img.title || 'بدون وصف'}</p>
                                        <div className="flex gap-2">
                                            <button onClick={() => openEdit(img)} className="text-blue-500 hover:text-blue-600 bg-blue-50 dark:bg-blue-500/10 p-1.5 rounded-lg"><span className="material-symbols-outlined text-[16px]">edit</span></button>
                                            <button onClick={() => setDeleteTarget(img)} className="text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-500/10 p-1.5 rounded-lg"><span className="material-symbols-outlined text-[16px]">delete</span></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Edit Modal ────────────────────────────────────────────────── */}
            <Modal show={!!editingImage} onClose={() => setEditingImage(null)} maxWidth="2xl">
                <form onSubmit={submitEdit} className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">تعديل المقارنة</h2>
                        <button type="button" onClick={() => setEditingImage(null)} className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined">close</span></button>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel value="صورة قبل التنفيذ" className="mb-2" />
                                <div className="relative h-40 w-full bg-slate-100 dark:bg-black/20 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-white/10 group flex flex-col items-center justify-center cursor-pointer">
                                    <img src={editPreviewBefore} className="w-full h-full object-cover" alt="preview" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-sm font-medium flex items-center gap-2 bg-black/50 py-2 px-4 rounded-full">تغيير الصورة</span>
                                    </div>
                                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onChange={(e) => handleFileChange(e, 'before', true)} />
                                </div>
                                <CompressionBadge info={editCompInfoBefore} />
                            </div>
                            <div>
                                <InputLabel value="صورة بعد التنفيذ" className="mb-2" />
                                <div className="relative h-40 w-full bg-slate-100 dark:bg-black/20 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-white/10 group flex flex-col items-center justify-center cursor-pointer">
                                    <img src={editPreviewAfter} className="w-full h-full object-cover" alt="preview" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-sm font-medium flex items-center gap-2 bg-black/50 py-2 px-4 rounded-full">تغيير الصورة</span>
                                    </div>
                                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onChange={(e) => handleFileChange(e, 'after', true)} />
                                </div>
                                <CompressionBadge info={editCompInfoAfter} />
                            </div>
                        </div>

                        <div>
                            <InputLabel value="وصف المقارنة" className="mb-1" />
                            <input type="text" value={editForm.data.title} onChange={e => editForm.setData('title', e.target.value)} className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-800 dark:text-white px-4 py-2.5 text-sm" />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 dark:border-white/10 pt-4">
                        <SecondaryButton type="button" onClick={() => setEditingImage(null)}>إلغاء</SecondaryButton>
                        <PrimaryButton disabled={editForm.processing} className="bg-[#22C55E] text-[#0a0a0a]">{editForm.processing ? 'جاري الحفظ...' : 'حفظ التعديلات'}</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* ── Delete Modal ────────────────────────────────────────────────── */}
            <Modal show={!!deleteTarget} onClose={() => setDeleteTarget(null)} maxWidth="sm">
                <div className="p-6 text-center">
                    <span className="material-symbols-outlined text-5xl text-red-500 mb-4 block">delete_forever</span>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">تأكيد الحذف</h3>
                    <p className="text-slate-500 text-sm mb-6">هل أنت متأكد من حذف هذه المقارنة نهائياً؟</p>
                    <div className="flex justify-center gap-3">
                        <SecondaryButton onClick={() => setDeleteTarget(null)}>إلغاء</SecondaryButton>
                        <button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2 rounded-lg flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">delete</span> حذف
                        </button>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
