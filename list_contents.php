<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Content;

$contents = Content::all();
foreach ($contents as $c) {
    echo "ID: " . $c->id . " | Title: " . $c->title . " | Key: " . $c->key . "\n";
}
