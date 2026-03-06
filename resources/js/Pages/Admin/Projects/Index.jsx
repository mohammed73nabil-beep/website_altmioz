import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function ProjectsIndex({ projects = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    // Form handling
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        title_ar: '',
        title_en: '',
        category: '',
        description_ar: '',
        status: 'In Progress',
        image_before: null,
        image_after: null,
    });

    const openAddModal = () => {
        setEditingProject(null);
        clearErrors();
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (project) => {
        setEditingProject(project);
        clearErrors();
        setData({
            title_ar: project.title_ar || project.title_en || project.title || '',
            title_en: project.title_en || '',
            category: project.category || '',
            description_ar: project.description_ar || project.description || '',
            status: project.status || 'In Progress',
            image_before: null,
            image_after: null,
        });
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();

        if (editingProject) {
            post(route('admin.projects.update', editingProject.id), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setIsModalOpen(false);
                    setEditingProject(null);
                    toast.success('تم تعديل المشروع بنجاح!');
                },
                onError: () => {
                    toast.error('حدث خطأ أثناء تعديل المشروع. يرجى التحقق من المدخلات.');
                }
            });
        } else {
            post(route('admin.projects.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setIsModalOpen(false);
                    toast.success('تمت إضافة المشروع بنجاح!');
                },
                onError: () => {
                    toast.error('حدث خطأ أثناء إضافة المشروع. يرجى التحقق من المدخلات.');
                }
            });
        }
    };

    const deleteProject = (id) => {
        if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
            router.delete(route('admin.projects.destroy', id), {
                preserveScroll: true,
                onSuccess: () => toast.success('تم حذف المشروع بنجاح')
            });
        }
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400">architecture</span>
                    <span className="font-medium text-slate-900 dark:text-white">سجل الأعمال (Portfolio)</span>
                </div>
            }
        >
            <Head title="إدارة سجل الأعمال" />

            {/* Quick Actions & Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold dark:text-white">إدارة سجل الأعمال</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">أضف أعمالك المميزة ليراها العملاء في الصفحة الرئيسية.</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-sidebar-dark font-bold rounded-lg hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                >
                    <span className="material-symbols-outlined text-[20px]">add_circle</span>
                    <span>إضافة مشروع جديد</span>
                </button>
            </div>

            {/* Content Table */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden mt-6">
                <div className="p-0 overflow-x-auto">
                    <table className="w-full text-right text-sm">
                        <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400">
                            <tr>
                                <th className="px-6 py-4 font-bold">صورة المشروع</th>
                                <th className="px-6 py-4 font-bold">اسم المشروع</th>
                                <th className="px-6 py-4 font-bold">النوع</th>
                                <th className="px-6 py-4 font-bold">الحالة</th>
                                <th className="px-6 py-4 font-bold w-32">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {projects.length > 0 ? (
                                projects.map((project) => (
                                    <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            {project.image_path ? (
                                                <img src={`/storage/${project.image_path}`} alt={project.title_ar} className="h-12 w-16 object-cover rounded-lg border border-white/10" />
                                            ) : (
                                                <div className="h-12 w-16 bg-slate-100 dark:bg-white/5 rounded-lg flex items-center justify-center text-slate-400">
                                                    <span className="material-symbols-outlined">image</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-bold">
                                            {project.title_ar || project.title_en}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">
                                            {project.category}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold ${project.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                                                }`}>
                                                {project.status === 'Completed' ? 'مكتمل' : 'قيد التنفيذ'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => openEditModal(project)}
                                                    className="w-8 h-8 rounded-lg text-blue-500 hover:bg-blue-500/10 flex items-center justify-center transition-colors"
                                                    title="تعديل المشروع"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                </button>
                                                <button
                                                    onClick={() => deleteProject(project.id)}
                                                    className="w-8 h-8 rounded-lg text-red-500 hover:bg-red-500/10 flex items-center justify-center transition-colors"
                                                    title="حذف المشروع"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-16 text-center text-slate-500 dark:text-slate-400">
                                        <div className="flex flex-col items-center justify-center opacity-50">
                                            <span className="material-symbols-outlined text-4xl mb-3">inventory_2</span>
                                            <p className="font-medium text-lg">لا يوجد مشاريع لعرضها</p>
                                            <p className="text-xs mt-1">انقر على "إضافة مشروع جديد" للبدء</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Project Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-sidebar-dark rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-white/10">
                        <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-white/5">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">{editingProject ? 'edit' : 'add_circle'}</span>
                                {editingProject ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-8 h-8 rounded-lg text-slate-400 hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Project Name */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">اسم المشروع <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={data.title_ar}
                                            onChange={e => setData('title_ar', e.target.value)}
                                            className="w-full px-4 py-2.5 bg-slate-100 dark:bg-white/5 border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-sm transition-all dark:text-white"
                                            placeholder="مثال: كرفان سياحي VIP"
                                        />
                                        {errors.title_ar && <span className="text-red-500 text-xs mt-1">{errors.title_ar}</span>}
                                    </div>

                                    {/* Caravan Type */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">نوع الكرفان <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={data.category}
                                            onChange={e => setData('category', e.target.value)}
                                            className="w-full px-4 py-2.5 bg-slate-100 dark:bg-white/5 border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-sm transition-all dark:text-white"
                                            placeholder="مثال: سحب، سيارة، تجاري..."
                                        />
                                        {errors.category && <span className="text-red-500 text-xs mt-1">{errors.category}</span>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">الحالة <span className="text-red-500">*</span></label>
                                        <select
                                            value={data.status}
                                            onChange={e => setData('status', e.target.value)}
                                            className="w-full px-4 py-2.5 bg-slate-100 dark:bg-white/5 border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-sm transition-all dark:text-white"
                                        >
                                            <option value="In Progress">قيد التنفيذ (In Progress)</option>
                                            <option value="Completed">مكتمل (Completed)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Images */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-200 dark:border-white/5">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">صورة (قبل)</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setData('image_before', e.target.files[0])}
                                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-[#dba61f]/10 file:text-[#dba61f] hover:file:bg-[#dba61f]/20 cursor-pointer"
                                        />
                                        <p className="text-[10px] text-slate-500 mt-1">اختياري: يعرض للعملاء كيفية تطوير الكرفان. {editingProject && "دعه فارغاً للإبقاء على الصورة الحالية"}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">صورة (بعد) {!editingProject && <span className="text-red-500">*</span>}</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => setData('image_after', e.target.files[0])}
                                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-[#dba61f]/10 file:text-[#dba61f] hover:file:bg-[#dba61f]/20 cursor-pointer"
                                        />
                                        <p className="text-[10px] text-slate-500 mt-1">الصورة النهائية للمشروع والتي ستكون البانر. {editingProject && "دعه فارغاً للإبقاء على الصورة الحالية"}</p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 bg-primary text-sidebar-dark font-bold py-3 rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
                                    >
                                        {processing ? 'جاري الحفظ...' : 'حفظ المشروع'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 bg-slate-200 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold py-3 rounded-lg hover:bg-slate-300 dark:hover:bg-white/10 transition-all"
                                    >
                                        إلغاء
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
