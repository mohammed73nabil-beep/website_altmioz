import React, { useState, useEffect, useRef } from 'react';
import DynamicIcon from '@/Components/DynamicIcon';

export default function VideoSection({ videoUrl, thumbnail, title, subtitle, autoplay = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const [embedUrl, setEmbedUrl] = useState('');
    const [autoThumb, setAutoThumb] = useState('');
    const overlayRef = useRef(null);

    useEffect(() => {
        if (!videoUrl) return;
        const ytMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (ytMatch) {
            const id = ytMatch[1];
            // If autoplay is enabled, we use loop and playlist for seamless repeat
            const params = autoplay ? `autoplay=1&loop=1&playlist=${id}` : 'autoplay=1';
            setEmbedUrl(`https://www.youtube.com/embed/${id}?${params}`);
            if (!thumbnail) setAutoThumb(`https://img.youtube.com/vi/${id}/hqdefault.jpg`);
            return;
        }
        const vmMatch = videoUrl.match(/vimeo\.com\/(\d+)/);
        if (vmMatch) {
            const params = autoplay ? 'autoplay=1&loop=1' : 'autoplay=1';
            setEmbedUrl(`https://player.vimeo.com/video/${vmMatch[1]}?${params}`);
            return;
        }
        setEmbedUrl(videoUrl);
    }, [videoUrl, thumbnail, autoplay]);

    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') setIsOpen(false); };
        if (isOpen) window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen]);

    if (!videoUrl) return null;

    const isExternal = embedUrl.includes('youtube.com') || embedUrl.includes('youtu.be') || embedUrl.includes('player.vimeo.com');

    return (
        <section className="relative py-16 md:py-28 bg-white dark:bg-[#0A0502] overflow-hidden border-y border-gray-100 dark:border-white/5">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_#C9A22740_0%,_transparent_70%)]" />
            <div className="relative z-10 max-w-6xl mx-auto px-4">
                <div className="text-center mb-10 md:mb-14">
                    <span className="text-[#C9A227] font-bold tracking-widest text-sm uppercase block mb-3">شاهد أعمالنا</span>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">{title || 'شاهد كيف نحوّل مساحتك إلى تحفة فنية'}</h2>
                    {subtitle && <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
                </div>
                
                <div 
                    className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-2xl max-w-4xl mx-auto border border-gray-200 dark:border-white/5" 
                    onClick={() => setIsOpen(true)} 
                    style={{ aspectRatio: '16/9' }}
                >
                    {/* Background Video / Thumbnail */}
                    {autoplay && !isExternal ? (
                        <video 
                            src={embedUrl.startsWith('/storage/') ? embedUrl : `/storage/${embedUrl}`} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            autoPlay 
                            loop 
                            playsInline
                        />
                    ) : autoplay && isExternal ? (
                        <div className="w-full h-full pointer-events-none scale-110">
                             <iframe 
                                src={`${embedUrl}&controls=0&showinfo=0&rel=0&enablejsapi=1`} 
                                className="w-full h-full border-0" 
                                allow="autoplay; encrypted-media" 
                            />
                        </div>
                    ) : (
                        thumbnail || autoThumb ? (
                            <img src={thumbnail || autoThumb} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" alt="Video thumbnail" />
                        ) : (
                            <video 
                                src={embedUrl.startsWith('/storage/') ? embedUrl : `/storage/${embedUrl}#t=0.1`} 
                                className="w-full h-full object-cover" 
                                preload="metadata"
                                muted
                            />
                        )
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            {!autoplay && <div className="absolute inset-0 rounded-full bg-[#C9A227]/30 animate-ping scale-150" />}
                            <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center group-hover:bg-white/20 group-hover:border-[#C9A227] transition-all duration-300 group-hover:scale-110">
                                <DynamicIcon name="play_arrow" className="text-white text-5xl md:text-6xl ms-2" />
                            </div>
                        </div>
                    </div>

                    {/* Autoplay Badge */}
                    {autoplay && (
                        <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Preview</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease]" onClick={(e) => e.target === overlayRef.current && setIsOpen(false)}>
                    <div className="relative w-full max-w-5xl">
                        <button onClick={() => setIsOpen(false)} className="absolute -top-12 left-0 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                            <DynamicIcon name="close" className="text-2xl" />
                            <span>إغلاق</span>
                        </button>
                        <div className="rounded-2xl overflow-hidden shadow-2xl bg-black" style={{ aspectRatio: '16/9' }}>
                            {isExternal ? (
                                <iframe src={embedUrl} className="w-full h-full border-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                            ) : (
                                <video 
                                    src={embedUrl.startsWith('/storage/') ? embedUrl : `/storage/${embedUrl}`} 
                                    className="w-full h-full" 
                                    controls 
                                    autoPlay
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
