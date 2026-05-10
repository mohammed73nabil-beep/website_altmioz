import React, { useState, useRef } from 'react';
import { Head, useForm, usePage, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import toast from 'react-hot-toast';

// ─── Shared field style ───────────────────────────────────────────────────────
const fieldClass =
    'w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 ' +
    'text-slate-800 dark:text-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ' +
    'focus:ring-primary/40 transition-all placeholder-slate-400 dark:placeholder-slate-500';

const labelClass = 'block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide';

// ─── Section card wrapper ─────────────────────────────────────────────────────
function Card({ icon, title, subtitle, children, accent = false }) {
    return (
        <div className={`bg-white dark:bg-sidebar-dark rounded-2xl border shadow-sm overflow-hidden ${accent ? 'border-red-200 dark:border-red-500/20' : 'border-slate-100 dark:border-white/5'}`}>
            <div className={`px-6 py-4 border-b flex items-center gap-3 ${accent ? 'border-red-100 dark:border-red-500/10 bg-red-50/50 dark:bg-red-500/5' : 'border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5'}`}>
                <span className={`material-symbols-outlined text-[20px] ${accent ? 'text-red-500' : 'text-primary'}`}>{icon}</span>
                <div>
                    <h3 className={`text-sm font-bold ${accent ? 'text-red-700 dark:text-red-400' : 'text-slate-800 dark:text-white'}`}>{title}</h3>
                    {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
                </div>
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
}

// ─── Stat tile ────────────────────────────────────────────────────────────────
function StatTile({ icon, label, value, color = 'text-primary' }) {
    return (
        <div className="flex flex-col items-center justify-center gap-1 bg-slate-50 dark:bg-white/5 rounded-2xl p-5 border border-slate-100 dark:border-white/5">
            <span className={`material-symbols-outlined text-3xl ${color}`}>{icon}</span>
            <span className="text-2xl font-black text-slate-800 dark:text-white">{value}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium text-center">{label}</span>
        </div>
    );
}

// ────────────────────────────────────────────────────────────────────────────────
export default function ProfileEdit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth.user;

    // ── Profile info form ──────────────────────────────────────────────────────
    const profileForm = useForm({ name: user.name, email: user.email });

    const saveProfile = (e) => {
        e.preventDefault();
        profileForm.patch(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => toast.success('تم تحديث المعلومات بنجاح ✅'),
            onError: () => toast.error('تأكد من البيانات المدخلة.'),
        });
    };

    // ── Password form ──────────────────────────────────────────────────────────
    const passForm = useForm({ current_password: '', password: '', password_confirmation: '' });
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const savePassword = (e) => {
        e.preventDefault();
        passForm.put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                passForm.reset();
                toast.success('تم تحديث كلمة المرور بنجاح ✅');
            },
            onError: () => toast.error('كلمة المرور الحالية غير صحيحة.'),
        });
    };

    // ── Avatar initials ────────────────────────────────────────────────────────
    const initials = user.name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || 'A';

    // ── Password strength ──────────────────────────────────────────────────────
    const strength = (() => {
        const p = passForm.data.password;
        if (!p) return 0;
        let s = 0;
        if (p.length >= 8) s++;
        if (/[A-Z]/.test(p)) s++;
        if (/[0-9]/.test(p)) s++;
        if (/[^A-Za-z0-9]/.test(p)) s++;
        return s;
    })();
    const strengthLabel = ['', 'ضعيفة', 'مقبولة', 'جيدة', 'قوية'][strength];
    const strengthColor = ['', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'][strength];

    // ── Avatar upload state─────────────────────────────────────────────────────
    const avatarInputRef = useRef();
    const [avatarPreview, setAvatarPreview] = useState(null);
    const avatarForm = useForm({ avatar: null });

    const handleAvatarPick = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        avatarForm.setData('avatar', file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const submitAvatar = (e) => {
        e.preventDefault();
        avatarForm.post(route('profile.avatar.upload'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setAvatarPreview(null);
                toast.success('تم تحديث صورة الملف الشخصي ✅');
            },
            onError: () => toast.error('تأكد من صحة الصورة.'),
        });
    };

    const removeAvatar = () => {
        router.delete(route('profile.avatar.remove'), {
            preserveScroll: true,
            onSuccess: () => {
                setAvatarPreview(null);
                toast.success('تم حذف الصورة.');
            },
        });
    };

    const avatarSrc = avatarPreview || (user.avatar ? `/storage/${user.avatar}` : null);

    // ── Joined date ────────────────────────────────────────────────────────────
    const joinedAt = user.created_at
        ? new Date(user.created_at).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
        : '—';

    return (
        <AdminLayout
            header={
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400">person</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">الملف الشخصي</span>
                </div>
            }
        >
            <Head title="الملف الشخصي" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ── LEFT COLUMN: Profile Card + Stats ────────────────────── */}
                <div className="lg:col-span-1 space-y-6">

                    {/* Profile Card */}
                    <div className="bg-white dark:bg-sidebar-dark rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden">
                        {/* Cover gradient */}
                        <div className="h-28 bg-gradient-to-br from-[#064E3B] via-[#1a3a5c] to-[#064E3B] relative overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,162,39,0.3),_transparent_60%)]"></div>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-20"></div>
                        </div>

                        {/* Avatar */}
                        <form onSubmit={submitAvatar}>
                            <div className="-mt-12 flex flex-col items-center px-6 pb-4">
                                {/* Avatar circle - click to pick */}
                                <div className="relative group cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white dark:border-sidebar-dark shadow-xl bg-gradient-to-br from-[#16A34A] to-[#4ADE80] flex items-center justify-center text-[#064E3B] font-black text-3xl">
                                        {avatarSrc ? (
                                            <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <span>{initials}</span>
                                        )}
                                    </div>
                                    {/* Camera hover overlay */}
                                    <div className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-white text-2xl">photo_camera</span>
                                    </div>
                                    {/* Green dot indicator if has avatar */}
                                    {(avatarSrc) && (
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white dark:border-sidebar-dark flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-[10px]">check</span>
                                        </div>
                                    )}
                                </div>
                                <input
                                    ref={avatarInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarPick}
                                />

                                {/* Save / Cancel preview buttons */}
                                {avatarPreview && (
                                    <div className="flex gap-2 mt-3">
                                        <button
                                            type="submit"
                                            disabled={avatarForm.processing}
                                            className="text-xs bg-primary hover:brightness-110 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                                        >
                                            <span className="material-symbols-outlined text-[14px]">save</span>
                                            حفظ الصورة
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => { setAvatarPreview(null); avatarForm.reset(); }}
                                            className="text-xs bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                                        >
                                            <span className="material-symbols-outlined text-[14px]">close</span>
                                            إلغاء
                                        </button>
                                    </div>
                                )}

                                {/* Remove avatar button */}
                                {!avatarPreview && user.avatar && (
                                    <button
                                        type="button"
                                        onClick={removeAvatar}
                                        className="mt-2 text-xs text-red-500 hover:text-red-600 flex items-center gap-1 font-medium"
                                    >
                                        <span className="material-symbols-outlined text-[14px]">delete</span>
                                        حذف الصورة
                                    </button>
                                )}

                                {/* Upload hint */}
                                {!avatarPreview && !user.avatar && (
                                    <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">اضغط على الصورة لتغييرها</p>
                                )}

                                <h2 className="text-xl font-bold text-slate-800 dark:text-white mt-3">{user.name}</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                                    <span className="material-symbols-outlined text-[14px]">mail</span>
                                    {user.email}
                                </p>
                                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                                    <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
                                    مدير النظام
                                </span>
                            </div>
                        </form>

                        {/* Meta info */}
                        <div className="border-t border-slate-100 dark:border-white/5 divide-y divide-slate-100 dark:divide-white/5">
                            <div className="flex items-center justify-between px-6 py-3 text-sm">
                                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                                    تاريخ الانضمام
                                </span>
                                <span className="font-medium text-slate-700 dark:text-slate-300 text-xs">{joinedAt}</span>
                            </div>
                            <div className="flex items-center justify-between px-6 py-3 text-sm">
                                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[16px]">verified_user</span>
                                    حالة الحساب
                                </span>
                                <span className="font-bold text-green-600 dark:text-green-400 text-xs flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                                    نشط
                                </span>
                            </div>
                            <div className="flex items-center justify-between px-6 py-3 text-sm">
                                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[16px]">security</span>
                                    التحقق بالبريد
                                </span>
                                <span className={`font-bold text-xs ${user.email_verified_at ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                    {user.email_verified_at ? 'مُفعَّل' : 'غير مُفعَّل'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-1 gap-2">
                        {[
                            { label: 'لوحة التحكم', icon: 'dashboard', href: route('admin.dashboard') },
                            { label: 'الخلفيات', icon: 'wallpaper', href: route('admin.backgrounds.index') },
                            { label: 'صور الأعمال', icon: 'photo_library', href: route('admin.gallery.index') },
                        ].map(link => (
                            <Link key={link.href} href={link.href} className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-sidebar-dark rounded-xl border border-slate-100 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary/30 transition-all text-sm font-medium shadow-sm">
                                <span className="material-symbols-outlined text-[18px]">{link.icon}</span>
                                {link.label}
                                <span className="material-symbols-outlined text-[14px] mr-auto rotate-180">arrow_forward_ios</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT COLUMN: Forms ───────────────────────────────────── */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Profile Info Form */}
                    <Card icon="manage_accounts" title="المعلومات الشخصية" subtitle="تحديث الاسم والبريد الإلكتروني">
                        <form onSubmit={saveProfile} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>الاسم الكامل</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">person</span>
                                        <input
                                            type="text"
                                            value={profileForm.data.name}
                                            onChange={e => profileForm.setData('name', e.target.value)}
                                            className={`${fieldClass} pr-10`}
                                            placeholder="اسمك الكامل"
                                        />
                                    </div>
                                    <InputError message={profileForm.errors.name} className="mt-1" />
                                </div>
                                <div>
                                    <label className={labelClass}>البريد الإلكتروني</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">mail</span>
                                        <input
                                            type="email"
                                            value={profileForm.data.email}
                                            onChange={e => profileForm.setData('email', e.target.value)}
                                            className={`${fieldClass} pr-10`}
                                            placeholder="example@email.com"
                                        />
                                    </div>
                                    <InputError message={profileForm.errors.email} className="mt-1" />
                                </div>
                            </div>

                            {mustVerifyEmail && !user.email_verified_at && (
                                <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4 text-sm text-amber-700 dark:text-amber-400">
                                    <span className="material-symbols-outlined text-[20px] shrink-0">warning</span>
                                    <div>
                                        بريدك الإلكتروني غير مُفعّل.
                                        <Link href={route('verification.send')} method="post" as="button" className="mr-1 underline font-bold hover:no-underline">
                                            إعادة إرسال رابط التفعيل
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {status === 'verification-link-sent' && (
                                <div className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl p-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                    تم إرسال رابط التفعيل إلى بريدك الإلكتروني.
                                </div>
                            )}

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={profileForm.processing}
                                    className="bg-primary hover:brightness-110 text-white font-bold px-6 py-2.5 rounded-xl transition flex items-center gap-2 text-sm disabled:opacity-60"
                                >
                                    {profileForm.processing ? (
                                        <><span className="material-symbols-outlined animate-spin text-sm">sync</span>جاري الحفظ...</>
                                    ) : (
                                        <><span className="material-symbols-outlined text-sm">save</span>حفظ التغييرات</>
                                    )}
                                </button>
                            </div>
                        </form>
                    </Card>

                    {/* Password Form */}
                    <Card icon="lock" title="تغيير كلمة المرور" subtitle="استخدم كلمة مرور قوية تحتوي على أحرف وأرقام ورموز">
                        <form onSubmit={savePassword} className="space-y-5">
                            {/* Current password */}
                            <div>
                                <label className={labelClass}>كلمة المرور الحالية</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">key</span>
                                    <input
                                        type={showCurrent ? 'text' : 'password'}
                                        value={passForm.data.current_password}
                                        onChange={e => passForm.setData('current_password', e.target.value)}
                                        className={`${fieldClass} pr-10 pl-10`}
                                        placeholder="كلمة مرورك الحالية"
                                    />
                                    <button type="button" onClick={() => setShowCurrent(v => !v)} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition">
                                        <span className="material-symbols-outlined text-[18px]">{showCurrent ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                </div>
                                <InputError message={passForm.errors.current_password} className="mt-1" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* New password */}
                                <div>
                                    <label className={labelClass}>كلمة المرور الجديدة</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">lock</span>
                                        <input
                                            type={showNew ? 'text' : 'password'}
                                            value={passForm.data.password}
                                            onChange={e => passForm.setData('password', e.target.value)}
                                            className={`${fieldClass} pr-10 pl-10`}
                                            placeholder="كلمة مرور جديدة"
                                        />
                                        <button type="button" onClick={() => setShowNew(v => !v)} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition">
                                            <span className="material-symbols-outlined text-[18px]">{showNew ? 'visibility_off' : 'visibility'}</span>
                                        </button>
                                    </div>
                                    <InputError message={passForm.errors.password} className="mt-1" />
                                </div>

                                {/* Confirm password */}
                                <div>
                                    <label className={labelClass}>تأكيد كلمة المرور</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">lock_reset</span>
                                        <input
                                            type={showConfirm ? 'text' : 'password'}
                                            value={passForm.data.password_confirmation}
                                            onChange={e => passForm.setData('password_confirmation', e.target.value)}
                                            className={`${fieldClass} pr-10 pl-10`}
                                            placeholder="أعد كتابة كلمة المرور"
                                        />
                                        <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition">
                                            <span className="material-symbols-outlined text-[18px]">{showConfirm ? 'visibility_off' : 'visibility'}</span>
                                        </button>
                                    </div>
                                    <InputError message={passForm.errors.password_confirmation} className="mt-1" />
                                </div>
                            </div>

                            {/* Strength bar */}
                            {passForm.data.password && (
                                <div>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-slate-500">قوة كلمة المرور</span>
                                        <span className={`font-bold ${strength >= 3 ? 'text-green-600' : strength === 2 ? 'text-blue-600' : 'text-red-500'}`}>{strengthLabel}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : 'bg-slate-200 dark:bg-white/10'}`}></div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={passForm.processing}
                                    className="bg-primary hover:brightness-110 text-white font-bold px-6 py-2.5 rounded-xl transition flex items-center gap-2 text-sm disabled:opacity-60"
                                >
                                    {passForm.processing ? (
                                        <><span className="material-symbols-outlined animate-spin text-sm">sync</span>جاري التحديث...</>
                                    ) : (
                                        <><span className="material-symbols-outlined text-sm">lock</span>تحديث كلمة المرور</>
                                    )}
                                </button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
