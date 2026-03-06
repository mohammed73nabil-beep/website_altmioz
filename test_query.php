<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$testPages = ['صيانة الكرفانات', 'صيانة البركسات', 'صيانة المباني'];

foreach ($testPages as $page) {
    echo "Testing Page: [$page]\n";
    
    // Test exact match
    $exact = \App\Models\Content::where('page', $page)->count();
    echo " - Exact match count: $exact\n";
    
    // Test LIKE match
    $like = \App\Models\Content::where('page', 'like', "%$page%")->count();
    echo " - Like match count: $like\n";
    
    // Check what's actually there
    if ($exact == 0 && $like == 0) {
        $first = \App\Models\Content::where('page', 'like', '%' . mb_substr($page, 2, 5) . '%')->first();
        if ($first) {
            echo " - Found potential match: [{$first->page}] for query [$page]\n";
            echo " - Hex of DB page: " . bin2hex($first->page) . "\n";
            echo " - Hex of Query page: " . bin2hex($page) . "\n";
        }
    }
}
