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
    /**
     * Get dynamic pages for the gallery.
     */
    private function getPages()
    {
        $basePages = [
            'home'     => 'الرئيسية',
            'services' => 'الخدمات',
            'blog'     => 'المدونة',
            'projects' => 'مشاريعنا',
            'about'    => 'من نحن',
            'contact'  => 'اتصل بنا',
        ];

        $servicePages = collect(config('services_list'))->mapWithKeys(function ($service) {
            return [$service['slug'] => $service['title']];
        })->toArray();

        return array_merge($basePages, $servicePages);
    }

    /**
     * Show page selector or list images for a specific page.
     */
    public function index(Request $request)
    {
        $page   = $request->query('page');
        $pages  = $this->getPages();
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
            'page'       => ['required', 'string', 'in:' . implode(',', array_keys($this->getPages()))],
            'image'      => ['required', 'file', 'mimes:jpg,jpeg,png,gif,webp', 'max:10240'],
            'title'      => ['nullable', 'string', 'max:255'],
        ]);

        // Check the 20 images limit per page
        $imageCount = GalleryImage::where('page', $request->page)->count();
        if ($imageCount >= 20) {
            return back()->withErrors(['image' => 'عذراً، لا يمكن إضافة أكثر من 20 صورة لهذا القسم. الرجاء حذف بعض الصور القديمة أولاً.']);
        }

        // Automatically translate title to English for SEO naming and alt text
        $altText = null;
        if (!empty($request->title)) {
            $altText = \App\Helpers\TranslationHelper::translateArabicToEnglish($request->title);
        }

        // Convert to WebP and store (max 1280×720, quality 65)
        $path = ImageOptimizer::storeAsWebP(
            $request->file('image'),
            'gallery',
            1280, 720, 65,
            null,
            $altText
        );

        GalleryImage::create([
            'page'       => $request->page,
            'title'      => $request->title,
            'alt_text'   => $altText,
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

        // Automatically translate title to English for SEO naming and alt text
        $altText = $gallery->alt_text;
        if ($request->has('title')) {
            $altText = \App\Helpers\TranslationHelper::translateArabicToEnglish($request->title);
        }

        if ($request->hasFile('image')) {
            // Convert new image to WebP, delete old file automatically
            $gallery->image_path = ImageOptimizer::storeAsWebP(
                $request->file('image'),
                'gallery',
                1280, 720, 65,
                $gallery->image_path,  // old path — deleted inside helper
                $altText
            );
        }

        $gallery->title = $request->title;
        $gallery->alt_text = $altText;
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
