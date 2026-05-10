<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Content;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class ContentController extends Controller
{
    public function index()
    {
        $contents = Cache::remember('admin_contents_index', 60, function () {
            return Content::query()
                ->select(['id', 'page', 'section', 'key', 'type', 'value', 'extra_value', 'status'])
                ->orderBy('page')
                ->orderBy('section')
                ->orderBy('id')
                ->get();
        });
        return Inertia::render('Admin/Contents/Index', [
            'contents' => $contents
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'page' => 'required|string|max:255',
            'section' => 'required|string|max:255',
            'key' => 'required|string|max:255|unique:contents,key',
            'type' => 'required|string|in:short_text,long_text,image,video,button,color',
            'value' => 'nullable|string',
            'extra_value' => 'nullable|string',
            'status' => 'required|in:published,hidden',
        ]);

        if ($request->hasFile('file') && $validated['type'] === 'image') {
            $path = $request->file('file')->store('contents', 'public');
            $validated['value'] = $path;
        }

        $validated['created_by'] = auth()->id();

        Content::create($validated);

        return redirect()->back()->with('success', 'تم إضافة المحتوى بنجاح');
    }

    public function update(Request $request, Content $content)
    {
        $validated = $request->validate([
            'page' => 'required|string|max:255',
            'section' => 'required|string|max:255',
            'key' => 'required|string|max:255|unique:contents,key,' . $content->id,
            'type' => 'required|string|in:short_text,long_text,image,video,button,color',
            'value' => 'nullable|string',
            'extra_value' => 'nullable|string',
            'status' => 'required|in:published,hidden',
        ]);

        if ($request->hasFile('file') && $validated['type'] === 'image') {
            if ($content->value && Storage::disk('public')->exists($content->value)) {
                Storage::disk('public')->delete($content->value);
            }
            $path = $request->file('file')->store('contents', 'public');
            $validated['value'] = $path;
        } elseif (!$request->hasFile('file') && $validated['type'] === 'image') {
            $validated['value'] = $content->value;
        }

        $content->update($validated);

        return redirect()->back()->with('success', 'تم تحديث المحتوى بنجاح');
    }

    public function destroy(Content $content)
    {
        if ($content->type === 'image' && $content->value) {
            if (Storage::disk('public')->exists($content->value)) {
                Storage::disk('public')->delete($content->value);
            }
        }
        
        $content->delete();

        return redirect()->back()->with('success', 'تم حذف المحتوى بنجاح');
    }

    public function bulkUpdate(Request $request, string $page)
    {
        $validated = $request->validate([
            'contents' => 'required|array',
            'contents.*.key' => 'required|string|exists:contents,key',
            'contents.*.value' => 'nullable|string',
            'contents.*.file' => 'nullable|image|max:2048',
        ]);

        foreach ($validated['contents'] as $index => $item) {
            $content = Content::where('key', $item['key'])->first();
            
            if (!$content) {
                $content = new Content();
                $content->page = $page;
                $content->key = $item['key'];
                $content->section = $item['section'] ?? 'عام';
                $content->type = $item['type'] ?? 'short_text';
                $content->status = 'published';
                $content->created_by = auth()->id();
            }

            if ($content->type === 'image' && $request->hasFile("contents.{$index}.file")) {
                if ($content->value && Storage::disk('public')->exists($content->value) && !str_starts_with($content->value, 'http')) {
                    Storage::disk('public')->delete($content->value);
                }
                $path = $request->file("contents.{$index}.file")->store('contents', 'public');
                $content->value = $path;
            } elseif ($content->type !== 'image') {
                $content->value = $item['value'] ?? $content->value;
            }
            
            $content->save();
        }

        return redirect()->back()->with('success', 'تم حفظ التعديلات بنجاح');
    }
}
