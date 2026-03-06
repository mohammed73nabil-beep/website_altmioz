<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Helpers\ImageOptimizer;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryController extends Controller
{
    // Pages available for gallery management
    private const PAGES = [
        'home'         => 'الصفحة الرئيسية',
        'services'     => 'صفحة الخدمات',
        'caravans'     => 'صيانة الكرفانات',
        'portacabins'  => 'صيانة البركسات',
        'buildings'    => 'صيانة المباني',
    ];

    /**
     * Show page selector or list images for a specific page.
     */
    public function index(Request $request)
    {
        $page   = $request->query('page');
        $pages  = self::PAGES;
        $images = [];

        if ($page && array_key_exists($page, $pages)) {
            $images = GalleryImage::where('page', $page)
                ->orderBy('order')
                ->get();
        }

        return Inertia::render('Admin/Gallery/Index', [
            'pages'        => $pages,
            'selectedPage' => $page,
            'images'       => $images,
        ]);
    }

    /**
     * Store a new gallery image.
     */
    public function store(Request $request)
    {
        $request->validate([
            'page'       => ['required', 'string', 'in:' . implode(',', array_keys(self::PAGES))],
            'image'      => ['required', 'file', 'mimes:jpg,jpeg,png,gif,webp', 'max:10240'],
            'title'      => ['nullable', 'string', 'max:255'],
        ]);

        // Convert to WebP and store (max 1920×1080, quality 82)
        $path = ImageOptimizer::storeAsWebP($request->file('image'), 'gallery');

        GalleryImage::create([
            'page'       => $request->page,
            'title'      => $request->title,
            'image_path' => $path,
            'order'      => GalleryImage::where('page', $request->page)->max('order') + 1,
        ]);

        return back()->with('success', 'تمت إضافة الصورة بنجاح.');
    }

    /**
     * Update an existing gallery image (title only, or replace image).
     */
    public function update(Request $request, GalleryImage $gallery)
    {
        $request->validate([
            'image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,gif,webp', 'max:10240'],
            'title' => ['nullable', 'string', 'max:255'],
        ]);

        if ($request->hasFile('image')) {
            // Convert new image to WebP, delete old file automatically
            $gallery->image_path = ImageOptimizer::storeAsWebP(
                $request->file('image'),
                'gallery',
                1920, 1080, 82,
                $gallery->image_path  // old path — deleted inside helper
            );
        }

        $gallery->title = $request->title;
        $gallery->save();

        return back()->with('success', 'تم تعديل الصورة بنجاح.');
    }

    /**
     * Delete a gallery image.
     */
    public function destroy(GalleryImage $gallery)
    {
        if ($gallery->image_path) {
            Storage::disk('public')->delete($gallery->image_path);
        }
        $gallery->delete();

        return back()->with('success', 'تم حذف الصورة بنجاح.');
    }
}
