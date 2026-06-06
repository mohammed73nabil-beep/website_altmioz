import React, { useState, useEffect, useCallback } from 'react';

/**
 * Reusable GallerySection component.
 * Shows images in a responsive grid (large cards).
 * Clicking an image opens a full-screen lightbox.
 * An eye icon appears on hover.
 */
export default function GallerySection({ images = [], title = 'معرض الأعمال', subtitle = 'اضغط على أي صورة للمشاهدة بالحجم الكامل' }) {
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const isOpen = lightboxIndex !== null;

    // Close on Escape, next/prev on arrows
    const handleKey = useCallback((e) => {
        if (!isOpen) return;
        if (e.key === 'Escape') setLightboxIndex(null);
        if (e.key === 'ArrowLeft') setLightboxIndex(i => (i + 1) % images.length);
        if (e.key === 'ArrowRight') setLightboxIndex(i => (i - 1 + images.length) % images.length);
    }, [isOpen, images.length]);

    useEffect(() => {
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [handleKey]);

    // Prevent body scroll while lightbox is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!images || images.length === 0) return null;

    const currentImg = isOpen ? images[lightboxIndex] : null;

    return (
        <>
            {/* ── Gallery Grid ─────────────────────────────────────────────── */}
            <section className="py-20 bg-white dark:bg-[#040A12] border-t border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Heading */}
                    <div className="text-center mb-14">
                        <span className="inline-block text-primary font-bold tracking-widest text-xs uppercase mb-3">معرض أعمالنا</span>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3">{title}</h2>
                        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
                        <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-primary mx-auto mt-5 rounded-full"></div>
                    </div>

                    {/* Grid — 1 col on mobile, 2 on sm, 3 on lg */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((img, idx) => (
                            <button
                                key={img.id}
                                onClick={() => setLightboxIndex(idx)}
                                className="group relative rounded-3xl overflow-hidden shadow-xl focus:outline-none focus:ring-2 focus:ring-[#C5A059] bg-black transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
                                style={{ aspectRatio: '16/11' }}
                            >
                                {/* Image */}
                                <img
                                    src={`/storage/${img.image_path}`}
                                    alt={img.alt_text || img.title || 'صورة أعمال'}
                                    width="400"
                                    height="300"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-60"
                                    loading="lazy"
                                    decoding="async"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-400 flex flex-col items-center justify-center gap-2">
                                    {/* Eye Icon */}
                                    <div className="opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white">
                                        <span className="material-symbols-outlined text-3xl">visibility</span>
                                    </div>
                                    {img.title && (
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-bold bg-black/50 px-3 py-1 rounded-full max-w-[90%] truncate">
                                            {img.title}
                                        </span>
                                    )}
                                </div>

                                {/* Gold corner accent */}
                                <div className="absolute top-0 left-0 w-0 group-hover:w-1 h-full bg-primary transition-all duration-300"></div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Lightbox ─────────────────────────────────────────────────── */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center"
                    onClick={() => setLightboxIndex(null)}
                >
                    {/* Close */}
                    <button
                        className="absolute top-4 left-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 w-11 h-11 rounded-full flex items-center justify-center transition-all z-10"
                        onClick={() => setLightboxIndex(null)}
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>

                    {/* Image counter */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium bg-black/40 px-4 py-1.5 rounded-full">
                        {lightboxIndex + 1} / {images.length}
                    </div>

                    {/* Prev */}
                    {images.length > 1 && (
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-all z-10"
                            onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i - 1 + images.length) % images.length); }}
                        >
                            <span className="material-symbols-outlined text-3xl">chevron_right</span>
                        </button>
                    )}

                    {/* Next */}
                    {images.length > 1 && (
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center transition-all z-10"
                            onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i + 1) % images.length); }}
                        >
                            <span className="material-symbols-outlined text-3xl">chevron_left</span>
                        </button>
                    )}

                    {/* Main Image */}
                    <div
                        className="relative max-w-5xl max-h-[85vh] w-full mx-4 flex flex-col items-center gap-3"
                        onClick={e => e.stopPropagation()}
                    >
                        <img
                            src={`/storage/${currentImg.image_path}`}
                            alt={currentImg.alt_text || currentImg.title || 'صورة أعمال'}
                            className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl"
                        />
                        {currentImg.title && (
                            <p className="text-white/80 text-sm font-medium bg-white/10 backdrop-blur px-5 py-2 rounded-full">
                                {currentImg.title}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
