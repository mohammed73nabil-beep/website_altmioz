<?php

// Fix corrupted Arabic page names in contents table for background images
// and add missing landscaping/design background records

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

// ============================================================
// 1) Fix corrupted page names for IDs 411-415
// ============================================================
$fixes = [
    411 => ['page' => 'تنسيق الحدائق', 'section' => 'الهيدر - الصورة الرئيسية'],
    412 => ['page' => 'تنسيق الحدائق', 'section' => 'لماذا نحن - الصورة الرئيسية'],
    413 => ['page' => 'تصميم الحدائق', 'section' => 'الهيدر - الصورة الرئيسية'],
    414 => ['page' => 'تصميم الحدائق', 'section' => 'لماذا نحن - الصورة الرئيسية'],
    415 => ['page' => 'العشب الصناعي', 'section' => 'لماذا نحن - الصورة الرئيسية'],
];

foreach ($fixes as $id => $data) {
    $updated = DB::table('contents')->where('id', $id)->update([
        'page'    => $data['page'],
        'section' => $data['section'],
    ]);
    echo ($updated ? "✅" : "⚠️ (not found)") . " ID $id => page='{$data['page']}' section='{$data['section']}'\n";
}

// ============================================================
// 2) Ensure the landscaping hero.image record exists with correct type
// ============================================================
$landscapingKeys = [
    [
        'page'    => 'تنسيق الحدائق',
        'section' => 'الهيدر - الصورة الرئيسية',
        'key'     => 'services.landscaping.hero.image',
        'type'    => 'image',
    ],
    [
        'page'    => 'تنسيق الحدائق',
        'section' => 'لماذا نحن - الصورة الرئيسية',
        'key'     => 'services.landscaping.why.image',
        'type'    => 'image',
    ],
];

foreach ($landscapingKeys as $item) {
    $exists = DB::table('contents')->where('key', $item['key'])->exists();
    if (!$exists) {
        DB::table('contents')->insert([
            'page'        => $item['page'],
            'section'     => $item['section'],
            'key'         => $item['key'],
            'type'        => $item['type'],
            'value'       => null,
            'extra_value' => '50',
            'status'      => 'published',
            'created_at'  => now(),
            'updated_at'  => now(),
        ]);
        echo "✅ Created: {$item['key']}\n";
    } else {
        // Ensure type is correct
        DB::table('contents')->where('key', $item['key'])->update([
            'type'    => 'image',
            'page'    => $item['page'],
            'section' => $item['section'],
        ]);
        echo "🔄 Updated type/page for: {$item['key']}\n";
    }
}

// ============================================================
// 3) Verify final state
// ============================================================
echo "\n--- Verification ---\n";
$results = DB::table('contents')
    ->where('page', 'تنسيق الحدائق')
    ->orWhere('page', 'تصميم الحدائق')
    ->get(['id', 'page', 'section', 'key', 'type']);

foreach ($results as $r) {
    echo "ID={$r->id} | page={$r->page} | key={$r->key} | type={$r->type}\n";
}

// ============================================================
// 4) Clear relevant caches
// ============================================================
\Illuminate\Support\Facades\Cache::forget('page_contents_landscaping');
\Illuminate\Support\Facades\Cache::forget('page_contents_design');
\Illuminate\Support\Facades\Cache::forget('published_page_contents');
\Illuminate\Support\Facades\Cache::forget('admin_contents_index');
echo "\n✅ All caches cleared.\n";
