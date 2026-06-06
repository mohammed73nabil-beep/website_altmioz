import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import DynamicIcon from '@/Components/DynamicIcon';

export default function FloatingContact() {
    const { globalSettings } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);

    // Clean phone number for links (remove spaces, etc)
    const rawPhone = globalSettings?.contact_phone?.value || '+967781582995';
    const cleanPhone = rawPhone.replace(/[^\d+]/g, '');

    const rawWhatsapp = globalSettings?.contact_whatsapp?.value || rawPhone;
    const cleanWhatsapp = rawWhatsapp.replace(/[^\d+]/g, '').replace('+', '');

    // Tiktok URL from settings if available, else default empty
    const tiktokUrl = globalSettings?.tiktok_url?.value || 'https://tiktok.com';

    return (
        <div className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-[100] font-display" dir="rtl">
            {/* Expandable Menu */}
            <div className={`flex flex-col gap-3 mb-4 transition-all duration-300 origin-bottom ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>

                {/* WhatsApp Button */}
                <a
                    href={`https://wa.me/${cleanWhatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-[0_10px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_10px_20px_rgba(37,211,102,0.5)] border border-transparent hover:scale-110 transition-all hover:brightness-110"
                    title="تواصل عبر واتساب"
                >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                </a>

                {/* TikTok Button */}
                <a
                    href={tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] border border-transparent hover:scale-110 transition-all hover:brightness-125"
                    title="تواصل عبر تيك توك"
                >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
                </a>

                {/* Call Button */}
                <a
                    href={`tel:${cleanPhone}`}
                    className="w-12 h-12 rounded-full bg-[#007AFF] flex items-center justify-center text-white shadow-[0_10px_20px_rgba(0,122,255,0.3)] hover:shadow-[0_10px_20px_rgba(0,122,255,0.5)] border border-transparent hover:scale-110 transition-all hover:brightness-110"
                    title="اتصل بنا"
                >
                    <DynamicIcon name="call" className="text-xl" />
                </a>
            </div>

            {/* Main Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 relative group ${isOpen ? 'bg-surface-dark shadow-[0_10px_30px_rgba(0,0,0,0.4)]' : 'bg-[#25D366] hover:bg-[#20bd5a]'}`}
                aria-label="تواصل معنا"
            >
                {/* WhatsApp Icon (when closed) */}
                <svg className={`w-8 h-8 fill-current absolute transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 rotate-90' : 'scale-100 opacity-100 rotate-0'}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                
                {/* Close Icon (when open) */}
                <DynamicIcon name="close" className={`text-3xl absolute transition-all duration-300 ${isOpen ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-90'}`} />

                {/* Ping animation effect */}
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-50 group-hover:hidden"></span>
                )}
            </button>
        </div>
    );
}
