import React from 'react';

export default function DynamicIcon({ name, className = '' }) {
    if (!name) return null;

    return (
        <span
            className={`material-symbols-outlined ${className}`}
            suppressHydrationWarning // Prevent react hydration warnings
            style={{
                fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {name}
        </span>
    );
}
