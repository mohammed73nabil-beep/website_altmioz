<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$pages = ['صيانة الكرفانات', 'صيانة البركسات', 'صيانة المباني'];

$output = "";
foreach ($pages as $page) {
    $output .= "--- Page: [$page] ---\n";
    $contents = \App\Models\Content::where('page', $page)->get();
    foreach ($contents as $c) {
        $output .= "ID: {$c->id} | Key: [{$c->key}] | Value: [{$c->value}]\n";
    }
    $output .= "\n";
}

file_put_contents('debug_keys.txt', $output);
echo "Dumped to debug_keys.txt\n";
