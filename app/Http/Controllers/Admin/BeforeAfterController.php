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

        $beforePath = ImageOptimizer::storeAsWebP($request->file('before_image'), 'before_after');
        $afterPath = ImageOptimizer::storeAsWebP($request->file('after_image'), 'before_after');

        $maxOrder = BeforeAfterImage::max('order') ?? 0;

        BeforeAfterImage::create([
            'title' => $request->title,
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

        $payload = [
            'title' => $request->title,
        ];

        if ($request->hasFile('before_image')) {
            $payload['before_image_path'] = ImageOptimizer::storeAsWebP(
                $request->file('before_image'),
                'before_after',
                1280, 720, 65,
                $beforeAfter->before_image_path
            );
        }

        if ($request->hasFile('after_image')) {
            $payload['after_image_path'] = ImageOptimizer::storeAsWebP(
                $request->file('after_image'),
                'before_after',
                1280, 720, 65,
                $beforeAfter->after_image_path
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
