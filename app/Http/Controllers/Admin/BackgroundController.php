<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Helpers\ImageOptimizer;
use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BackgroundController extends Controller
{
    public function index()
    {
        $contents = Content::where('type', 'image')
            ->get()
            ->groupBy('page');

        return Inertia::render('Admin/Backgrounds/Index', [
            'backgroundPages' => $contents
        ]);
    }

    public function update(Request $request, Content $content)
    {
        $request->validate([
            'image'   => 'nullable|image|max:10240',
            'opacity' => 'required|numeric|min:0|max:100',
        ]);

        if ($request->hasFile('image')) {
            $oldPath = ($content->value && !str_starts_with($content->value, 'http') && !str_starts_with($content->value, '/images/'))
                ? $content->value
                : null;

            $content->value = ImageOptimizer::storeAsWebP(
                $request->file('image'),
                'backgrounds',
                1280, 720, 65,
                $oldPath
            );
        }

        $content->extra_value = $request->input('opacity');
        $content->save();

        // ✅ مسح جميع مفاتيح الكاش المرتبطة بالصفحات
        $this->clearAllPageCaches();

        return redirect()->back()->with('success', 'تم تحديث الخلفية وتعديل الشفافية بنجاح.');
    }

    public function destroy(Content $content)
    {
        if ($content->value && !str_starts_with($content->value, 'http') && !str_starts_with($content->value, '/images/')) {
            Storage::disk('public')->delete($content->value);
        }

        $content->value = null;
        $content->save();

        // ✅ مسح جميع مفاتيح الكاش المرتبطة بالصفحات
        $this->clearAllPageCaches();

        return redirect()->back()->with('success', 'تم إزالة الصورة بنجاح وتفريغ قيمتها من قاعدة البيانات.');
    }

    /**
     * يمسح جميع مفاتيح الـ cache الخاصة بالصفحات العامة.
     */
    protected function clearAllPageCaches(): void
    {
        Cache::flush();
    }
}

