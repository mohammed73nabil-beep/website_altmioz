import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div style={{ minHeight: '100vh' }}>
            {children}
        </div>
    );
}

