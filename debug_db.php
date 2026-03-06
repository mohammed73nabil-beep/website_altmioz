<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$contents = \App\Models\Content::where('type', 'image')->get();
$output = "Total image records: " . $contents->count() . "\n";
foreach ($contents as $c) {
    $output .= "ID: {$c->id} | Page: [{$c->page}] | Key: [{$c->key}] | Value: [{$c->value}] | Status: [{$c->status}]\n";
}
$pages = \App\Models\Content::distinct()->pluck('page');
$output .= "\nAll unique page names:\n";
foreach ($pages as $p) {
    $output .= "- [$p]\n";
}
file_put_contents('debug_dump.txt', $output);
echo "Dumped to debug_dump.txt\n";
