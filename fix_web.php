<?php
$file = 'routes/web.php';
$content = file_get_contents($file);

// Caravans replacement
$caravans_old = <<<'CODE'
Route::get('/services/caravans', function () {
    // Fix #5: cache contents + gallery per page with 10-min TTL
    $contents = Cache::remember('page_contents_caravans', 600, function () {
        return \App\Models\Content::where('page', 'صيانة الكرفانات')->get();
    });
    return Inertia::render('Public/Services/Caravans', [
        'projects'          => Cache::remember('projects_caravans', 600, fn () =>
            \App\Models\Project::where('category', 'like', '%كرفان%')
                ->orWhere('title', 'like', '%كرفان%')
                ->latest()->take(4)->get()
        ),
        'pageContents'      => $contents->pluck('value', 'key'),
        'pageContentExtras' => $contents->pluck('extra_value', 'key'),
        'galleryImages'     => Cache::remember('gallery_page_caravans', 600, fn () =>
            \App\Models\GalleryImage::where('page', 'caravans')->orderBy('order')->get()
        ),
    ]);
});
CODE;

$caravans_new = <<<'CODE'
Route::get('/services/caravans', function () {
    $contents = \App\Models\Content::where('page', 'صيانة الكرفانات')->get();

    return Inertia::render('Public/Services/Caravans', [
        'projects'          => \App\Models\Project::where('category', 'like', '%كرفان%')
            ->orWhere('title', 'like', '%كرفان%')
            ->latest()->take(4)->get(),
        'pageContents'      => $contents->pluck('value', 'key'),
        'pageContentExtras' => $contents->pluck('extra_value', 'key'),
        'galleryImages'     => \App\Models\GalleryImage::where('page', 'caravans')->orderBy('order')->get(),
    ]);
});
CODE;

// Portacabins replacement
$portacabins_old = <<<'CODE'
Route::get('/services/portacabins', function () {
    $contents = Cache::remember('page_contents_portacabins', 600, function () {
        return \App\Models\Content::where('page', 'صيانة البركسات')->get();
    });
    return Inertia::render('Public/Services/Portacabins', [
        'projects'          => Cache::remember('projects_portacabins', 600, fn () =>
            \App\Models\Project::where('category', 'like', '%بركس%')
                ->orWhere('title', 'like', '%بركس%')
                ->latest()->take(4)->get()
        ),
        'pageContents'      => $contents->pluck('value', 'key'),
        'pageContentExtras' => $contents->pluck('extra_value', 'key'),
        'galleryImages'     => Cache::remember('gallery_page_portacabins', 600, fn () =>
            \App\Models\GalleryImage::where('page', 'portacabins')->orderBy('order')->get()
        ),
    ]);
});
CODE;

$portacabins_new = <<<'CODE'
Route::get('/services/portacabins', function () {
    $contents = \App\Models\Content::where('page', 'صيانة البركسات')->get();

    return Inertia::render('Public/Services/Portacabins', [
        'projects'          => \App\Models\Project::where('category', 'like', '%بركس%')
            ->orWhere('title', 'like', '%بركس%')
            ->latest()->take(4)->get(),
        'pageContents'      => $contents->pluck('value', 'key'),
        'pageContentExtras' => $contents->pluck('extra_value', 'key'),
        'galleryImages'     => \App\Models\GalleryImage::where('page', 'portacabins')->orderBy('order')->get(),
    ]);
});
CODE;

// Buildings replacement
$buildings_old = <<<'CODE'
Route::get('/services/buildings', function () {
    $contents = Cache::remember('page_contents_buildings', 600, function () {
        return \App\Models\Content::where('page', 'صيانة المباني')->get();
    });
    return Inertia::render('Public/Services/Buildings', [
        'projects'          => Cache::remember('projects_buildings', 600, fn () =>
            \App\Models\Project::where('category', 'like', '%مبان%')
                ->orWhere('title', 'like', '%مبان%')
                ->latest()->take(4)->get()
        ),
        'pageContents'      => $contents->pluck('value', 'key'),
        'pageContentExtras' => $contents->pluck('extra_value', 'key'),
        'galleryImages'     => Cache::remember('gallery_page_buildings', 600, fn () =>
            \App\Models\GalleryImage::where('page', 'buildings')->orderBy('order')->get()
        ),
    ]);
});
CODE;

$buildings_new = <<<'CODE'
Route::get('/services/buildings', function () {
    $contents = \App\Models\Content::where('page', 'صيانة المباني')->get();

    return Inertia::render('Public/Services/Buildings', [
        'projects'          => \App\Models\Project::where('category', 'like', '%مبان%')
            ->orWhere('title', 'like', '%مبان%')
            ->latest()->take(4)->get(),
        'pageContents'      => $contents->pluck('value', 'key'),
        'pageContentExtras' => $contents->pluck('extra_value', 'key'),
        'galleryImages'     => \App\Models\GalleryImage::where('page', 'buildings')->orderBy('order')->get(),
    ]);
});
CODE;

$content = str_replace($caravans_old, $caravans_new, $content);
$content = str_replace($portacabins_old, $portacabins_new, $content);
$content = str_replace($buildings_old, $buildings_new, $content);

file_put_contents($file, $content);
echo "Updated web.php successfully\n";
