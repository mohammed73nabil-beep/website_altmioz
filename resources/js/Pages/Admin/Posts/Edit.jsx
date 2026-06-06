import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function PostEdit({ post, categories = [] }) {
    const { data, setData, post: submitPost, processing, errors } = useForm({
        _method: 'PUT',
        title: post.title || '',
        slug: post.slug || '',
        category_id: post.category_id || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        image: null, // Keep null; file upload uses different field if not updated
        meta_title: post.meta_title || '',
        meta_description: post.meta_description || '',
        is_published: post.is_published ? true : false,
        published_at: post.published_at ? post.published_at.replace(' ', 'T').slice(0, 16) : '',
    });

    const submit = (e) => {
        e.preventDefault();
        submitPost(route('admin.posts.update', post.slug), {
            onSuccess: () => toast.success('تم تعديل المقال بنجاح!'),
            onError: () => toast.error('يرجى التحقق من المدخلات والمحاولة مرة أخرى.')
        });
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400">article</span>
                    <span className="font-medium text-slate-900 dark:text-white">تعديل المقال</span>
                </div>
            }
        >
            <Head title="تعديل المقال" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold dark:text-white">تعديل المقال: {post.title}</h2>
                </div>
                <Link
                    href={route('admin.posts.index')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-200 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-white/10 transition-all"
                >
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    <span>عودة للمدونة</span>
                </Link>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden">
                <form onSubmit={submit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">عنوان المقال <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-100 dark:bg-white/5 border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-sm transition-all dark:text-white"
                                required
                            />
                            {errors.title && <span className="text-red-500 text-xs mt-1">{errors.title}</span>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">التصنيف</label>
                            <select
                                value={data.category_id}
                                onChange={e => setData('category_id', e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-100 dark:bg-white/5 border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-sm transition-all dark:text-white"
                            >
                                <option value="">بدون تصنيف</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <span className="text-red-500 text-xs mt-1">{errors.category_id}</span>}
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">مقتطف قصير</label>
                        <textarea
                            value={data.excerpt}
                            onChange={e => setData('excerpt', e.target.value)}
                            rows="2"
                            className="w-full px-4 py-2.5 bg-slate-100 dark:bg-white/5 border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-sm transition-all dark:text-white resize-none"
                        ></textarea>
                        {errors.excerpt && <span className="text-red-500 text-xs mt-1">{errors.excerpt}</span>}
                    </div>

                    {/* Content (Rich Text) */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">محتوى المقال <span className="text-red-500">*</span></label>
                        <div className="bg-white dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 dark:text-white">
                            <ReactQuill
                                theme="snow"
                                value={data.content}
                                onChange={(content) => setData('content', content)}
                                className="h-64 mb-12"
                            />
                        </div>
                        {errors.content && <span className="text-red-500 text-xs mt-1">{errors.content}</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-white/5">
                        {/* Image */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">صورة الغلاف الجديدة</label>
                            {post.image && (
                                <div className="mb-3">
                                    <img src={`/storage/${post.image}`} alt="Current cover" className="h-20 w-auto rounded border border-slate-200 dark:border-white/10" />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setData('image', e.target.files[0])}
                                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-[#C5A059]/10 file:text-[#C5A059] hover:file:bg-[#C5A059]/20 cursor-pointer"
                            />
                            <p className="text-[10px] text-slate-500 mt-1">دع الحقل فارغاً للاحتفاظ بالصورة الحالية.</p>
                            {errors.image && <span className="text-red-500 text-xs mt-1">{errors.image}</span>}
                        </div>

                        {/* Slug & Meta details */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">رابط URL (Slug)</label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={e => setData('slug', e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-100 dark:bg-white/5 border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-sm transition-all dark:text-white"
                                />
                                {errors.slug && <span className="text-red-500 text-xs mt-1">{errors.slug}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">عنوان SEO</label>
                                <input
                                    type="text"
                                    value={data.meta_title}
                                    onChange={e => setData('meta_title', e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-100 dark:bg-white/5 border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-sm transition-all dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">وصف SEO</label>
                                <textarea
                                    value={data.meta_description}
                                    onChange={e => setData('meta_description', e.target.value)}
                                    rows="2"
                                    className="w-full px-4 py-2 bg-slate-100 dark:bg-white/5 border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-sm transition-all dark:text-white resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-white/5">
                        <div className="flex items-center h-full">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.is_published}
                                    onChange={e => setData('is_published', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-white/20 peer-checked:bg-primary"></div>
                                <span className="ml-3 text-sm font-medium text-slate-900 dark:text-slate-300 mr-3">نشر المقال</span>
                            </label>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">تاريخ النشر</label>
                            <input
                                type="datetime-local"
                                value={data.published_at || ''}
                                onChange={e => setData('published_at', e.target.value)}
                                className="w-full px-4 py-2 bg-slate-100 dark:bg-white/5 border-[1px] border-slate-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-sm transition-all dark:text-white"
                            />
                            <p className="text-[10px] text-slate-500 mt-1">إذا ترك فارغاً سيتم تعيين الوقت الحالي عند حفظ المقال كمنشور.</p>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200 dark:border-white/5">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-primary text-sidebar-dark font-bold py-3 px-8 rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
                        >
                            {processing ? 'جاري الحفظ...' : 'تحديث المقال'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
