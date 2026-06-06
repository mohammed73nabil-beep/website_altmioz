import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import DynamicIcon from '@/Components/DynamicIcon';
import WebsiteOfferBanner from '@/Components/WebsiteOfferBanner';

export default function Footer() {
    const { globalSettings, servicesList = {} } = usePage().props;

    const siteName = globalSettings?.site_name?.value || 'مظلات التميز | مظلات وسواتر وبرجولات';
    const sitePhone = globalSettings?.contact_phone?.value || '';
    const siteEmail = globalSettings?.contact_email?.value || '';
    const siteAddress = globalSettings?.address?.value || 'الرياض، المملكة العربية السعودية';
    const workingHours = globalSettings?.working_hours?.value || 'يومياً: 8:00 ص - 10:00 م';
    const siteDesc = globalSettings?.site_description?.value || 'شركة مظلات التميز للمظلات والسواتر والبرجولات بالرياض. تركيب مظلات سيارات، مظلات حدائق، سواتر خشبية وحديد، هناجر ومستودعات ساندوتش بنل بأفضل الأسعار وأعلى جودة.';
    const facebookUrl = globalSettings?.facebook_url?.value || '';
    const twitterUrl = globalSettings?.twitter_url?.value || '';
    const instagramUrl = globalSettings?.instagram_url?.value || '';
    const tiktokUrl = globalSettings?.tiktok_url?.value || '';
    const currentYear = new Date().getFullYear();

    const servicesLinks = Object.values(servicesList).map(service => ({
        label: service.title,
        href: route('services.show', service.slug)
    }));

    const footerLinks = [
        {
            title: 'روابط سريعة',
            links: [
                { label: 'الرئيسية', href: route('home') },
                { label: 'من نحن', href: route('about') },
                { label: 'مشاريعنا', href: route('our-projects.index') },
                { label: 'تواصل معنا', href: route('contact') },
            ]
        },
        {
            title: 'خدماتنا',
            links: servicesLinks
        }
    ];

    return (
        <>
        <footer className="bg-[#040A12] pt-20 pb-10 border-t border-white/10 relative z-20 text-gray-400 font-display">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* عمود 1: عن الشركة */}
                    <div>
                        <div className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                            {siteName}
                        </div>
                        <p className="text-sm leading-relaxed mb-6 text-justify">
                            {siteDesc}
                        </p>
                        <div className="flex gap-4">
                            {facebookUrl && (
                                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-slate-900 transition-colors" title="فيسبوك">
                                    <span className="font-bold text-lg">f</span>
                                </a>
                            )}
                            {twitterUrl && (
                                <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-slate-900 transition-colors" title="إكس">
                                    <span className="font-bold text-lg">X</span>
                                </a>
                            )}
                            {instagramUrl && (
                                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-slate-900 transition-colors" title="انستغرام">
                                    <span className="material-symbols-outlined text-[20px] flex items-center justify-center">photo_camera</span>
                                </a>
                            )}
                            {tiktokUrl && (
                                <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-slate-900 transition-colors" title="تيك توك">
                                    <span className="material-symbols-outlined text-[20px] flex items-center justify-center">music_note</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* عمود 2: روابط سريعة */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">روابط سريعة</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href={route('home')} className="hover:text-primary transition-colors flex items-center gap-2">
                                    <DynamicIcon name="chevron_left" className="text-xs" />
                                    الرئيسية
                                </Link>
                            </li>
                            <li>
                                <Link href={route('about')} className="hover:text-primary transition-colors flex items-center gap-2">
                                    <DynamicIcon name="chevron_left" className="text-xs" />
                                    من نحن
                                </Link>
                            </li>
                            <li>
                                <Link href={route('services.index')} className="hover:text-primary transition-colors flex items-center gap-2">
                                    <DynamicIcon name="chevron_left" className="text-xs" />
                                    الخدمات
                                </Link>
                            </li>
                            <li>
                                <Link href={route('our-projects.index')} className="hover:text-primary transition-colors flex items-center gap-2">
                                    <DynamicIcon name="chevron_left" className="text-xs" />
                                    المشاريع
                                </Link>
                            </li>
                            <li>
                                <Link href={route('blog.index')} className="hover:text-primary transition-colors flex items-center gap-2">
                                    <DynamicIcon name="chevron_left" className="text-xs" />
                                    المدونة
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* عمود 3: خدماتنا */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">خدماتنا</h4>
                        <ul className="space-y-4">
                            {Object.values(servicesList).slice(0, 5).map((service, idx) => (
                                <li key={idx}>
                                    <Link href={route('services.show', service.slug)} className="hover:text-primary transition-colors flex items-center gap-2">
                                        <DynamicIcon name="chevron_left" className="text-xs" />
                                        {service.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* عمود 4: معلومات التواصل */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">معلومات التواصل</h4>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4">
                                <DynamicIcon name="location_on" className="text-primary mt-1 shrink-0" />
                                <span className="text-sm leading-relaxed">{siteAddress}</span>
                            </li>
                            {sitePhone && (
                                <li className="flex items-center gap-4">
                                    <DynamicIcon name="call" className="text-primary shrink-0" />
                                    <span className="text-sm" dir="ltr">{sitePhone}</span>
                                </li>
                            )}
                            {siteEmail && (
                                <li className="flex items-center gap-4">
                                    <DynamicIcon name="mail" className="text-primary shrink-0" />
                                    <span className="text-sm">{siteEmail}</span>
                                </li>
                            )}
                            <li className="flex items-center gap-4">
                                <DynamicIcon name="schedule" className="text-primary shrink-0" />
                                <span className="text-sm">{workingHours}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* الحقوق */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>جميع الحقوق محفوظة © {new Date().getFullYear()} {siteName}</p>
                    <p>
                        صُمِّم بواسطة <a href="https://wa.me/967781582995" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">Aboras Soft</a>
                    </p>
                </div>
            </div>
        </footer>
        <WebsiteOfferBanner />
        </>
    );
}
