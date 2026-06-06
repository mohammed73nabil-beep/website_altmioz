import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function HomeVideo({ videoContents }) {
    const { data, setData, post, processing, errors } = useForm({
        'home.video.type': videoContents['home.video.type'] || 'youtube',
        'home.video.url': videoContents['home.video.url'] || '',
        'home.video.local_path': videoContents['home.video.local_path'] || '',
        'home.video.title': videoContents['home.video.title'] || '',
        'home.video.subtitle': videoContents['home.video.subtitle'] || '',
        'home.video.autoplay': videoContents['home.video.autoplay'] === '1',
        'home.video.thumbnail': null,
        'home.video.file': null,
    });

    // Thumbnail preview and compression info
    const [thumbnailPreview, setThumbnailPreview] = useState(
        videoContents['home.video.thumbnail']
            ? `/storage/${videoContents['home.video.thumbnail']}`
            : null
    );
    const [compressionInfo, setCompressionInfo] = useState(null);
    const [deletingThumb, setDeletingThumb] = useState(false);
    const [deletingFile, setDeletingFile] = useState(false);

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check if it's a video
        if (!file.type.startsWith('video/')) {
            toast.error('يرجى اختيار ملف فيديو صالح.');
            e.target.value = '';
            return;
        }

        // Create a temporary video element to check duration
        const video = document.createElement('video');
        video.preload = 'metadata';

        video.onloadedmetadata = function() {
            window.URL.revokeObjectURL(video.src);
            const duration = video.duration;
            
            if (duration > 60) {
                toast.error('عذراً، يجب ألا تزيد مدة الفيديو عن دقيقة واحدة (60 ثانية).');
                setData('home.video.file', null);
                e.target.value = '';
            } else {
                setData('home.video.file', file);
                toast.success('تم قبول الفيديو، مدته مناسبة.');
            }
        };

        video.src = URL.createObjectURL(file);
    };

    /**
     * Handle thumbnail change: compress + convert to WebP at 90% quality in-browser.
     */
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const originalKB = (file.size / 1024).toFixed(1);
        setCompressionInfo(null);

        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
            // Cap max dimension at 1920px
            const MAX_W = 1920;
            const MAX_H = 1080;
            let { width, height } = img;

            if (width > MAX_W || height > MAX_H) {
                const ratio = Math.min(MAX_W / width, MAX_H / height);
                width  = Math.round(width * ratio);
                height = Math.round(height * ratio);
            }

            const canvas = document.createElement('canvas');
            canvas.width  = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(img, 0, 0, width, height);

            // Convert to WebP at 90% quality
            canvas.toBlob((blob) => {
                URL.revokeObjectURL(objectUrl);
                if (!blob) return;

                const compressedKB = (blob.size / 1024).toFixed(1);
                const useWebP = blob.size < file.size;
                const finalFile = useWebP
                    ? new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp', lastModified: Date.now() })
                    : file;

                setData('home.video.thumbnail', finalFile);
                setCompressionInfo({ originalKB, compressedKB, saved: useWebP });

                // Show preview
                const reader = new FileReader();
                reader.onloadend = () => setThumbnailPreview(reader.result);
                reader.readAsDataURL(finalFile);
            }, 'image/webp', 0.90); // 90% quality
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            setData('home.video.thumbnail', file);
            const reader = new FileReader();
            reader.onloadend = () => setThumbnailPreview(reader.result);
            reader.readAsDataURL(file);
        };

        img.src = objectUrl;
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.home-video.update'), {
            onSuccess: () => {
                toast.success('تم تحديث بيانات الفيديو بنجاح!');
                setData('home.video.file', null);
            },
            onError: () => toast.error('حدث خطأ أثناء التحديث.')
        });
    };

    /**
     * Permanently delete the thumbnail from storage.
     */
    const handleDeleteThumbnail = () => {
        if (!confirm('هل أنت متأكد من حذف الصورة المصغرة نهائياً؟')) return;
        setDeletingThumb(true);
        router.delete(route('admin.home-video.thumbnail.delete'), {
            onSuccess: () => {
                toast.success('تم حذف الصورة المصغرة بنجاح!');
                setThumbnailPreview(null);
                setCompressionInfo(null);
                setData('home.video.thumbnail', null);
            },
            onError: () => toast.error('حدث خطأ أثناء الحذف.'),
            onFinish: () => setDeletingThumb(false),
        });
    };

    /**
     * Permanently delete the local video file from storage.
     */
    const handleDeleteVideoFile = () => {
        if (!confirm('هل أنت متأكد من حذف ملف الفيديو نهائياً من الخادم؟ لا يمكن التراجع عن هذا الإجراء.')) return;
        setDeletingFile(true);
        router.delete(route('admin.home-video.file.delete'), {
            onSuccess: () => {
                toast.success('تم حذف ملف الفيديو بنجاح!');
                setData('home.video.local_path', '');
                setData('home.video.file', null);
                setData('home.video.type', 'youtube');
            },
            onError: () => toast.error('حدث خطأ أثناء حذف الفيديو.'),
            onFinish: () => setDeletingFile(false),
        });
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400">videocam</span>
                    <span className="font-medium text-slate-900 dark:text-white">فيديو الصفحة الرئيسية</span>
                </div>
            }
        >
            <Head title="فيديو الصفحة الرئيسية" />

            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold dark:text-white">إعدادات فيديو المشاريع</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">قم بإضافة فيديو تعريفي لمشاريعك ليظهر في الصفحة الرئيسية.</p>
                </div>

                <div className="bg-white dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-white/5 p-8 shadow-sm">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Video Selection Mode */}
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 mb-6">
                            <p className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">settings</span>
                                نوع الفيديو:
                            </p>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="video_type" 
                                        value="youtube"
                                        checked={data['home.video.type'] === 'youtube'}
                                        onChange={e => setData('home.video.type', e.target.value)}
                                        className="text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm font-medium dark:text-white">رابط يوتيوب/فيميو</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="video_type" 
                                        value="local"
                                        checked={data['home.video.type'] === 'local'}
                                        onChange={e => setData('home.video.type', e.target.value)}
                                        className="text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm font-medium dark:text-white">رفع من الجهاز</span>
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-8">
                            {/* Video URL */}
                            {data['home.video.type'] === 'youtube' && (
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">رابط الفيديو (YouTube / Vimeo)</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">link</span>
                                        <input
                                            type="text"
                                            value={data['home.video.url']}
                                            onChange={e => setData('home.video.url', e.target.value)}
                                            className="w-full pr-12 pl-4 py-3 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl focus:ring-primary focus:border-primary text-sm transition-all dark:text-white"
                                            placeholder="https://www.youtube.com/watch?v=..."
                                            dir="ltr"
                                        />
                                    </div>
                                    {errors['home.video.url'] && <div className="text-red-500 text-xs mt-1">{errors['home.video.url']}</div>}
                                </div>
                            )}

                            {/* Video Upload */}
                            {data['home.video.type'] === 'local' && (
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">رفع فيديو من الجهاز (أقل من دقيقة)</label>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={handleVideoChange}
                                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer transition-all"
                                    />

                                    {/* Existing video indicator + delete button */}
                                    {data['home.video.local_path'] && !data['home.video.file'] && (
                                        <div className="mt-3 flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/40 rounded-xl">
                                            <span className="material-symbols-outlined text-green-600 dark:text-green-400">check_circle</span>
                                            <div className="flex-1">
                                                <p className="text-xs font-bold text-green-700 dark:text-green-400">يوجد فيديو مرفوع مسبقاً</p>
                                                <p className="text-[10px] text-green-600 dark:text-green-500 font-mono mt-0.5 truncate max-w-xs">{data['home.video.local_path']}</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleDeleteVideoFile}
                                                disabled={deletingFile}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
                                            >
                                                {deletingFile ? (
                                                    <span className="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></span>
                                                ) : (
                                                    <span className="material-symbols-outlined text-sm">delete_forever</span>
                                                )}
                                                حذف الفيديو نهائياً
                                            </button>
                                        </div>
                                    )}
                                    {errors['home.video.file'] && <div className="text-red-500 text-xs mt-1">{errors['home.video.file']}</div>}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">عنوان القسم</label>
                                <input
                                    type="text"
                                    value={data['home.video.title']}
                                    onChange={e => setData('home.video.title', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl focus:ring-primary focus:border-primary text-sm transition-all dark:text-white"
                                    placeholder="شاهد كيف نحوّل مساحتك إلى تحفة فنية"
                                />
                                {errors['home.video.title'] && <div className="text-red-500 text-xs mt-1">{errors['home.video.title']}</div>}
                            </div>

                            {/* Subtitle */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">وصف قصير</label>
                                <input
                                    type="text"
                                    value={data['home.video.subtitle']}
                                    onChange={e => setData('home.video.subtitle', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl focus:ring-primary focus:border-primary text-sm transition-all dark:text-white"
                                    placeholder="أكثر من 150 مشروع ديكورات مودرن منجز..."
                                />
                                {errors['home.video.subtitle'] && <div className="text-red-500 text-xs mt-1">{errors['home.video.subtitle']}</div>}
                            </div>
                        </div>

                        {/* Autoplay Toggle */}
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${data['home.video.autoplay'] ? 'bg-primary/20 text-primary' : 'bg-slate-200 dark:bg-white/10 text-slate-400'}`}>
                                    <span className="material-symbols-outlined">{data['home.video.autoplay'] ? 'play_circle' : 'pause_circle'}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold dark:text-white">تشغيل تلقائي للفيديو</p>
                                    <p className="text-[11px] text-slate-500">سيتم تشغيل الفيديو تلقائياً مع الصوت بمجرد تحميل الصفحة. (ملاحظة: قد تقوم بعض المتصفحات بحظر الصوت تلقائياً إلا إذا قام المستخدم بالتفاعل مع الصفحة أولاً).</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setData('home.video.autoplay', !data['home.video.autoplay'])}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${data['home.video.autoplay'] ? 'bg-primary' : 'bg-slate-300 dark:bg-white/20'}`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data['home.video.autoplay'] ? '-translate-x-6' : '-translate-x-1'}`}
                                />
                            </button>
                        </div>

                        {/* Thumbnail */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">صورة خلفية الفيديو (اختياري)</label>
                            
                            {/* Thumbnail Preview Box */}
                            <div className="relative group rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 h-52 flex items-center justify-center mb-3">
                                {thumbnailPreview ? (
                                    <>
                                        <img
                                            src={thumbnailPreview}
                                            alt="صورة مصغرة"
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                            <label className="flex items-center gap-2 bg-white/90 text-slate-900 font-bold py-2 px-4 rounded-lg cursor-pointer text-sm hover:bg-white transition-colors">
                                                <span className="material-symbols-outlined text-sm">upload</span>
                                                تغيير الصورة
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleThumbnailChange}
                                                />
                                            </label>
                                            {videoContents['home.video.thumbnail'] && (
                                                <button
                                                    type="button"
                                                    onClick={handleDeleteThumbnail}
                                                    disabled={deletingThumb}
                                                    className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors disabled:opacity-50"
                                                >
                                                    {deletingThumb ? (
                                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                    ) : (
                                                        <span className="material-symbols-outlined text-sm">delete_forever</span>
                                                    )}
                                                    حذف الصورة
                                                </button>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-4xl mb-2">add_photo_alternate</span>
                                        <span className="text-sm font-medium">اضغط لرفع صورة خلفية الفيديو</span>
                                        <span className="text-xs mt-1 text-slate-400">ستُحوَّل تلقائياً إلى WebP بجودة 90%</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleThumbnailChange}
                                        />
                                    </label>
                                )}
                            </div>

                            {/* Compression Info */}
                            {compressionInfo && (
                                <div className={`flex items-center gap-2 text-xs rounded-xl px-3 py-2 border mb-2 ${
                                    compressionInfo.saved
                                        ? 'bg-primary/10 text-primary border-primary/20'
                                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                                }`}>
                                    <span className="material-symbols-outlined text-[16px]">
                                        {compressionInfo.saved ? 'check_circle' : 'info'}
                                    </span>
                                    <span>
                                        {compressionInfo.saved ? (
                                            <>
                                                تم ضغط الصورة وتحويلها إلى <strong>WebP</strong> بجودة 90% ✅ &nbsp;|&nbsp;
                                                الحجم الأصلي: <strong>{compressionInfo.originalKB} KB</strong> &nbsp;→&nbsp;
                                                بعد الضغط: <strong>{compressionInfo.compressedKB} KB</strong>
                                                <span className="mr-1 font-bold">
                                                    &nbsp;(وُفِّر {(compressionInfo.originalKB - compressionInfo.compressedKB).toFixed(1)} KB — {Math.round((1 - compressionInfo.compressedKB / compressionInfo.originalKB) * 100)}%)
                                                </span>
                                            </>
                                        ) : (
                                            <>⚠️ الصورة الأصلية أصغر ({compressionInfo.originalKB} KB)، سيتم إرسالها بدون تحويل.</>
                                        )}
                                    </span>
                                </div>
                            )}

                            <p className="text-[10px] text-slate-500">إذا تركتها فارغة، سيتم سحب الصورة تلقائياً من YouTube.</p>
                            {errors['home.video.thumbnail'] && <div className="text-red-500 text-xs mt-1">{errors['home.video.thumbnail']}</div>}
                        </div>

                        <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full md:w-auto px-8 py-3.5 bg-primary text-sidebar-dark font-black rounded-xl hover:brightness-110 shadow-[0_10px_20px_rgba(201,162,39,0.2)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-sidebar-dark border-t-transparent rounded-full animate-spin"></span>
                                        جاري الحفظ...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">save</span>
                                        حفظ الإعدادات
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Preview Box */}
                {(data['home.video.type'] === 'youtube' && data['home.video.url']) || (data['home.video.type'] === 'local' && (data['home.video.file'] || data['home.video.local_path'])) ? (
                    <div className="mt-8 bg-slate-900 rounded-2xl p-4 border border-white/5 shadow-2xl">
                        <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest mb-3 px-2">معاينة الفيديو</p>
                        <div className="aspect-video rounded-xl overflow-hidden bg-black">
                            {data['home.video.type'] === 'local' ? (
                                data['home.video.file'] ? (
                                    <video
                                        src={URL.createObjectURL(data['home.video.file'])}
                                        className="w-full h-full"
                                        controls
                                    />
                                ) : (
                                    <video
                                        src={`/storage/${data['home.video.local_path']}`}
                                        className="w-full h-full"
                                        controls
                                    />
                                )
                            ) : data['home.video.url'].includes('youtube.com') || data['home.video.url'].includes('youtu.be') ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${data['home.video.url'].match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1]}`}
                                    className="w-full h-full border-0"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/20">
                                    <span className="material-symbols-outlined text-6xl">play_circle</span>
                                </div>
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
        </AdminLayout>
    );
}
