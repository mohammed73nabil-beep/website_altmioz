import React, { useState, useEffect, memo } from 'react';
import { Link, usePage } from '@inertiajs/react';
import FloatingContact from './FloatingContact';
import DynamicIcon from '@/Components/DynamicIcon';

// --- مكون الروابط الذكي ---
const NavLink = memo(({ link, closeMenu, variant = 'desktop' }) => {
    const isMobileSidebar = variant === 'mobile-sidebar';
    const isQuickBar = variant === 'quick-bar';

    // التنسيقات الأساسية
    const baseClasses = "transition-all duration-300 font-bold whitespace-nowrap flex items-center justify-center";
    
    // تحديد الشكل بناءً على المكان
    let styleClasses = "";
    if (isMobileSidebar) {
        styleClasses = `w-full px-5 py-4 rounded-xl text-lg ${
            link.active ? 'bg-[#dba61f]/10 text-[#dba61f] border-r-4 border-[#dba61f]' : 'text-gray-700 dark:text-gray-300'
        }`;
    } else if (isQuickBar) {
        styleClasses = `px-4 py-2 rounded-full text-[13px] border transition-transform active:scale-95 ${
            link.active 
            ? 'bg-[#dba61f] text-white border-[#dba61f] shadow-sm' 
            : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-white/10'
        }`;
    } else {
        styleClasses = `px-2 lg:px-3 py-2 rounded-lg text-[13px] lg:text-[14px] ${
            link.active ? 'text-[#dba61f] bg-[#dba61f]/5' : 'text-gray-700 dark:text-gray-200 hover:text-[#dba61f]'
        }`;
    }

    return (
        <li className={isMobileSidebar ? "w-full" : "shrink-0 flex"}>
            <Link href={link.href} onClick={closeMenu} className={`${baseClasses} ${styleClasses}`}>
                {link.name}
            </Link>
        </li>
    );
});

export default function Navbar() {
    const { globalSettings } = usePage().props;
    const siteName = globalSettings?.site_name?.value || 'الريادة في البناء والصيانة';
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // إدارة الوضع الداكن
    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        document.documentElement.classList.toggle('dark');
        localStorage.theme = newMode ? 'dark' : 'light';
    };

    // منع تمرير الصفحة عند فتح المنيو
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    }, [isOpen]);

    // مصفوفة الروابط كاملة (9 روابط)
    const navLinks = [
        { name: 'الرئيسية', href: route('home'), active: route().current('home') },
        { name: 'الخدمات', href: route('services.index'), active: route().current('services.*') },
        { name: 'صيانة الكرفانات', href: route('services.caravans'), active: route().current('services.caravans') },
        { name: 'صيانة البركسات', href: route('services.portacabins'), active: route().current('services.portacabins') },
        { name: 'صيانة المباني', href: route('services.buildings'), active: route().current('services.buildings') },
        { name: 'المدونة', href: route('blog.index'), active: route().current('blog.*') },
        { name: 'مشاريعنا', href: route('our-projects.index'), active: route().current('our-projects.*') },
        { name: 'من نحن', href: route('about'), active: route().current('about') },
        { name: 'اتصل بنا', href: route('contact'), active: route().current('contact') },
    ];

    // روابط الوصول السريع للموبايل
    const mobilePriorityLinks = navLinks.filter(link => 
        ['الخدمات', 'صيانة الكرفانات', 'المدونة', 'مشاريعنا'].includes(link.name)
    );

    return (
        <>
            {/* --- هيدر الموبايل (ثابت في الأعلى) --- */}
            <header className="fixed z-[60] top-0 left-0 right-0 bg-white/95 dark:bg-[#0B1F3A]/95 backdrop-blur-md border-b dark:border-white/10 md:hidden" dir="rtl">
                {/* السطر الأول: اللوجو والزر */}
                <div className="flex items-center justify-between px-4 h-16">
                    <Link href={route('home')} className="flex items-center gap-2 shrink-0">
                        <div className="w-9 h-9 bg-[#dba61f] rounded-lg flex items-center justify-center shadow-sm">
                            <DynamicIcon name="rv_hookup" className="text-white text-xl" />
                        </div>
                        <span className="font-black text-[14px] dark:text-white truncate max-w-[180px]">
                            {siteName}
                        </span>
                    </Link>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white"
                    >
                        <DynamicIcon name={isOpen ? "close" : "menu"} className="text-2xl" />
                    </button>
                </div>

                {/* السطر الثاني: روابط الوصول السريع (أفقية) */}
                <div className="px-4 pb-3 overflow-x-auto no-scrollbar">
                    <ul className="flex items-center gap-2 flex-nowrap">
                        {mobilePriorityLinks.map((link, index) => (
                            <NavLink key={index} link={link} variant="quick-bar" />
                        ))}
                    </ul>
                </div>
            </header>

            {/* --- قائمة الموبايل الجانبية (Sidebar) --- */}
            <div className={`fixed inset-0 z-[65] md:hidden transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
                <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsOpen(false)}></div>
                <nav className={`absolute top-0 right-0 h-full w-[280px] bg-white dark:bg-[#0B1F3A] shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col p-6`} dir="rtl">
                    <div className="flex justify-between items-center mb-6 border-b pb-4 dark:border-white/10">
                        <span className="font-bold dark:text-white">قائمة التصفح</span>
                        <button onClick={() => setIsOpen(false)} className="dark:text-white text-2xl">✕</button>
                    </div>

                    <ul className="flex flex-col gap-1 overflow-y-auto flex-1">
                        {navLinks.map((link, index) => (
                            <NavLink key={index} link={link} closeMenu={() => setIsOpen(false)} variant="mobile-sidebar" />
                        ))}
                    </ul>

                    <div className="mt-auto pt-4 space-y-3">
                        <button onClick={toggleDarkMode} className="w-full py-3 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center gap-2 font-bold dark:text-white transition-colors">
                            <DynamicIcon name={isDarkMode ? 'light_mode' : 'dark_mode'} />
                            {isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
                        </button>
                    </div>
                </nav>
            </div>

            {/* --- نافبار الديسكتوب (لشاشات الكمبيوتر) --- */}
            <div className="hidden md:flex fixed z-50 top-5 left-4 right-4 items-center gap-3" dir="rtl">
                <Link href={route('home')} className="shrink-0 flex items-center justify-center bg-white/90 dark:bg-[#0B1F3A]/90 backdrop-blur-xl w-14 h-14 rounded-2xl shadow-lg border border-white/20 dark:border-white/10">
                    <DynamicIcon name="rv_hookup" className="text-[#dba61f] text-3xl" />
                </Link>

                <nav className="flex-1 flex items-center justify-between bg-white/90 dark:bg-[#0B1F3A]/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-white/10 px-4 h-16">
                    <ul className="flex items-center gap-1 lg:gap-2">
                        {navLinks.map((link, index) => (
                            <NavLink key={index} link={link} variant="desktop" />
                        ))}
                    </ul>

                    <div className="flex items-center gap-3 mr-2">
                        <button onClick={toggleDarkMode} className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-all">
                            <DynamicIcon name={isDarkMode ? 'light_mode' : 'dark_mode'} className="text-xl" />
                        </button>
                        <Link href={route('contact')} className="bg-[#dba61f] hover:bg-[#c4951b] text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-md whitespace-nowrap text-sm">
                            تواصل معنا
                        </Link>
                    </div>
                </nav>
            </div>

            {/* مساحة فارغة علوية للموبايل لتعويض الهيدر الثابت */}
            <div className="h-28 md:hidden"></div>

            <FloatingContact />
        </>
    );
}