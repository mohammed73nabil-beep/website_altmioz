<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$contents = \App\Models\Content::where('type', 'image')->get();
foreach($contents as $c) {
    if(strpos($c->key, 'background') !== false || strpos($c->key, 'hero') !== false) {
        echo $c->key . " : " . $c->value . "\n";
    }
}
