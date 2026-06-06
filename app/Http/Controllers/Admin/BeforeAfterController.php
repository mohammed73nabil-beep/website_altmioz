<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BeforeAfterImage;
use App\Helpers\ImageOptimizer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BeforeAfterController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Gallery/BeforeAfter', [
            'images' => BeforeAfterImage::orderBy('order')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'before_image' => 'required|image|max:10240',
            'after_image' => 'required|image|max:10240',
        ]);

        // Check the 8 pairs limit
        if (BeforeAfterImage::count() >= 8) {
            return back()->withErrors(['before_image' => 'عذراً، لا يمكن رفع أكثر من 8 فروقات. الرجاء حذف بعض الصور القديمة أولاً.']);
        }

        // Automatically translate title to English for SEO naming and alt text
        $altText = null;
        if (!empty($request->title)) {
            $altText = \App\Helpers\TranslationHelper::translateArabicToEnglish($request->title);
        }

        $beforePath = ImageOptimizer::storeAsWebP(
            $request->file('before_image'),
            'before_after',
            1280, 720, 65,
            null,
            $altText ? $altText . '-before' : null
        );

        $afterPath = ImageOptimizer::storeAsWebP(
            $request->file('after_image'),
            'before_after',
            1280, 720, 65,
            null,
            $altText ? $altText . '-after' : null
        );

        $maxOrder = BeforeAfterImage::max('order') ?? 0;

        BeforeAfterImage::create([
            'title' => $request->title,
            'alt_text' => $altText,
            'before_image_path' => $beforePath,
            'after_image_path' => $afterPath,
            'order' => $maxOrder + 1,
        ]);

        return back()->with('success', 'تمت الإضافة بنجاح');
    }

    public function update(Request $request, BeforeAfterImage $beforeAfter)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'before_image' => 'nullable|image|max:10240',
            'after_image' => 'nullable|image|max:10240',
        ]);

        // Automatically translate title to English for SEO naming and alt text
        $altText = $beforeAfter->alt_text;
        if ($request->has('title')) {
            $altText = \App\Helpers\TranslationHelper::translateArabicToEnglish($request->title);
        }

        $payload = [
            'title' => $request->title,
            'alt_text' => $altText,
        ];

        if ($request->hasFile('before_image')) {
            $payload['before_image_path'] = ImageOptimizer::storeAsWebP(
                $request->file('before_image'),
                'before_after',
                1280, 720, 65,
                $beforeAfter->before_image_path,
                $altText ? $altText . '-before' : null
            );
        }

        if ($request->hasFile('after_image')) {
            $payload['after_image_path'] = ImageOptimizer::storeAsWebP(
                $request->file('after_image'),
                'before_after',
                1280, 720, 65,
                $beforeAfter->after_image_path,
                $altText ? $altText . '-after' : null
            );
        }

        $beforeAfter->update($payload);

        return back()->with('success', 'تم التعديل بنجاح');
    }

    public function destroy(BeforeAfterImage $beforeAfter)
    {
        $beforeAfter->delete();
        return back()->with('success', 'تم الحذف بنجاح');
    }
}
