import React, { useState, useEffect, useRef, memo } from 'react';
import { Link, usePage } from '@inertiajs/react';
import FloatingContact from './FloatingContact';
import ScrollToTop from './ScrollToTop';
import DynamicIcon from '@/Components/DynamicIcon';

// ─── Simple nav link (for non-dropdown items) ───────────────────────────────
const NavLink = memo(({ link, closeMenu, variant = 'desktop', isScrolled }) => {
    const isMobile = variant === 'mobile-sidebar';

    if (isMobile) {
        return (
            <li className="w-full">
                <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`w-full px-5 py-3.5 text-base font-bold flex items-center justify-start gap-3 transition-all duration-200 ${
                        link.active
                            ? 'bg-primary/10 text-primary border-r-4 border-primary rounded-l-lg'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg'
                    }`}
                >
                    {link.icon && <DynamicIcon name={link.icon} className="text-lg opacity-70" />}
                    {link.name}
                </Link>
            </li>
        );
    }

    return (
        <li className="shrink-0 flex">
            <Link
                href={link.href}
                onClick={closeMenu}
                className={`px-3 py-1.5 text-[13px] lg:text-[14px] rounded font-bold whitespace-nowrap transition-all duration-200 ${
                    link.active
                        ? 'text-primary bg-primary/10'
                        : isScrolled
                            ? 'text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-white/5'
                            : 'text-white hover:text-primary hover:bg-white/10'
                }`}
            >
                {link.name}
            </Link>
        </li>
    );
});

// ─── Desktop Dropdown for Services ──────────────────────────────────────────
const ServicesDropdown = ({ services, isScrolled }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const isAnyServiceActive = services.some(s => s.active);

    // Close on outside click
    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <li className="shrink-0 flex relative" ref={ref}>
            <button
                onClick={() => setOpen(o => !o)}
                className={`px-3 py-1.5 text-[13px] lg:text-[14px] rounded font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                    isAnyServiceActive
                        ? 'text-primary bg-primary/10'
                        : isScrolled
                            ? 'text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-white/5'
                            : 'text-white hover:text-primary hover:bg-white/10'
                }`}
            >
                خدماتنا
                <DynamicIcon
                    name="expand_more"
                    className={`text-base transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Panel */}
            <div
                className={`absolute top-full right-0 mt-2 z-50 transition-all duration-200 origin-top-right ${
                    open ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
            >
                <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden w-[560px]">
                    {/* Header */}
                    <div className="px-5 py-3 border-b border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-background-dark flex items-center gap-2">
                        <DynamicIcon name="home_repair_service" className="text-primary text-lg" />
                        <span className="font-black text-gray-900 dark:text-white text-sm">خدماتنا</span>
                        <span className="mr-auto text-xs text-gray-400 dark:text-gray-500">{services.length} خدمة متاحة</span>
                    </div>

                    {/* Grid of services */}
                    <div className="grid grid-cols-2 gap-0.5 p-3 bg-gray-50 dark:bg-background-dark">
                        {services.map((srv, idx) => (
                            <Link
                                key={idx}
                                href={srv.href}
                                onClick={() => setOpen(false)}
                                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                    srv.active
                                        ? 'bg-primary/10 text-primary'
                                        : 'bg-white dark:bg-surface-dark hover:bg-primary/5 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-primary'
                                }`}
                            >
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                    srv.active ? 'bg-primary/20 text-primary' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 group-hover:bg-primary/10 group-hover:text-primary'
                                }`}>
                                    <DynamicIcon name={srv.icon} className="text-lg" />
                                </div>
                                <span className="font-bold text-sm leading-tight">{srv.name}</span>
                                <DynamicIcon name="arrow_back_ios" className="text-xs opacity-0 group-hover:opacity-100 mr-auto transition-opacity" />
                            </Link>
                        ))}
                    </div>

                    {/* Footer CTA */}
                    <div className="px-4 py-3 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-surface-dark">
                        <Link
                            href={route('contact')}
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-slate-900 rounded-xl font-bold text-sm transition-all duration-300"
                        >
                            <DynamicIcon name="request_quote" className="text-base" />
                            اطلب عرض سعر الآن
                        </Link>
                    </div>
                </div>
            </div>
        </li>
    );
};

