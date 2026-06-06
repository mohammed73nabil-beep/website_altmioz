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
            }, 'image/webp', 0.18);
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve({ file, originalKB, compressedKB: originalKB });
        };

        img.src = objectUrl;
    });

// ─── Page card labels ─────────────────────────────────────────────────────────
const PAGE_ICONS = {
    home: 'home',
    landscaping: 'yard',
    artificial_grass: 'grass',
    water_features: 'pool',
    pergolas: 'deck',
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GalleryIndex({ pages = {}, selectedPage, images = [] }) {
    const [compressionInfo, setCompressionInfo] = useState(null);
    const [editCompressionInfo, setEditCompressionInfo] = useState(null);
    const [preview, setPreview] = useState(null);
    const [editPreview, setEditPreview] = useState(null);
    const [editingImage, setEditingImage] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    // ── Add form ──────────────────────────────────────────────────────────────
    const addForm = useForm({ page: selectedPage || '', image: null, title: '' });

    const handleAddImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setCompressionInfo(null);
        const result = await convertToWebP(file);
        addForm.setData('image', result.file);
        setCompressionInfo(result);
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(result.file);
    };

    const submitAdd = (e) => {
        e.preventDefault();
        addForm.post(route('admin.gallery.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('تمت إضافة الصورة بنجاح ✅');
                addForm.reset('image', 'title');
                setPreview(null);
                setCompressionInfo(null);
            },
            onError: () => toast.error('حدث خطأ أثناء الإضافة.'),
        });
    };

    // ── Edit form ─────────────────────────────────────────────────────────────
    const editForm = useForm({ image: null, title: '' });

    const openEdit = (img) => {
        setEditingImage(img);
        editForm.setData({ image: null, title: img.title || '' });
        setEditPreview(`/storage/${img.image_path}`);
        setEditCompressionInfo(null);
    };

    const handleEditImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setEditCompressionInfo(null);
        const result = await convertToWebP(file);
        editForm.setData('image', result.file);
        setEditCompressionInfo(result);
        const reader = new FileReader();
        reader.onloadend = () => setEditPreview(reader.result);
        reader.readAsDataURL(result.file);
    };

    const submitEdit = (e) => {
        e.preventDefault();
        editForm.post(route('admin.gallery.update', editingImage.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('تم تعديل الصورة بنجاح ✅');
                setEditingImage(null);
                setEditPreview(null);
                setEditCompressionInfo(null);
            },
            onError: () => toast.error('حدث خطأ أثناء التعديل.'),
        });
    };

    // ── Delete ────────────────────────────────────────────────────────────────
    const confirmDelete = () => {
        router.delete(route('admin.gallery.destroy', deleteTarget.id), {
            onSuccess: () => {
                toast.success('تم حذف الصورة بنجاح');
                setDeleteTarget(null);
            },
            onError: () => toast.error('حدث خطأ أثناء الحذف.'),
        });
    };

    // ── Helpers ───────────────────────────────────────────────────────────────
    const CompressionBadge = ({ info }) =>
        info ? (
            <div className="mt-2 flex items-center gap-2 text-xs bg-primary/10 text-primary dark:text-primary border border-primary/20 rounded-lg px-3 py-2">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>
                    تم التحويل إلى <strong>WebP</strong> ✅ &nbsp;|&nbsp;
                    {info.originalKB} KB → <strong>{info.compressedKB} KB</strong>
                    {info.originalKB > info.compressedKB && (
                        <> &nbsp;(وفّر {(info.originalKB - info.compressedKB).toFixed(1)} KB)</>
                    )}
                </span>
            </div>
        ) : null;

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400">photo_library</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">صور الأعمال</span>
                    {selectedPage && pages[selectedPage] && (
                        <>
                            <span className="text-slate-400">/</span>
                            <span className="text-primary font-bold">{pages[selectedPage]}</span>
                        </>
                    )}
                </div>
            }
        >
            <Head title="صور الأعمال" />

            {/* ── Page Selector ────────────────────────────────────────────── */}
            {!selectedPage ? (
                <div>
                    <div className="flex justify-between items-center bg-white dark:bg-sidebar-dark p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 relative overflow-hidden mb-8">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3 mb-2">صور الأعمال</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">اختر الصفحة التي تريد إدارة صور أعمالها.</p>
                            </div>
                            <a href={route('admin.before-after.index')} className="bg-[#C5A059] text-[#0a0a0a] hover:bg-[#C5A059]/90 font-bold px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 w-fit">
                                <span className="material-symbols-outlined text-[20px]">compare</span>
                                إدارة صور قبل وبعد
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(pages).map(([key, label]) => (
                            <a
                                key={key}
                                href={route('admin.gallery.index') + '?page=' + key}
                                className="group bg-white dark:bg-sidebar-dark rounded-2xl p-8 border border-slate-100 dark:border-white/5 shadow-sm hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center gap-4 text-center cursor-pointer"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <span className="material-symbols-outlined text-3xl">{PAGE_ICONS[key] || 'photo_library'}</span>
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800 dark:text-white text-lg">{label}</div>
                                    <div className="text-xs text-slate-400 mt-1 font-mono">{key}</div>
                                </div>
                                <span className="text-xs text-primary font-semibold group-hover:underline">إدارة الصور →</span>
                            </a>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* ── Back button ──────────────────────────────────────── */}
                    <div className="flex items-center gap-4">
                        <a
                            href={route('admin.gallery.index')}
                            className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            العودة لاختيار الصفحة
                        </a>
                        <span className="text-slate-300 dark:text-white/10">|</span>
                        <span className="text-sm font-bold text-slate-700 dark:text-white">{pages[selectedPage]}</span>
                    </div>

                    {/* ── Add Image Form ────────────────────────────────────── */}
                    <div className="bg-white dark:bg-sidebar-dark rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                            <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">add_photo_alternate</span>
                                إضافة صورة جديدة
                            </h3>
                        </div>
                        <form onSubmit={submitAdd} className="p-6 space-y-4">
                            {/* Image Upload */}
                            <div>
                                <InputLabel value="الصورة (يتم تحويلها تلقائياً إلى WebP)" className="mb-2" />
                                <div
                                    className="relative h-48 w-full bg-slate-100 dark:bg-black/20 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-white/10 group flex flex-col items-center justify-center cursor-pointer"
                                >
                                    {preview ? (
                                        <>
                                            <img src={preview} className="w-full h-full object-cover" alt="preview" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-white text-sm font-medium flex items-center gap-2 bg-black/50 py-2 px-4 rounded-full">
                                                    <span className="material-symbols-outlined">upload</span>
                                                    تغيير الصورة
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 pointer-events-none">
                                            <span className="material-symbols-outlined text-4xl mb-2">add_photo_alternate</span>
                                            <span className="text-sm">اضغط لرفع صورة</span>
                                            <span className="text-xs mt-1 text-slate-400">سيتم ضغطها وتحويلها إلى WebP تلقائياً</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        accept="image/*"
                                        onChange={handleAddImage}
                                    />
                                </div>
                                <InputError message={addForm.errors.image} className="mt-1" />
                                <CompressionBadge info={compressionInfo} />
                            </div>

                            {/* Title */}
                            <div>
                                <InputLabel value="وصف الصورة (اختياري)" className="mb-1" />
                                <input
                                    type="text"
                                    value={addForm.data.title}
                                    onChange={e => addForm.setData('title', e.target.value)}
                                    placeholder="مثال: حديقة فيلا خاصة - الرياض"
                                    className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-800 dark:text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                                />
                            </div>

                            <div className="flex justify-end">
                                <PrimaryButton disabled={addForm.processing || !addForm.data.image} className="flex items-center gap-2">
                                    {addForm.processing ? (
                                        <><span className="material-symbols-outlined animate-spin text-sm">sync</span>جاري الرفع...</>
                                    ) : (
                                        <><span className="material-symbols-outlined text-sm">upload</span>رفع الصورة</>
                                    )}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>

                    {/* ── Images Grid ───────────────────────────────────────── */}
                    <div className="bg-white dark:bg-sidebar-dark rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex justify-between items-center">
                            <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">collections</span>
                                صور الأعمال المضافة
                                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-bold">{images.length}</span>
                            </h3>
                        </div>

                        {images.length === 0 ? (
                            <div className="text-center py-20">
                                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-white/10 mb-4 block">image_not_supported</span>
                                <p className="text-slate-500">لا توجد صور مضافة لهذه الصفحة حتى الآن.</p>
                            </div>
                        ) : (
                            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {images.map(img => (
                                    <div key={img.id} className="group relative rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm bg-black">
                                        <img
                                            src={`/storage/${img.image_path}`}
                                            alt={img.title || 'صورة أعمال'}
                                            className="w-full h-36 object-cover opacity-90 group-hover:opacity-50 transition-all duration-300"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                type="button"
                                                onClick={() => openEdit(img)}
                                                className="bg-white/90 text-primary p-2 rounded-lg shadow hover:bg-white transition"
                                                title="تعديل"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeleteTarget(img)}
                                                className="bg-red-500/90 text-white p-2 rounded-lg shadow hover:bg-red-500 transition"
                                                title="حذف"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                            </button>
                                        </div>
                                        {(img.title || img.alt_text) && (
                                            <div className="px-2 py-1.5 bg-white dark:bg-sidebar-dark border-t border-slate-100 dark:border-white/5">
                                                {img.title && <p className="text-xs text-slate-700 dark:text-slate-300 font-bold truncate">{img.title}</p>}
                                                {img.alt_text && <p className="text-[10px] text-slate-400 font-mono truncate" dir="ltr">{img.alt_text}</p>}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── Edit Modal ────────────────────────────────────────────────── */}
            <Modal show={!!editingImage} onClose={() => setEditingImage(null)} maxWidth="lg">
                <form onSubmit={submitEdit} className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">تعديل الصورة</h2>
                        <button type="button" onClick={() => setEditingImage(null)} className="text-slate-400 hover:text-slate-600">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Image */}
                        <div>
                            <InputLabel value="الصورة (اتركها فارغة للإبقاء على الحالية)" className="mb-2" />
                            <div className="relative h-48 w-full bg-slate-100 dark:bg-black/20 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-white/10 group flex flex-col items-center justify-center cursor-pointer">
                                {editPreview ? (
                                    <>
                                        <img src={editPreview} className="w-full h-full object-cover" alt="preview" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white text-sm font-medium flex items-center gap-2 bg-black/50 py-2 px-4 rounded-full">
                                                <span className="material-symbols-outlined">upload</span>
                                                تغيير الصورة
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center text-slate-400 pointer-events-none">
                                        <span className="material-symbols-outlined text-4xl mb-2">add_photo_alternate</span>
                                        <span className="text-sm">اضغط لرفع صورة</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept="image/*"
                                    onChange={handleEditImage}
                                />
                            </div>
                            <CompressionBadge info={editCompressionInfo} />
                        </div>

                        {/* Title */}
                        <div>
                            <InputLabel value="وصف الصورة (اختياري)" className="mb-1" />
                            <input
                                type="text"
                                value={editForm.data.title}
                                onChange={e => editForm.setData('title', e.target.value)}
                                className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-800 dark:text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 dark:border-white/10 pt-4">
                        <SecondaryButton type="button" onClick={() => setEditingImage(null)}>إلغاء</SecondaryButton>
                        <PrimaryButton disabled={editForm.processing} className="flex items-center gap-2">
                            {editForm.processing ? (
                                <><span className="material-symbols-outlined animate-spin text-sm">sync</span>جاري الحفظ...</>
                            ) : (
                                <><span className="material-symbols-outlined text-sm">save</span>حفظ التعديلات</>
                            )}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* ── Delete Confirm Modal ──────────────────────────────────────── */}
            <Modal show={!!deleteTarget} onClose={() => setDeleteTarget(null)} maxWidth="sm">
                <div className="p-6 text-center">
                    <span className="material-symbols-outlined text-5xl text-red-500 mb-4 block">delete_forever</span>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">تأكيد الحذف</h3>
                    <p className="text-slate-500 text-sm mb-6">هل أنت متأكد من حذف هذه الصورة نهائياً؟ لا يمكن التراجع عن هذا الإجراء.</p>
                    <div className="flex justify-center gap-3">
                        <SecondaryButton onClick={() => setDeleteTarget(null)}>إلغاء</SecondaryButton>
                        <button
                            onClick={confirmDelete}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2 rounded-lg transition flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">delete</span>
                            حذف نهائياً
                        </button>
                    </div>
                </div>
            </Modal>
        </AdminLayout>
    );
}
