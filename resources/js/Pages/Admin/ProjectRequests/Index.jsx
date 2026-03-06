import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function ProjectRequestsIndex({ requests = { data: [] } }) {
    const [selectedRequest, setSelectedRequest] = useState(null);

    const updateStatus = (id, newStatus) => {
        router.put(route('admin.project-requests.status', id), { status: newStatus }, {
            preserveScroll: true,
            onSuccess: () => toast.success('تم تحديث حالة الطلب بنجاح'),
            onError: () => toast.error('حدث خطأ أثناء تحديث الحالة')
        });
    };

    const deleteRequest = (id) => {
        if (confirm('هل أنت متأكد من حذف هذا الطلب نهائياً؟')) {
            router.delete(route('admin.project-requests.destroy', id), {
                preserveScroll: true,
                onSuccess: () => toast.success('تم حذف الطلب بنجاح')
            });
        }
    };

    // Helper to format status badges
    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20',
            reviewed: 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
            accepted: 'bg-green-500/10 text-green-500 border border-green-500/20',
            rejected: 'bg-red-500/10 text-red-500 border border-red-500/20',
        };
        const labels = {
            pending: 'قيد الانتظار',
            reviewed: 'تمت المراجعة',
            accepted: 'مقبول',
            rejected: 'مرفوض',
        };

        return (
            <span className={`inline-flex px-2.5 py-1 rounded-md text-[11px] font-bold ${styles[status] || styles.pending}`}>
                {labels[status] || labels.pending}
            </span>
        );
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400">assignment</span>
                    <span className="font-medium text-slate-900 dark:text-white">الطلبات الجديدة</span>
                </div>
            }
        >
            <Head title="إدارة طلبات المشاريع" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold dark:text-white">طلبات المشاريع الواردة</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">إدارة ومراجعة الطلبات الواردة من صفحة "ابدأ مشروعك".</p>
                </div>
            </div>

            {/* Requests Table */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden">
                <div className="p-0 overflow-x-auto">
                    <table className="w-full text-right text-sm">
                        <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400">
                            <tr>
                                <th className="px-6 py-4 font-bold decoration-none">تاريخ الطلب</th>
                                <th className="px-6 py-4 font-bold decoration-none">معلومات العميل</th>
                                <th className="px-6 py-4 font-bold decoration-none">نوع المشروع</th>
                                <th className="px-6 py-4 font-bold decoration-none">الحالة</th>
                                <th className="px-6 py-4 font-bold decoration-none w-48">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {requests.data.length > 0 ? (
                                requests.data.map((req) => (
                                    <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                            <div className="font-mono text-xs" dir="ltr">{new Date(req.created_at).toLocaleDateString('en-GB')}</div>
                                            <div className="text-[10px] text-slate-400 mt-1">{new Date(req.created_at).toLocaleTimeString('ar-EG')}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900 dark:text-white">{req.client_name}</div>
                                            <div className="text-xs text-slate-500">{req.company_name || 'أفراد'}</div>
                                            <a href={`mailto:${req.client_email}`} className="text-[11px] text-primary hover:underline mt-1 block">{req.client_email}</a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-700 dark:text-slate-300">{req.project_type}</div>
                                            <div className="text-xs text-slate-500 mt-1">الميزانية: <span dir="ltr">{req.budget_range || 'غير محدد'}</span></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(req.status)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={req.status}
                                                    onChange={(e) => updateStatus(req.id, e.target.value)}
                                                    className="px-2 py-1.5 bg-slate-100 dark:bg-white/5 border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded text-xs transition-all dark:text-white"
                                                >
                                                    <option value="pending">قيد الانتظار</option>
                                                    <option value="reviewed">تمت المراجعة</option>
                                                    <option value="accepted">مقبول</option>
                                                    <option value="rejected">مرفوض</option>
                                                </select>

                                                <button
                                                    onClick={() => setSelectedRequest(req)}
                                                    className="w-8 h-8 rounded-lg text-primary hover:bg-primary/10 flex items-center justify-center transition-colors border border-transparent hover:border-primary/20"
                                                    title="عرض التفاصيل"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                                                </button>

                                                <button
                                                    onClick={() => deleteRequest(req.id)}
                                                    className="w-8 h-8 rounded-lg text-red-500 hover:bg-red-500/10 flex items-center justify-center transition-colors border border-transparent hover:border-red-500/20"
                                                    title="حذف"
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
                                            <span className="material-symbols-outlined text-4xl mb-3">inbox</span>
                                            <p className="font-medium text-lg">لا يوجد طلبات جديدة</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls could go here if links are passed */}
            </div>

            {/* Request Details Modal */}
            {selectedRequest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-white/5 sticky top-0">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">description</span>
                                تفاصيل طلب المشروع
                            </h3>
                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="w-8 h-8 rounded-lg text-slate-400 hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors border border-transparent hover:border-white/10"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                {/* Details Column 1 */}
                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 border-b border-slate-200 dark:border-white/5 pb-2 mb-4">بيانات العميل</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-[11px] text-slate-500 mb-1">الاسم الكامل</div>
                                            <div className="font-bold text-slate-900 dark:text-white">{selectedRequest.client_name}</div>
                                        </div>
                                        <div>
                                            <div className="text-[11px] text-slate-500 mb-1">البريد الإلكتروني</div>
                                            <div className="font-medium text-slate-900 dark:text-white" dir="ltr">{selectedRequest.client_email}</div>
                                        </div>
                                        <div>
                                            <div className="text-[11px] text-slate-500 mb-1">اسم الشركة (إن وجد)</div>
                                            <div className="font-medium text-slate-900 dark:text-white">{selectedRequest.company_name || 'لا يوجد'}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Details Column 2 */}
                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 border-b border-slate-200 dark:border-white/5 pb-2 mb-4">متطلبات المشروع</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-[11px] text-slate-500 mb-1">نوع المشروع المطلوب</div>
                                            <div className="font-bold text-slate-900 dark:text-white">{selectedRequest.project_type}</div>
                                        </div>
                                        <div>
                                            <div className="text-[11px] text-slate-500 mb-1">الميزانية المقترحة</div>
                                            <div className="font-medium text-slate-900 dark:text-white" dir="ltr">{selectedRequest.budget_range || 'غير محدد'}</div>
                                        </div>
                                        <div>
                                            <div className="text-[11px] text-slate-500 mb-1">تاريخ ووقت الإرسال</div>
                                            <div className="font-medium text-slate-900 dark:text-white text-sm" dir="ltr">
                                                {new Date(selectedRequest.created_at).toLocaleString('en-GB')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Full width details text */}
                            <div className="mb-6">
                                <h4 className="text-sm font-bold text-slate-400 border-b border-slate-200 dark:border-white/5 pb-2 mb-4">تفاصيل الطلب الدقيقة</h4>
                                <div className="bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-white/5 rounded-xl p-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                                    {selectedRequest.project_details}
                                </div>
                            </div>

                            {/* Attachments if any */}
                            {selectedRequest.attachments && (
                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 border-b border-slate-200 dark:border-white/5 pb-2 mb-4">المرفقات</h4>
                                    <div className="flex gap-3">
                                        {/* Assuming attachments might just be a path for now */}
                                        <a href={`/storage/${selectedRequest.attachments}`} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-bold transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">download</span>
                                            تحميل المرفق
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/5 flex gap-3 sticky bottom-0">
                            <button
                                onClick={() => {
                                    updateStatus(selectedRequest.id, 'accepted');
                                    setSelectedRequest({ ...selectedRequest, status: 'accepted' });
                                }}
                                className="flex-1 bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                قبول مبدئي
                            </button>
                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="px-8 bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white font-bold py-3 rounded-lg hover:bg-slate-300 dark:hover:bg-white/20 transition-all"
                            >
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
