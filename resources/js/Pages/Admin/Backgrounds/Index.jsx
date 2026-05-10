import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import toast from 'react-hot-toast';

export default function BackgroundsIndex({ backgroundPages = {} }) {
    const [selectedPage, setSelectedPage] = useState(null);
    const [selectedContent, setSelectedContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [compressionInfo, setCompressionInfo] = useState(null); // { originalKB, compressedKB }

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        image: null,
        opacity: 50,
        _method: 'POST' // Note: For file uploads we usually use POST, even if technically an update
    });

    const openModal = (content) => {
        setSelectedContent(content);
        // Default to extra_value if it exists, otherwise 50
        const currentOpacity = content.extra_value !== null ? parseFloat(content.extra_value) : 50;
        setData({
            image: null,
            opacity: currentOpacity,
            _method: 'POST'
        });

        // Setup image preview
        const currentImage = content.value;
        if (currentImage) {
            setImagePreview(currentImage.startsWith('http') || currentImage.startsWith('/') ? currentImage : `/storage/${currentImage}`);
        } else {
            setImagePreview(null);
        }

        setIsModalOpen(true);
        clearErrors();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        setSelectedContent(null);
        setImagePreview(null);
        setCompressionInfo(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const originalKB = (file.size / 1024).toFixed(1);
        setCompressionInfo(null); // reset while processing

        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            // Cap max dimension at 1280px
            const MAX_SIZE = 1280;
            let { width, height } = img;
            if (width > MAX_SIZE || height > MAX_SIZE) {
                const ratio = Math.min(MAX_SIZE / width, MAX_SIZE / height);
                width = Math.round(width * ratio);
                height = Math.round(height * ratio);
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(img, 0, 0, width, height);

            // Convert to WebP at 50% quality for maximum compression
            canvas.toBlob((blob) => {
                URL.revokeObjectURL(objectUrl);
                if (!blob) return;

                const compressedKB = (blob.size / 1024).toFixed(1);

                // Always use the SMALLER file (compressed vs original)
                const useWebP = blob.size < file.size;
                const finalFile = useWebP
                    ? new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp', lastModified: Date.now() })
                    : file;

                setData('image', finalFile);
                setCompressionInfo({ originalKB, compressedKB, saved: useWebP });

                // Show preview
                const reader = new FileReader();
                reader.onloadend = () => setImagePreview(reader.result);
                reader.readAsDataURL(finalFile);
            }, 'image/webp', 0.50);
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            // Fallback: use original file
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        };

        img.src = objectUrl;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedContent) return;

        post(route('admin.backgrounds.update', selectedContent.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('تم التحديث بنجاح');
                closeModal();
            },
            onError: () => {
                toast.error('حدث خطأ أثناء التحديث.');
            }
        });
    };

    const handleDelete = () => {
        if (!selectedContent) return;

        if (confirm('هل أنت متأكد من حذف ملف الصورة الحالي؟ سيتم مسح الصورة من المشروع والعودة للوضع الافتراضي، مع إبقاء خيار التعديل متاحاً.')) {
            router.delete(route('admin.backgrounds.destroy', selectedContent.id), {
                onSuccess: () => {
                    toast.success('تم إزالة الصورة بنجاح');
                    closeModal();
                },
                onError: () => {
                    toast.error('حدث خطأ أثناء الإزالة.');
                }
            });
        }
    };

    return (
        <AdminLayout header={
            <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400">wallpaper</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">إدارة الخلفيات</span>
            </div>
        }>
            <Head title="إدارة الخلفيات" />

            {/* Header section  */}
            <div className="flex justify-between items-center bg-white dark:bg-sidebar-dark p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="relative z-10">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3 mb-2">
                        الخلفيات
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        قم بإدارة وتخصيص صور الخلفيات لجميع صفحات الموقع بكل سهولة، مع إمكانية التحكم في درجة تعتيم الخلفية لإبراز النصوص.
                    </p>
                </div>
            </div>

            {/* List Pages and their backgrounds  */}
            {Object.keys(backgroundPages).length === 0 ? (
                <div className="text-center py-20">
                    <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-white/10 mb-4 block">image_not_supported</span>
                    <p className="text-slate-500">لا توجد خلفيات قابلة للتعديل حالياً.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8">
                    {Object.entries(backgroundPages).map(([pageName, contents], idx) => (
                        <div key={idx} className="bg-white dark:bg-sidebar-dark rounded-xl shadow-sm border border-slate-100 dark:border-white/5 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white">{pageName}</h3>
                            </div>
                            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {contents.map(content => {
                                    const imgUrl = content.value
                                        ? (content.value.startsWith('http') || content.value.startsWith('/') ? content.value : `/storage/${content.value}`)
                                        : 'https://via.placeholder.com/400x200?text=No+Background';

                                    const currentOpacity = content.extra_value !== null ? content.extra_value : '50';

                                    return (
                                        <div key={content.id} className="group relative rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm cursor-pointer" onClick={() => openModal(content)}>
                                            <div className="h-40 overflow-hidden relative">
                                                <img src={imgUrl} alt={content.section} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="bg-white/90 text-primary font-bold py-2 px-4 rounded-lg shadow cursor-pointer text-sm">
                                                        تعديل الخلفية
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-white dark:bg-sidebar-dark">
                                                <div className="font-bold text-slate-800 dark:text-white line-clamp-1">{content.section}</div>
                                                <div className="text-xs text-slate-500 mt-1 font-mono">{content.key}</div>
                                                <div className="mt-3 inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                                                    <span className="material-symbols-outlined text-[14px]">opacity</span>
                                                    التعتيم: %{currentOpacity}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="xl">
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            تعديل: {selectedContent?.section} ({selectedContent?.page})
                        </h2>
                        <button type="button" onClick={closeModal} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Image Preview & Upload */}
                        <div>
                            <InputLabel value="صورة الخلفية" className="mb-2" />
                            <div className="relative h-64 w-full bg-slate-100 dark:bg-black/20 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 dark:border-white/10 group flex flex-col items-center justify-center">
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white font-medium flex items-center gap-2 bg-black/50 py-2 px-4 rounded-full">
                                                <span className="material-symbols-outlined">upload</span>
                                                تغيير الصورة
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                                        <span className="material-symbols-outlined text-4xl mb-2">add_photo_alternate</span>
                                        <span>اضغط لرفع صورة جديدة</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <InputError message={errors.image} className="mt-2" />
                            {compressionInfo && (
                                <div className={`mt-2 flex items-center gap-2 text-xs rounded-lg px-3 py-2 border ${
                                    compressionInfo.saved
                                        ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
                                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                                }`}>
                                    <span className="material-symbols-outlined text-[16px]">
                                        {compressionInfo.saved ? 'check_circle' : 'info'}
                                    </span>
                                    <span>
                                        {compressionInfo.saved ? (
                                            <>
                                                تم ضغط الصورة وتحويلها إلى <strong>WebP</strong> ✅ &nbsp;|&nbsp;
                                                الحجم الأصلي: <strong>{compressionInfo.originalKB} KB</strong> &nbsp;→&nbsp;
                                                بعد الضغط: <strong>{compressionInfo.compressedKB} KB</strong>
                                                <span className="mr-1 font-bold">
                                                    &nbsp;(وفّر {(compressionInfo.originalKB - compressionInfo.compressedKB).toFixed(1)} KB — {Math.round((1 - compressionInfo.compressedKB / compressionInfo.originalKB) * 100)}%)
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                ⚠️ الصورة الأصلية أصغر ({compressionInfo.originalKB} KB)، سيتم إرسالها مباشرة بدون تحويل.
                                            </>
                                        )}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Opacity Slider */}
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <InputLabel value={`درجة التعتيم (Opacity) - %${data.opacity}`} />
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={data.opacity}
                                onChange={(e) => setData('opacity', e.target.value)}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-white/10 accent-primary"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-1">
                                <span>شفاف (0%)</span>
                                <span>معتم (100%)</span>
                            </div>
                            <InputError message={errors.opacity} className="mt-2" />
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="mt-8 flex justify-between gap-3 border-t border-slate-100 dark:border-white/10 pt-4">
                        <SecondaryButton
                            type="button"
                            onClick={handleDelete}
                            disabled={processing}
                            className="!text-red-500 !bg-red-500/10 hover:!bg-red-500/20 border-red-500/20 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">delete_forever</span>
                            إزالة الصورة الحالية
                        </SecondaryButton>

                        <div className="flex gap-3">
                            <SecondaryButton onClick={closeModal} disabled={processing}>
                                إلغاء
                            </SecondaryButton>
                            <PrimaryButton disabled={processing} className="flex items-center gap-2">
                                {processing ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin">sync</span>
                                        جاري الحفظ...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-sm">save</span>
                                        حفظ التعديلات
                                    </>
                                )}
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
