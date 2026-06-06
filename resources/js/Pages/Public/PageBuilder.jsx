import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import HeroSection from '@/Components/Blocks/HeroSection';
import AboutSection from '@/Components/Blocks/AboutSection';
import ServicesGrid from '@/Components/Blocks/ServicesGrid';
import ContactForm from '@/Components/Blocks/ContactForm';

export default function PageBuilder({ pageData }) {
    if (!pageData || !pageData.content) {
        return (
            <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center text-gray-400">
                <p>لا يوجد محتوى لعرضه.</p>
            </div>
        );
    }

    const renderBlock = (block) => {
        switch (block.type) {
            case 'HeroSection': return <HeroSection key={block.id} data={block.data} />;
            case 'AboutSection': return <AboutSection key={block.id} data={block.data} />;
            case 'ServicesGrid': return <ServicesGrid key={block.id} data={block.data} />;
            case 'ContactForm': return <ContactForm key={block.id} data={block.data} />;
            default: return null;
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-gray-800 dark:text-gray-100 font-display selection:bg-primary selection:text-slate-900" dir="rtl" lang="ar" style={{ fontFamily: '"Almarai", "Manrope", sans-serif' }}>
            <Head>
                <title>{pageData.meta_title?.ar || pageData.title?.ar || 'الموقع'}</title>
                {pageData.meta_description?.ar && <meta name="description" content={pageData.meta_description.ar} />}
                {pageData.meta_keywords?.ar && <meta name="keywords" content={pageData.meta_keywords.ar} />}
            </Head>

            <Navbar />

            <main>
                {pageData.content.map(renderBlock)}
            </main>

            <footer className="bg-[#040A12] py-8 border-t border-white/5 relative z-20 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="text-2xl font-black text-white mb-4">شركة مظلات التميز</div>
                    <p className="text-sm text-gray-500">© 2026 تم التطوير بواسطة محمد نبيل    .</p>
                </div>
            </footer>
        </div>
    );
}
