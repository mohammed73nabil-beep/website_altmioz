import React, { useEffect, useRef, useState } from 'react';
import { usePage } from '@inertiajs/react';

/**
 * WebsiteOfferBanner - Compact Version
 * صندوق احترافي في منتصف الصفحة فوق الفوتر
 */
export default function WebsiteOfferBanner() {
    const { globalSettings } = usePage().props;
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    // Scroll reveal logic
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    // Contact Data (Fixed WhatsApp for Selynk - independent of CMS settings)
    const rawPhone = '967781582995';
    const cleanPhone = '967781582995';
    const siteName  = globalSettings?.site_name?.value  || 'موقعنا';

    const message = encodeURIComponent(
        `مرحباً 👋\nأنا زائر من موقع ${siteName} وأرغب في الاستفسار عن تصميم موقع لعملي.`
    );
    const waLink = `https://wa.me/${cleanPhone}?text=${message}`;

    return (
        <section 
            id="website-offer-banner"
            ref={ref}
            className="py-10 px-4 bg-transparent overflow-hidden"
        >
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-150%) skewX(-25deg); }
                    100% { transform: translateX(150%) skewX(-25deg); }
                }
                .shimmer-effect::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100px;
                    height: 100%;
                    background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
                    animation: shimmer 3s infinite;
                    filter: blur(20px);
                }
            `}</style>
            
            <div 
                className={`max-w-4xl mx-auto transition-all duration-1000 transform ${
                    visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
                }`}
            >
                <div 
                    className="shimmer-effect relative rounded-3xl p-6 md:p-8 text-center md:text-right overflow-hidden shadow-xl border border-white/10 bg-cover bg-center"
                    style={{
                        backgroundImage: "linear-gradient(to bottom, rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.65)), url('/images/website_banner_bg.png')",
                    }}
                >
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1">
                            <span className="inline-block py-0.5 px-3 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider mb-2">
                                اطلب خدمتك الآن
                            </span>
                            
                            <h2 className="text-xl md:text-2xl font-black text-white mb-2 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                                اطلب موقع لعملك الآن
                            </h2>
                            
                            <p className="text-slate-200 text-xs md:text-sm max-w-xl leading-relaxed">
                                انضم إلى قائمة عملائنا المميزين واحصل على موقع إلكتروني يعكس احترافية أعمالك ويضاعف مبيعاتك.
                            </p>
                        </div>
                        
                        <div className="flex flex-col items-center shrink-0">
                            <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1fb355] text-white font-bold text-sm md:text-base py-3 px-6 rounded-xl transition-all duration-300 shadow-[0_5px_15px_rgba(37,211,102,0.2)] hover:-translate-y-0.5 active:scale-95"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                                </svg>
                                <span>تواصل واتساب</span>
                                <span className="absolute inset-0 rounded-xl border-2 border-[#25D366] animate-ping opacity-20 group-hover:opacity-0" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
