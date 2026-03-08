import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function PostsIndex({ posts = { data: [], links: [] } }) {

    const deletePost = (slug) => {
        if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
            router.delete(route('admin.posts.destroy', slug), {
                preserveScroll: true,
                onSuccess: () => toast.success('تم حذف المقال بنجاح')
            });
        }
    };

    const togglePublish = (slug) => {
        router.post(route('admin.posts.toggle-publish', slug), {}, {
            preserveScroll: true,
            onSuccess: () => toast.success('تم تحديث حالة النشر')
        });
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400">article</span>
                    <span className="font-medium text-slate-900 dark:text-white">ادارة مقالات المدونة (Blog)</span>
                </div>
            }
        >
            <Head title="إدارة المدونة" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold dark:text-white">إدارة المدونة</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">أضف مقالات مفيدة لعملائك لزيادة التفاعل وتحسين محركات البحث.</p>
                </div>
                <Link
                    href={route('admin.posts.create')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-sidebar-dark font-bold rounded-lg hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                >
                    <span className="material-symbols-outlined text-[20px]">add_circle</span>
                    <span>إضافة مقال جديد</span>
                </Link>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden mt-6">
                <div className="p-0 overflow-x-auto">
                    <table className="w-full text-right text-sm">
                        <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400">
                            <tr>
                                <th className="px-6 py-4 font-bold">الصورة</th>
                                <th className="px-6 py-4 font-bold">عنوان المقال</th>
                                <th className="px-6 py-4 font-bold">التصنيف</th>
                                <th className="px-6 py-4 font-bold">المشاهدات</th>
                                <th className="px-6 py-4 font-bold">الحالة</th>
                                <th className="px-6 py-4 font-bold w-32">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {posts.data.length > 0 ? (
                                posts.data.map((post) => (
                                    <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            {post.image ? (
                                                <img src={`/storage/${post.image}`} alt={post.title} className="h-12 w-16 object-cover rounded-lg border border-white/10" />
                                            ) : (
                                                <div className="h-12 w-16 bg-slate-100 dark:bg-white/5 rounded-lg flex items-center justify-center text-slate-400">
                                                    <span className="material-symbols-outlined">image</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-bold">
                                            {post.title}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">
                                            {post.category ? post.category.name : 'بدون تصنيف'}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">
                                            {post.views}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => togglePublish(post.slug)}
                                                className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${post.is_published ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : 'bg-slate-500/10 text-slate-500 hover:bg-slate-500/20'}`}
                                            >
                                                {post.is_published ? 'منشور' : 'مسودة'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={route('admin.posts.edit', post.slug)}
                                                    className="w-8 h-8 rounded-lg text-blue-500 hover:bg-blue-500/10 flex items-center justify-center transition-colors"
                                                    title="تعديل المقال"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                </Link>
                                                <button
                                                    onClick={() => deletePost(post.slug)}
                                                    className="w-8 h-8 rounded-lg text-red-500 hover:bg-red-500/10 flex items-center justify-center transition-colors"
                                                    title="حذف المقال"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-16 text-center text-slate-500 dark:text-slate-400">
                                        <div className="flex flex-col items-center justify-center opacity-50">
                                            <span className="material-symbols-outlined text-4xl mb-3">article</span>
                                            <p className="font-medium text-lg">لا توجد مقالات لعرضها</p>
                                            <p className="text-xs mt-1">انقر على "إضافة مقال جديد" للبدء</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination placeholder, assuming standard Laravel pagination structure is available or using simple links map */}
            <div className="mt-4 flex justify-center gap-2">
                {posts.links && posts.links.map((link, idx) => (
                    <Link
                        key={idx}
                        href={link.url || '#'}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`px-3 py-1 rounded border ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-white/10'} ${link.active ? 'bg-primary text-black font-bold' : 'dark:text-white dark:border-white/20'}`}
                    />
                ))}
            </div>
        </AdminLayout>
    );
}
