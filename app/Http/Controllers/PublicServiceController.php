<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\GalleryImage;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class PublicServiceController extends Controller
{
    public function show($slug)
    {
        $servicesList = config('services_list');
        
        if (!array_key_exists($slug, $servicesList)) {
            abort(404);
        }
        
        $service = $servicesList[$slug];
        $pageName = $service['title'];
        
        // Fetch contents specifically for this service page
        $contents = Cache::remember("page_contents_{$slug}", 600, function () use ($pageName) {
            return Content::where('page', $pageName)->get();
        });
        
        // Fetch projects for this service category
        $projects = Cache::remember("projects_{$slug}", 600, function () use ($pageName) {
            return Project::where('category', $pageName)->latest()->take(6)->get();
        });
        
        // Fetch gallery images for this service page
        $galleryImages = Cache::remember("gallery_page_{$slug}", 600, function () use ($slug) {
            return GalleryImage::where('page', $slug)->orderBy('order')->get();
        });
        
        return Inertia::render('Public/Services/Show', [
            'service'           => $service,
            'pageContents'      => $contents->pluck('value', 'key'),
            'pageContentExtras' => $contents->pluck('extra_value', 'key'),
            'projects'          => $projects,
            'galleryImages'     => $galleryImages,
        ]);
    }
}
