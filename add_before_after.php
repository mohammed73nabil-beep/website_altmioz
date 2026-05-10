<?php
use App\Models\Content;

$keys = [
    [
        'page' => 'الرئيسية',
        'section' => 'مقارنة قبل وبعد',
        'key' => 'home.before_after.title',
        'type' => 'short_text',
        'value' => 'شاهد التحول الجذري لمساحتك',
        'status' => 'published'
    ],
    [
        'page' => 'الرئيسية',
        'section' => 'مقارنة قبل وبعد',
        'key' => 'home.before_after.subtitle',
        'type' => 'long_text',
        'value' => 'نسعى دائماً لتقديم الأفضل، اسحب الشريط لترى كيف نحول المساحات العادية إلى حدائق تنبض بالحياة.',
        'status' => 'published'
    ],
    [
        'page' => 'الرئيسية',
        'section' => 'مقارنة قبل وبعد',
        'key' => 'home.before_after.image_before',
        'type' => 'image',
        'value' => 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'status' => 'published'
    ],
    [
        'page' => 'الرئيسية',
        'section' => 'مقارنة قبل وبعد',
        'key' => 'home.before_after.image_after',
        'type' => 'image',
        'value' => 'https://images.unsplash.com/photo-1558904541-efa843a96f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'status' => 'published'
    ]
];

foreach ($keys as $k) {
    Content::updateOrCreate(['key' => $k['key']], $k);
}
echo "Added Before/After keys.";
