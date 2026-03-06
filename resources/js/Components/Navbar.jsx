import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import FloatingContact from './FloatingContact';
import DynamicIcon from '@/Components/DynamicIcon';

export default function Navbar() {
    const { auth, globalSettings } = usePage().props;
    const siteName = globalSettings?.site_name?.value || 'صيانة وفخامة';
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Initialize dark mode from localStorage or system preference
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDarkMode(true);
        }
    };

    const navLinks = [
        { name: 'الرئيسية', href: route('home'), active: route().current('home') },
        { name: 'من نحن', href: route('about'), active: route().current('about') },
        { name: 'الخدمات', href: route('services.index'), active: route().current('services.index') },
        { name: 'صيانة الكرفانات', href: route('services.caravans'), active: route().current('services.caravans') },
        { name: 'صيانة البركسات', href: route('services.portacabins'), active: route().current('services.portacabins') },
        { name: 'صيانة المباني', href: route('services.buildings'), active: route().current('services.buildings') },
        { name: 'مشاريعنا', href: route('our-projects.index'), active: route().current('our-projects.*') },
        { name: 'اتصل بنا', href: route('contact'), active: route().current('contact') },
    ];

    return (
        <>
            {/* Header Wrapper */}
            <div className="fixed z-50 top-3 left-3 right-3 lg:top-6 lg:left-8 lg:right-8 flex items-center gap-3 md:gap-5 pointer-events-none" dir="rtl">

                <Link href={route('home')} className="pointer-events-auto flex items-center justify-center bg-white/85 dark:bg-[#0B1F3A]/85 backdrop-blur-xl w-[3.5rem] h-[3.5rem] md:w-14 md:h-14 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 dark:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shrink-0 group">
                    <DynamicIcon name="rv_hookup" className="text-[#9037e8] text-2xl md:text-3xl group-hover:rotate-[15deg] transition-transform duration-300 drop-shadow-md" />
                </Link>

                <nav className="pointer-events-auto relative flex-1 transition-all duration-500 bg-white/85 dark:bg-[#0B1F3A]/85 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(201,162,39,0.08)] border border-white/50 dark:border-white/10">
                    <div className="px-4 xl:px-8 w-full">
                        <div className="flex items-center justify-end md:justify-between h-14 md:h-16">
                            {/* Desktop Menu */}
                            <div className="hidden md:block">
                                <div className="glass-radio-group relative z-50" style={{ direction: 'rtl' }}>
                                    {navLinks.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.href}
                                            className={`glass-label ${link.active ? 'active' : ''}`}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                    {(() => {
                                        const activeIndex = navLinks.findIndex(link => link.active);
                                        if (activeIndex === -1) return null;
                                        return (
                                            <div
                                                className="glass-glider"
                                                style={{
                                                    right: `${(activeIndex * 100) / navLinks.length}%`,
                                                    transform: `translateX(0)`,
                                                    width: `${100 / navLinks.length}%`
                                                }}
                                            ></div>
                                        );
                                    })()}
                                </div>
                            </div>

                            {/* Desktop CTA & Theme Toggle */}
                            <div className="hidden md:flex items-center gap-4">
                                <div className="toggle-switch scale-90 origin-right ml-2" title={isDarkMode ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}>
                                    <label className="switch-label">
                                        <input type="checkbox" className="checkbox" checked={!isDarkMode} onChange={toggleDarkMode} />
                                        <span className="slider"></span>
                                    </label>
                                </div>

                                <Link className="bg-gradient-to-r from-[#dba61f] to-[#e8c04f] hover:from-[#7d9bc2] hover:to-[#647386] text-white font-bold py-2.5 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2" href={route('contact')}>
                                    <span>تواصل معنا</span>
                                    <DynamicIcon name="arrow_forward" className="text-sm rotate-180" />
                                </Link>
                            </div>

                            {/* Mobile Quick Links & Theme Toggle Button (Left in RTL) */}
                            <div className="md:hidden flex items-center gap-3">
                                {/* Quick Mobile Links (Services) */}
                                <div className="flex items-center justify-between w-full max-w-[65vw] sm:max-w-xs pl-2 pr-1">
                                    <Link href={route('services.caravans')} className={`text-[11px] sm:text-xs md:text-sm font-black transition-all px-2 py-1.5 rounded-md text-center flex-1 leading-tight ${route().current('services.caravans') ? 'text-white bg-[#dba61f] shadow-sm' : 'text-[#0B1F3A] dark:text-gray-300 hover:text-[#dba61f] bg-gray-100/50 dark:bg-white/5'}`}>
                                        صيانة<br className="sm:hidden" /> كرفانات
                                    </Link>
                                    <div className="w-[1px] h-6 bg-gray-200 dark:bg-white/10 mx-1"></div>
                                    <Link href={route('services.portacabins')} className={`text-[11px] sm:text-xs md:text-sm font-black transition-all px-2 py-1.5 rounded-md text-center flex-1 leading-tight ${route().current('services.portacabins') ? 'text-white bg-[#dba61f] shadow-sm' : 'text-[#0B1F3A] dark:text-gray-300 hover:text-[#dba61f] bg-gray-100/50 dark:bg-white/5'}`}>
                                        صيانة<br className="sm:hidden" /> بركسات
                                    </Link>
                                    <div className="w-[1px] h-6 bg-gray-200 dark:bg-white/10 mx-1"></div>
                                    <Link href={route('services.buildings')} className={`text-[11px] sm:text-xs md:text-sm font-black transition-all px-2 py-1.5 rounded-md text-center flex-1 leading-tight ${route().current('services.buildings') ? 'text-white bg-[#dba61f] shadow-sm' : 'text-[#0B1F3A] dark:text-gray-300 hover:text-[#dba61f] bg-gray-100/50 dark:bg-white/5'}`}>
                                        صيانة<br className="sm:hidden" /> مباني
                                    </Link>
                                </div>
                                <div className="toggle-switch scale-[0.65] origin-right mx-1" title={isDarkMode ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}>
                                    <label className="switch-label">
                                        <input type="checkbox" className="checkbox" checked={!isDarkMode} onChange={toggleDarkMode} />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="bg-white/80 dark:bg-[#0B1F3A] ring-1 ring-gray-200/50 dark:ring-white/10 backdrop-blur-md text-[#0B1F3A] dark:text-white focus:outline-none w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95"
                                    aria-label="قائمة التنقل"
                                >
                                    <div className={`hamburger-button ${isOpen ? 'is-open text-[#dba61f]' : 'text-[#0B1F3A] dark:text-white'}`}>
                                        <div className="h-line1"></div>
                                        <div className="h-line2"></div>
                                        <div className="h-line3"></div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Dropdown Menu */}
                    <div className={`md:hidden absolute top-[110%] left-0 right-0 max-h-[75vh] overflow-y-auto bg-white/95 dark:bg-[#0B1F3A]/95 backdrop-blur-xl rounded-3xl border border-gray-100 dark:border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                        <div className="p-4 space-y-2 flex flex-col">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-5 py-3.5 rounded-2xl text-lg font-black transition-all ${link.active ? 'bg-[#dba61f]/10 text-[#dba61f] border-r-4 border-[#dba61f]' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-[#0B1F3A] dark:hover:text-white'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="my-2 border-t border-gray-100 dark:border-white/5 pt-2"></div>



                            <div className="mt-4 pt-2 px-1">
                                <Link href={route('contact')} className="w-full flex justify-center items-center gap-2 bg-[#190f44] text-[#211c11] font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-transform">
                                    <span>تواصل معنا </span>
                                    <DynamicIcon name="arrow_forward" className="text-sm rotate-180" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Logo deleted from here as it was moved up */}
            <FloatingContact />
        </>
    );
}
