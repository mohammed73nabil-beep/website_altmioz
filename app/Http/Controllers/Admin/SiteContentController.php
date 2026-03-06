<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteContent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SiteContentController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/SiteContent/Index', [
            'contents' => SiteContent::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'key' => 'required|string|max:255',
            'type' => 'required|in:text,image,long_text',
            'value' => 'nullable|string'
        ]);

        if ($request->hasFile('file') && $validated['type'] === 'image') {
            $path = $request->file('file')->store('site_images', 'public');
            $validated['value'] = $path;
        }

        SiteContent::updateOrCreate(
            ['key' => $validated['key']],
            ['type' => $validated['type'], 'value' => $validated['value']]
        );

        return back()->with('success', 'Content updated successfully.');
    }

    public function destroy(SiteContent $siteContent)
    {
        // If it's an image, delete it from storage first
        if ($siteContent->type === 'image' && $siteContent->value) {
            if (Storage::disk('public')->exists($siteContent->value)) {
                Storage::disk('public')->delete($siteContent->value);
            }
        }

        $siteContent->delete();

        return back()->with('success', 'Content deleted successfully.');
    }
}
