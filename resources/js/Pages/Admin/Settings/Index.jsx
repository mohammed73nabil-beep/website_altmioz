import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, router } from "@inertiajs/react";

/*
|-----------------------------------------
| تعريف هيكل الإعدادات
|-----------------------------------------
*/

const SETTINGS_SCHEMA = {
    general: [
        { key: "site_name", label: "اسم الموقع", type: "text" },
        { key: "contact_email", label: "البريد الإلكتروني", type: "email" },
        { key: "contact_phone", label: "رقم الهاتف (اتصال مباشر)", type: "text" },
        { key: "contact_whatsapp", label: "رقم الواتساب", type: "text" },
        { key: "address", label: "العنوان", type: "text" },
        { key: "map_url", label: "رابط الخريطة (Google Maps Embed)", type: "text" },
        { key: "working_hours", label: "ساعات العمل", type: "text" },
        { key: "site_logo", label: "شعار الموقع", type: "image" },
    ],

    social: [
        { key: "facebook_url", label: "رابط فيسبوك", type: "text" },
        { key: "twitter_url", label: "رابط أكس (تويتر)", type: "text" },
        { key: "instagram_url", label: "رابط انستغرام", type: "text" },
        { key: "tiktok_url", label: "رابط تيك توك", type: "text" },
    ],

    seo: [
        { key: "meta_title", label: "عنوان SEO", type: "text" },
        { key: "meta_description", label: "وصف SEO", type: "textarea" },
    ],
};

/*
|-----------------------------------------
| تحويل الإعدادات القادمة من السيرفر
|-----------------------------------------
*/

const buildFormData = (settings) => {
    const result = [];

    Object.entries(SETTINGS_SCHEMA).forEach(([group, fields]) => {
        fields.forEach((field) => {
            result.push({
                key: field.key,
                label: field.label,
                type: field.type,
                group: group,
                value: settings[group]?.[field.key]?.value || "",
                file: null,
            });
        });
    });

    return { settings: result };
};

export default function SettingsIndex({ settings, auth }) {

    const { data, setData, post, processing, errors, transform } = useForm(
        buildFormData(settings)
    );

    const [activeTab, setActiveTab] = useState("general");

    /*
    |-----------------------------------------
    | تحديث قيمة الإعداد
    |-----------------------------------------
    */

    const updateSetting = (key, field, value) => {
        const updated = data.settings.map((setting) =>
            setting.key === key ? { ...setting, [field]: value } : setting
        );

        setData("settings", updated);
    };

    /*
    |-----------------------------------------
    | إرسال النموذج
    |-----------------------------------------
    */

    const submit = (e) => {
        e.preventDefault();

        transform((data) => ({
            ...data,
            settings: data.settings.map(s => {
                const copy = { ...s };
                if (!copy.file) {
                    delete copy.file;
                }
                return copy;
            })
        }));

        post(route("admin.settings.update"), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                router.reload();
            },
        });
    };

    /*
    |-----------------------------------------
    | رسم المدخلات
    |-----------------------------------------
    */

    const renderInput = (setting) => {

        // صورة
        if (setting.type === "image") {
            return (
                <div key={setting.key} className="mb-6">

                    <label className="block text-sm text-gray-300 mb-2">
                        {setting.label}
                    </label>

                    <div className="flex items-center gap-4">

                        {setting.value && (
                            <div className="relative group shrink-0">
                                <img
                                    src={
                                        setting.value.startsWith("http")
                                            ? setting.value
                                            : `/storage/${setting.value}`
                                    }
                                    className="h-14 w-14 bg-white rounded p-1 object-contain"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        updateSetting(setting.key, "value", "");
                                        updateSetting(setting.key, "file", null);
                                    }}
                                    className="absolute -top-2 -left-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow-md transition"
                                    title="حذف الصورة"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                updateSetting(setting.key, "file", e.target.files[0])
                            }
                            className="bg-gray-700 text-white p-2 rounded"
                        />

                    </div>

                    {errors?.[`settings.${data.settings.findIndex(s => s.key === setting.key)}.file`] && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors[`settings.${data.settings.findIndex(s => s.key === setting.key)}.file`]}
                        </div>
                    )}
                </div>
            );
        }

        // textarea
        if (setting.type === "textarea") {
            return (
                <div key={setting.key} className="mb-6">

                    <label className="block text-sm text-gray-300 mb-1">
                        {setting.label}
                    </label>

                    <textarea
                        rows="3"
                        value={setting.value}
                        onChange={(e) =>
                            updateSetting(setting.key, "value", e.target.value)
                        }
                        className="w-full bg-gray-700 text-white rounded p-2"
                    />

                </div>
            );
        }

        // input عادي
        return (
            <div key={setting.key} className="mb-6">

                <label className="block text-sm text-gray-300 mb-1">
                    {setting.label}
                </label>

                <input
                    type={setting.type}
                    value={setting.value}
                    onChange={(e) =>
                        updateSetting(setting.key, "value", e.target.value)
                    }
                    className="w-full bg-gray-700 text-white rounded p-2"
                />

            </div>
        );
    };

    /*
    |-----------------------------------------
    | التبويبات
    |-----------------------------------------
    */

    const tabs = [
        { id: "general", label: "الإعدادات العامة" },
        { id: "social", label: "وسائل التواصل" },
        { id: "seo", label: "إعدادات SEO" },
    ];

    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white">
                    إعدادات الموقع
                </h2>
            }
        >
            <Head title="إعدادات الموقع" />

            <div className="py-12">

                <div className="max-w-6xl mx-auto">

                    <div className="bg-gray-800 rounded-lg p-8">

                        {/* التبويبات */}

                        <div className="flex gap-6 border-b border-gray-700 mb-8">

                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`pb-3 border-b-2 text-sm
                                    ${activeTab === tab.id
                                            ? "border-yellow-500 text-yellow-500"
                                            : "border-transparent text-gray-400"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}

                        </div>

                        {/* النموذج */}

                        <form onSubmit={submit}>

                            {data.settings
                                .filter((s) => s.group === activeTab)
                                .map(renderInput)}

                            <div className="flex justify-end mt-8">

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded transition"
                                >
                                    حفظ الإعدادات
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
}