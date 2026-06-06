/**
 * Breadcrumb.jsx — مكوّن مسار التنقل المرئي
 * يدعم BreadcrumbList Schema تلقائياً عبر SeoHead
 */
import React from 'react';
import { Link } from '@inertiajs/react';
import DynamicIcon from '@/Components/DynamicIcon';

/**
 * @param {Array} items - [{ name: 'الرئيسية', url: '/' }, { name: 'الخدمات', url: '/services' }, ...]
 */
export default function Breadcrumb({ items = [] }) {
    if (!items || items.length === 0) return null;

    return (
        <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-sm flex-wrap">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (
                    <React.Fragment key={index}>
                        {isLast ? (
                            <span
                                className="text-primary font-bold truncate max-w-[200px]"
                                aria-current="page"
                            >
                                {item.name}
                            </span>
                        ) : (
                            <Link
                                href={item.url}
                                className="text-gray-400 hover:text-primary transition-colors truncate max-w-[150px]"
                            >
                                {item.name}
                            </Link>
                        )}
                        {!isLast && (
                            <DynamicIcon
                                name="chevron_left"
                                className="text-gray-300 dark:text-gray-600 text-base shrink-0"
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
}
