import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function SettingsIndex({ settings, auth }) {
    // Helper to extract setting values safely
    const getSettingValue = (group, key, defaultValue = '') => {
        return settings[group]?.[key]?.value || defaultValue;
    };

    const formData = {
        settings: [
            // General
            { key: 'site_name', value: getSettingValue('general', 'site_name'), type: 'text', group: 'general' },
            { key: 'contact_email', value: getSettingValue('general', 'contact_email'), type: 'email', group: 'general' },
            { key: 'contact_phone', value: getSettingValue('general', 'contact_phone'), type: 'text', group: 'general' },
            { key: 'address', value: getSettingValue('general', 'address'), type: 'text', group: 'general' },
            { key: 'working_hours', value: getSettingValue('general', 'working_hours'), type: 'text', group: 'general' },

            // Social Media
            { key: 'facebook_url', value: getSettingValue('social', 'facebook_url'), type: 'text', group: 'social' },
            { key: 'twitter_url', value: getSettingValue('social', 'twitter_url'), type: 'text', group: 'social' },
            { key: 'instagram_url', value: getSettingValue('social', 'instagram_url'), type: 'text', group: 'social' },

            // SEO Meta
            { key: 'meta_title', value: getSettingValue('seo', 'meta_title'), type: 'text', group: 'seo' },
            { key: 'meta_description', value: getSettingValue('seo', 'meta_description'), type: 'text', group: 'seo' },

            // Image
            { key: 'site_logo', value: getSettingValue('general', 'site_logo'), type: 'image', group: 'general', file: null },
        ]
    };

    const { data, setData, post, processing, errors } = useForm(formData);
    const [activeTab, setActiveTab] = useState('general');

    const handleSettingChange = (index, field, value) => {
        const newSettings = [...data.settings];
        newSettings[index][field] = value;
        setData('settings', newSettings);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('admin.settings.update'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                router.reload();
            }
        });
    };

    const renderSettingInput = (setting, index) => {
        if (setting.type === 'image') {
            return (
                <div key={setting.key} className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1 capitalize">
                        {setting.key.replace('_', ' ')}
                    </label>
                    <div className="flex items-center space-x-4">
                        {setting.value && typeof setting.value === 'string' && (
                            <img src={setting.value.startsWith('http') ? setting.value : `/storage/${setting.value}`} alt="Current Logo" className="h-12 w-12 object-contain bg-white rounded p-1" />
                        )}
                        <input
                            type="file"
                            className="bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-[#C9A227] focus:border-[#C9A227] sm:text-sm text-white p-2"
                            onChange={(e) => handleSettingChange(index, 'file', e.target.files[0])}
                            accept="image/*"
                        />
                    </div>
                    {errors?.[`settings.${index}.file`] && (
                        <div className="text-red-500 text-sm mt-1">{errors[`settings.${index}.file`]}</div>
                    )}
                </div>
            );
        }

        return (
            <div key={setting.key} className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1 capitalize">
                    {setting.key.replace('_', ' ')}
                </label>
                {setting.type === 'textarea' ? (
                    <textarea
                        value={setting.value || ''}
                        onChange={(e) => handleSettingChange(index, 'value', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-[#C9A227] focus:border-[#C9A227] sm:text-sm text-white"
                        rows="3"
                    />
                ) : (
                    <input
                        type={setting.type}
                        value={setting.value || ''}
                        onChange={(e) => handleSettingChange(index, 'value', e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-[#C9A227] focus:border-[#C9A227] sm:text-sm text-white"
                    />
                )}
            </div>
        );
    };

    const tabs = [
        { id: 'general', label: 'General & Logo' },
        { id: 'social', label: 'Social Media' },
        { id: 'seo', label: 'SEO Settings' },
    ];

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Site Settings</h2>}
        >
            <Head title="Settings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-700">

                            {/* Tabs */}
                            <div className="border-b border-gray-700 mb-6">
                                <nav className="-mb-px flex space-x-8">
                                    {tabs.map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`${activeTab === tab.id
                                                ? 'border-[#C9A227] text-[#C9A227]'
                                                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-6">
                                    {data.settings.map((setting, index) => {
                                        if (setting.group !== activeTab) return null;
                                        return renderSettingInput(setting, index);
                                    })}
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-900 bg-[#C9A227] hover:bg-[#e3c059] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#C9A227] transition-colors disabled:opacity-50"
                                    >
                                        Save Settings
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
