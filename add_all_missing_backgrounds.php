<?php

use App\Models\Content;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$backgrounds = [
    // Landscaping Page
    [
        'page' => 'تنسيق الحدائق',
        'section' => 'خلفية قسم الترويسة',
        'key' => 'services.landscaping.hero.image',
        'type' => 'image',
        'value' => null,
        'extra_value' => '40',
        'status' => 'published',
    ],
    // Design Page
    [
        'page' => 'تصميم الحدائق',
        'section' => 'خلفية قسم الترويسة',
        'key' => 'services.design.hero.image',
        'type' => 'image',
        'value' => null,
        'extra_value' => '40',
        'status' => 'published',
    ],
    // Artificial Grass Page
    [
        'page' => 'العشب الصناعي',
        'section' => 'خلفية قسم الترويسة',
        'key' => 'services.artificial_grass.hero.image',
        'type' => 'image',
        'value' => null,
        'extra_value' => '40',
        'status' => 'published',
    ],
    // Blog Page
    [
        'page' => 'المدونة',
        'section' => 'خلفية قسم الترويسة',
        'key' => 'blog.hero.background_image',
        'type' => 'image',
        'value' => null,
        'extra_value' => '80',
        'status' => 'published',
    ]
];

foreach ($backgrounds as $bg) {
    Content::firstOrCreate(
        ['key' => $bg['key']],
        $bg
    );
}

echo "Missing background keys added successfully!\n";
