<?php

use App\Models\Content;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$backgrounds = [
    [
        'page' => 'الخدمات',
        'section' => 'خلفية قسم الترويسة (Hero)',
        'key' => 'services.hero.background_image',
        'type' => 'image',
        'value' => null, // Default empty so it uses fallback
        'extra_value' => '50',
        'status' => 'published',
    ],
    [
        'page' => 'الخدمات',
        'section' => 'خلفية دعوة اتخاذ الإجراء (CTA)',
        'key' => 'services.cta.background_image',
        'type' => 'image',
        'value' => null,
        'extra_value' => '50',
        'status' => 'published',
    ],
    [
        'page' => 'تواصل معنا',
        'section' => 'خلفية صفحة التواصل',
        'key' => 'contact.hero.background_image',
        'type' => 'image',
        'value' => null,
        'extra_value' => '50',
        'status' => 'published',
    ]
];

foreach ($backgrounds as $bg) {
    Content::firstOrCreate(
        ['key' => $bg['key']],
        $bg
    );
}

// Add the default pages if missing
$pagesToEnsure = [
    'الخدمات',
    'تواصل معنا',
];

echo "Background keys added successfully!\n";
