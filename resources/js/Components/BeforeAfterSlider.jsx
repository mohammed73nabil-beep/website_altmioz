import React, { useState, useRef } from 'react';

export default function BeforeAfterSlider({ beforeImage, afterImage }) {
    const [sliderPos, setSliderPos] = useState(50);
    const containerRef = useRef(null);
    const isDragging = useRef(false);

    const updatePosition = (clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        let pos = (x / rect.width) * 100;
        pos = Math.max(0, Math.min(100, pos));
        setSliderPos(pos);
    };

    const handleMove = (e) => {
        if (!isDragging.current && e.type !== 'touchmove' && e.type !== 'click') return;
        
        let clientX = e.clientX;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
        }
        updatePosition(clientX);
    };

    const handleDown = (e) => {
        isDragging.current = true;
        let clientX = e.clientX;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
        }
        updatePosition(clientX);
        
        const handleUp = () => {
            isDragging.current = false;
            document.removeEventListener('mouseup', handleUp);
            document.removeEventListener('mousemove', handleGlobalMove);
        };
        
        const handleGlobalMove = (moveEvent) => {
            if (isDragging.current) {
                updatePosition(moveEvent.clientX);
            }
        };

        document.addEventListener('mouseup', handleUp);
        document.addEventListener('mousemove', handleGlobalMove);
    };

    return (
        <div 
            ref={containerRef}
            className="relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-2xl touch-none group bg-[#064E3B]"
            onMouseDown={handleDown}
            onTouchStart={handleDown}
            onTouchMove={handleMove}
            onClick={handleMove}
        >
            {/* Before Image (Background) */}
            <img 
                src={beforeImage} 
                alt="Before" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80'; }}
            />

            {/* After Image (Foreground) */}
            <div 
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
                <img 
                    src={afterImage} 
                    alt="After" 
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1558904541-efa843a96f0f?auto=format&fit=crop&w=1000&q=80'; }}
                />
            </div>

            {/* Slider Handle */}
            <div 
                className="absolute top-0 bottom-0 w-1 bg-[#22C55E] shadow-[0_0_15px_rgba(34,197,94,0.8)] pointer-events-none flex items-center justify-center z-10 transition-transform duration-75"
                style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
                <div className="w-12 h-12 rounded-full bg-[#064E3B] border-2 border-[#22C55E] shadow-lg flex items-center justify-center text-[#22C55E] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[24px] transform rotate-90">unfold_more</span>
                </div>
            </div>
            
            {/* Labels */}
            <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md text-white px-5 py-2 text-sm font-bold rounded-xl pointer-events-none z-10 border border-white/20">
                قبل التنفيذ
            </div>
            <div className="absolute top-6 left-6 bg-[#22C55E]/90 backdrop-blur-md text-white px-5 py-2 text-sm font-bold rounded-xl pointer-events-none z-10 shadow-lg">
                بعد التنفيذ
            </div>
        </div>
    );
}
