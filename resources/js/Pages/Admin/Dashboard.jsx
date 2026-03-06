import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import DynamicIcon from '@/Components/DynamicIcon';

export default function Dashboard({ pendingRequestsCount, totalProjects, recentProjects = [], systemHealth }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // مكونات مساعدة
    const StatSkeleton = () => (
        <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl border border-slate-200 dark:border-white/5 animate-pulse">
            <div className="flex justify-between items-start mb-4">
                <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-1/3"></div>
                <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-white/10"></div>
            </div>
            <div className="h-8 bg-slate-200 dark:bg-white/10 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-slate-200 dark:bg-white/10 rounded w-1/2"></div>
        </div>
    );

    const StatCard = ({ icon, iconBgColor, iconColor, label, value, link, extra, extraColor, extraIcon }) => (
        <Link href={link} className="block bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-[#dba61f]/50 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-[#dba61f]/5">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 ${iconBgColor} rounded-xl ${iconColor} group-hover:scale-110 group-hover:bg-[#dba61f]/10 group-hover:text-[#dba61f] transition-all duration-300`}>
                    <DynamicIcon name={icon} />
                </div>
                <div className="text-left">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 group-hover:text-[#dba61f] transition-colors">{value}</h3>
                </div>
            </div>
            {extra && (
                <div className={`text-[11px] ${extraColor} font-medium flex items-center gap-1 group-hover:underline`}>
                    {extraIcon && <DynamicIcon name={extraIcon} className="text-[14px]" />}
                    {extra}
                </div>
            )}
        </Link>
    );

    const RecentProjectsTable = ({ projects, isLoading }) => {
        if (isLoading) {
            return (
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {[...Array(3)].map((_, i) => (
                        <tr key={i} className="animate-pulse">
                            <td className="px-6 py-4"><div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-32"></div></td>
                            <td className="px-6 py-4"><div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-24"></div></td>
                            <td className="px-6 py-4"><div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-20"></div></td>
                        </tr>
                    ))}
                </tbody>
            );
        }

        if (projects.length === 0) {
            return (
                <tbody>
                    <tr>
                        <td colSpan="3" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                            <div className="flex flex-col items-center justify-center opacity-50">
                                <DynamicIcon name="inventory_2" className="text-4xl mb-2" />
                                <p>لا يوجد مشاريع حتى الآن.</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            );
        }

        return (
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-medium">
                            {project.title_ar || project.title_en}
                        </td>
                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                            {project.category ?? 'كرفان'}
                        </td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold ${project.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                                }`}>
                                {project.status === 'Completed' ? 'مكتمل' : 'قيد التنفيذ'}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        );
    };

    const SystemHealth = ({ health, isLoading }) => {
        if (isLoading) {
            return (
                <div className="space-y-4 animate-pulse">
                    <div className="h-16 bg-slate-200 dark:bg-white/10 rounded-xl"></div>
                    <div className="h-16 bg-slate-200 dark:bg-white/10 rounded-xl"></div>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
                    <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Uptime</h4>
                        <span className="text-[#dba61f] text-sm font-bold">{health?.uptime}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">وقت التشغيل للخادم</p>
                    <div className="w-full bg-slate-200 dark:bg-[#2a2a2a] h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-[#dba61f] h-1.5 rounded-full w-[99%]"></div>
                    </div>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
                    <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">قاعدة البيانات</h4>
                        {health?.dbConnected ? (
                            <span className="text-green-500 text-[11px] font-bold px-2 py-0.5 bg-green-500/10 rounded">متصل</span>
                        ) : (
                            <span className="text-red-500 text-[11px] font-bold px-2 py-0.5 bg-red-500/10 rounded">غير متصل</span>
                        )}
                    </div>
                    <p className="text-[11px] text-slate-500">حالة الاتصال بالبيانات</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
                    <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">معدل اكتمال الطلبات</h4>
                        <span className="text-[#dba61f] text-sm font-bold">{health?.completionRate}%</span>
                    </div>
                    <p className="text-[11px] text-slate-500">مقارنة بالمشاريع المسجلة</p>
                    <div className="w-full bg-slate-200 dark:bg-[#2a2a2a] h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-[#dba61f] h-1.5 rounded-full transition-all duration-1000" style={{ width: `${health?.completionRate || 0}%` }}></div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <AdminLayout
            header={
                <>
                    <DynamicIcon name="home" className="text-sm" />
                    <span>الرئيسية</span>
                    <DynamicIcon name="chevron_left" className="text-xs" />
                    <span className="text-slate-900 dark:text-slate-100 font-medium">نظرة عامة</span>
                </>
            }
        >
            <Head title="لوحة التحكم" />

            {/* Welcome Banner */}
            <div className="bg-gradient-to-l from-[#dba61f] to-[#b38615] rounded-2xl p-8 relative overflow-hidden shadow-lg shadow-[#dba61f]/20">
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white mb-2">نظرة عامة على النظام</h2>
                    <p className="text-white/80 max-w-xl">مرحباً بك مجدداً، إليك آخر التحديثات لمشاريع الكرفانات.</p>
                    <div className="mt-6 flex flex-wrap gap-4">
                        <Link href={route('admin.projects.index')} className="bg-black/20 hover:bg-black/30 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 backdrop-blur-sm">
                            <DynamicIcon name="add_circle" className="text-[20px]" />
                            إضافة مشروع جديد
                        </Link>
                        <Link href={route('admin.content.index')} className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 backdrop-blur-sm border border-white/20">
                            <DynamicIcon name="campaign" className="text-[20px]" />
                            تعديل المحتوى
                        </Link>
                        <a href={route('home')} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 backdrop-blur-sm border border-white/20">
                            <DynamicIcon name="open_in_new" className="text-[20px]" />
                            زيارة الموقع
                        </a>
                    </div>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {isLoading ? (
                    <>
                        <StatSkeleton />
                        <StatSkeleton />
                        <StatSkeleton />
                    </>
                ) : (
                    <>
                        <StatCard
                            icon="factory"
                            iconBgColor="bg-blue-500/10"
                            iconColor="text-blue-500"
                            label="إجمالي المشاريع"
                            value={totalProjects}
                            link={route('admin.projects.index')}
                            extra="مشاريع مسجلة بالنظام"
                            extraColor="text-slate-500 dark:text-slate-400"
                        />
                        <StatCard
                            icon="emergency_home"
                            iconBgColor="bg-red-500/10"
                            iconColor="text-red-500"
                            label="طلبات مشاريع قيد الانتظار"
                            value={pendingRequestsCount}
                            link={route('admin.project-requests.index')}
                            extra="تحتاج إلى مراجعة"
                            extraColor="text-red-500"
                            extraIcon="warning"
                        />
                    </>
                )}
            </div>

            {/* Two Columns Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Projects Table */}
                <div className="lg:col-span-2 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden">
                    <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#dba61f]/10 text-[#dba61f] flex items-center justify-center">
                                <DynamicIcon name="list_alt" className="text-[18px]" />
                            </div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">أحدث المشاريع المدرجة</h3>
                        </div>
                        <Link href={route('admin.projects.index')} className="text-sm text-primary font-medium hover:underline">عرض الكل</Link>
                    </div>
                    <div className="p-0 overflow-x-auto">
                        <table className="w-full text-right text-sm">
                            <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400">
                                <tr>
                                    <th className="px-6 py-4 font-medium decoration-none">اسم المشروع</th>
                                    <th className="px-6 py-4 font-medium decoration-none">النوع</th>
                                    <th className="px-6 py-4 font-medium decoration-none">الحالة</th>
                                </tr>
                            </thead>
                            <RecentProjectsTable projects={recentProjects} isLoading={isLoading} />
                        </table>
                    </div>
                </div>

                {/* System Health */}
                <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-white/5 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-[#dba61f]/10 text-[#dba61f] flex items-center justify-center">
                            <DynamicIcon name="analytics" className="text-[18px]" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">صحة النظام</h3>
                    </div>
                    <SystemHealth health={systemHealth} isLoading={isLoading} />
                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/5 flex items-start gap-3">
                        <DynamicIcon name="check_circle" className="text-green-500 text-[18px]" />
                        <div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">جميع الأنظمة تعمل بكفاءة</h4>
                            <p className="text-[10px] text-slate-500 mt-0.5">آخر فحص: منذ دقيقتين</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}