// ─── Mobile Services Accordion ───────────────────────────────────────────────
const MobileServicesSection = ({ services, closeMenu }) => {
    const [expanded, setExpanded] = useState(false);
    const isAnyActive = services.some(s => s.active);

    return (
        <li className="w-full">
            <button
                onClick={() => setExpanded(e => !e)}
                className={`w-full px-5 py-3.5 text-base font-bold flex items-center gap-3 transition-all duration-200 ${
                    isAnyActive
                        ? 'bg-primary/10 text-primary border-r-4 border-primary rounded-l-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg'
                }`}
            >
                <DynamicIcon name="home_repair_service" className="text-lg opacity-70" />
                <span>خدماتنا</span>
                <DynamicIcon
                    name="expand_more"
                    className={`text-lg mr-auto transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Sub-links */}
            <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pr-4 pl-2 pb-2 space-y-0.5">
                    {services.map((srv, idx) => (
                        <Link
                            key={idx}
                            href={srv.href}
                            onClick={closeMenu}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-150 ${
                                srv.active
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-primary'
                            }`}
                        >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                srv.active ? 'bg-primary/20 text-primary' : 'bg-gray-100 dark:bg-white/5 text-gray-400'
                            }`}>
                                <DynamicIcon name={srv.icon} className="text-base" />
                            </div>
                            {srv.name}
                        </Link>
                    ))}
                </div>
            </div>
        </li>
    );
};

// ─── Main Navbar ─────────────────────────────────────────────────────────────
export default function Navbar() {
    const { globalSettings, servicesList = {} } = usePage().props;
    const siteName = globalSettings?.site_name?.value || 'مظلات التميز | مظلات وسواتر وبرجولات';
    const logoUrl = globalSettings?.site_logo?.value 
        ? (globalSettings.site_logo.value.startsWith('http') 
            ? globalSettings.site_logo.value 
            : `/storage/${globalSettings.site_logo.value}`)
        : null;
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (localStorage.theme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
            if (!('theme' in localStorage)) {
                localStorage.theme = 'light';
            }
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    }, [isOpen]);

    // Build service links (for dropdown & mobile)
    // "مظلات سيارات" is shown as a standalone link; the rest go in the dropdown
    const allServiceLinks = Object.values(servicesList).map(service => ({
        name: service.title,
        href: route('services.show', service.slug),
        icon: service.icon,
        slug: service.slug,
        active: route().current('services.show', service.slug),
    }));

    const decorLink = allServiceLinks.find(s => s.slug === 'car-shades');
    const serviceLinks = allServiceLinks.filter(s => s.slug !== 'car-shades');

    // Main nav links (excluding dropdown services)
    const mainLinks = [
        { name: 'الرئيسية', href: route('home'), active: route().current('home') },
        { name: 'المدونة', href: route('blog.index'), active: route().current('blog.*') },
        { name: 'مشاريعنا', href: route('our-projects.index'), active: route().current('our-projects.*') },
        { name: 'من نحن', href: route('about'), active: route().current('about') },
    ];

    return (
        <>
            {/* ======= MOBILE HEADER ======= */}
            <header
                className={`fixed z-[60] top-0 left-0 right-0 md:hidden transition-all duration-500 ${
                    scrolled ? 'bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-white/10 shadow-md' : 'bg-transparent border-transparent'
                }`}
                dir="rtl"
            >
                <div className="flex items-center justify-between px-4 h-14">
                    <Link href={route('home')} className="flex items-center gap-2 shrink-0">
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt={siteName}
                                className="h-8 max-w-[150px] object-contain transition-all duration-300"
                            />
                        ) : (
                            <span className={`font-black text-[14px] truncate max-w-[170px] ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                                {siteName}
                            </span>
                        )}
                    </Link>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleDarkMode}
                            className={`w-9 h-9 flex items-center justify-center transition-colors ${scrolled ? 'text-gray-600 dark:text-gray-300 hover:text-primary' : 'text-white/80 hover:text-white'}`}
                        >
                            <DynamicIcon name={isDarkMode ? 'light_mode' : 'dark_mode'} className="text-xl" />
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`w-9 h-9 flex items-center justify-center ${scrolled ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white' : 'bg-white/10 text-white'}`}
                        >
                            <DynamicIcon name={isOpen ? "close" : "menu"} className="text-xl" />
                        </button>
                    </div>
                </div>
            </header>

            {/* ======= MOBILE SIDEBAR ======= */}
            <div className={`fixed inset-0 z-[70] md:hidden transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsOpen(false)}
                />
                {/* Sidebar Panel */}
                <nav
                    className={`absolute top-0 right-0 h-full w-[300px] bg-white dark:bg-surface-dark shadow-2xl transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    dir="rtl"
                >
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between px-5 py-4 bg-gray-50 dark:bg-background-dark border-b border-gray-100 dark:border-white/5">
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt={siteName}
                                className="h-8 max-w-[150px] object-contain"
                            />
                        ) : (
                            <span className="font-black text-gray-900 dark:text-white text-sm">{siteName}</span>
                        )}
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <DynamicIcon name="close" className="text-2xl" />
                        </button>
                    </div>

                    {/* Sidebar Links */}
                    <ul className="flex flex-col gap-1 overflow-y-auto flex-1 px-3 py-3">
                        {/* الرئيسية */}
                        <NavLink link={mainLinks[0]} closeMenu={() => setIsOpen(false)} variant="mobile-sidebar" />

                        {/* ديكورات وترميم — standalone */}
                        {decorLink && <NavLink link={decorLink} closeMenu={() => setIsOpen(false)} variant="mobile-sidebar" />}

                        {/* خدماتنا — accordion */}
                        <MobileServicesSection services={serviceLinks} closeMenu={() => setIsOpen(false)} />

                        {/* مشاريعنا / من نحن */}
                        {mainLinks.slice(1).map((link, idx) => (
                            <NavLink key={idx} link={link} closeMenu={() => setIsOpen(false)} variant="mobile-sidebar" />
                        ))}
                    </ul>

                    {/* Sidebar Footer */}
                    <div className="px-4 py-4 border-t border-gray-100 dark:border-white/10 space-y-3">
                        <button
                            onClick={toggleDarkMode}
                            className="w-full py-2.5 bg-gray-100 dark:bg-white/5 flex items-center justify-center gap-2 font-bold text-gray-700 dark:text-white text-sm transition-colors hover:bg-gray-200 dark:hover:bg-white/10"
                        >
                            <DynamicIcon name={isDarkMode ? 'light_mode' : 'dark_mode'} />
                            {isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
                        </button>
                        <Link
                            href={route('contact')}
                            onClick={() => setIsOpen(false)}
                            className="w-full py-2.5 bg-primary text-slate-900 flex items-center justify-center gap-2 font-black text-sm hover:bg-[#b38c1a] transition-colors"
                        >
                            تواصل معنا
                            <DynamicIcon name="arrow_forward" className="text-base rotate-180" />
                        </Link>
                    </div>
                </nav>
            </div>

            {/* ======= DESKTOP HEADER ======= */}
            <header
                className={`hidden md:flex fixed z-50 top-0 left-0 right-0 items-center h-16 transition-all duration-500 ${
                    scrolled ? 'bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-white/10 shadow-lg' : 'bg-transparent border-transparent'
                }`}
                dir="rtl"
            >
                <div className="w-full max-w-screen-2xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href={route('home')} className="flex items-center gap-2.5 shrink-0">
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt={siteName}
                                className="h-10 max-w-[200px] object-contain transition-all duration-300"
                            />
                        ) : (
                            <span className={`font-black text-[15px] hidden lg:block ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                                {siteName}
                            </span>
                        )}
                    </Link>

                    {/* Nav Links (Center) */}
                    <nav className="flex-1 flex items-center justify-center">
                        <ul className="flex items-center gap-0.5 lg:gap-1">
                            {/* الرئيسية */}
                            <NavLink link={mainLinks[0]} variant="desktop" isScrolled={scrolled} />

                            {/* ديكورات وترميم — standalone */}
                            {decorLink && (
                                <NavLink
                                    link={{ ...decorLink, active: decorLink.active && scrolled }}
                                    variant="desktop"
                                    isScrolled={scrolled}
                                />
                            )}

                            {/* خدماتنا dropdown */}
                            <ServicesDropdown services={serviceLinks} isScrolled={scrolled} />

                            {/* مشاريعنا + من نحن */}
                            {mainLinks.slice(1).map((link, idx) => (
                                <NavLink
                                    key={idx}
                                    link={{ ...link, active: link.active && scrolled }}
                                    variant="desktop"
                                    isScrolled={scrolled}
                                />
                            ))}
                        </ul>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={toggleDarkMode}
                            className={`w-9 h-9 flex items-center justify-center transition-colors ${scrolled ? 'text-gray-600 dark:text-gray-300 hover:text-primary' : 'text-white/80 hover:text-white'}`}
                            title={isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
                        >
                            <DynamicIcon name={isDarkMode ? 'light_mode' : 'dark_mode'} className="text-xl" />
                        </button>
                        <Link
                            href={route('contact')}
                            className="bg-primary hover:bg-[#b38c1a] text-slate-900 font-black py-2 px-5 text-sm transition-colors whitespace-nowrap"
                        >
                            تواصل معنا
                        </Link>
                    </div>
                </div>
            </header>

            <FloatingContact />
            <ScrollToTop />
        </>
    );
}