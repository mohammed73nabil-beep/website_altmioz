<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * ProjectController
 *
 * Image cleanup (deleting old/orphaned files) is handled automatically by the
 * HasMediaCleanup trait on the Project model — no manual Storage::delete needed here.
 */
class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Projects/Index', [
            'projects' => Project::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_ar'      => 'required|string|max:255',
            'title_en'      => 'nullable|string|max:255',
            'category'      => 'required|string|max:100',
            'description_ar' => 'nullable|string',
            'status'        => 'required|in:In Progress,Completed',
            'image_before'  => 'nullable|image|max:5120',
            'image_after'   => 'nullable|image|max:5120',
        ]);

        // Store uploaded files and resolve paths
        $imageBefore = $request->hasFile('image_before')
            ? $request->file('image_before')->store('projects', 'public')
            : null;

        $imageAfter = $request->hasFile('image_after')
            ? $request->file('image_after')->store('projects', 'public')
            : null;

        // image_path = primary display image (after → fallback to before)
        $primaryImage = $imageAfter ?? $imageBefore;

        Project::create([
            'title'         => $validated['title_ar'],
            'title_ar'      => $validated['title_ar'],
            'title_en'      => $validated['title_en'] ?? $validated['title_ar'],
            'category'      => $validated['category'],
            'description'   => $validated['description_ar'] ?? '',
            'description_ar' => $validated['description_ar'] ?? '',
            'status'        => $validated['status'],
            'image_path'    => $primaryImage,
            'image_url'     => $primaryImage ?? '',
        ]);

        return back()->with('success', 'تمت إضافة المشروع بنجاح.');
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title_ar'      => 'required|string|max:255',
            'title_en'      => 'nullable|string|max:255',
            'category'      => 'required|string|max:100',
            'description_ar' => 'nullable|string',
            'status'        => 'required|in:In Progress,Completed',
            'image_before'  => 'nullable|image|max:5120',
            'image_after'   => 'nullable|image|max:5120',
        ]);

        // Upload new images (if provided)
        $imageAfter = $request->hasFile('image_after')
            ? $request->file('image_after')->store('projects', 'public')
            : null;

        // Build the update payload
        $payload = [
            'title'         => $validated['title_ar'],
            'title_ar'      => $validated['title_ar'],
            'title_en'      => $validated['title_en'] ?? $validated['title_ar'],
            'category'      => $validated['category'],
            'description'   => $validated['description_ar'] ?? '',
            'description_ar' => $validated['description_ar'] ?? '',
            'status'        => $validated['status'],
        ];

        // Only overwrite image_path if a new file was uploaded.
        // HasMediaCleanup will detect the dirty column and delete the OLD file.
        if ($imageAfter !== null) {
            $payload['image_path'] = $imageAfter;
            $payload['image_url']  = $imageAfter;
        }

        $project->update($payload);

        return back()->with('success', 'تم تحديث المشروع بنجاح.');
    }

    public function destroy(Project $project)
    {
        // HasMediaCleanup's `deleted` event will remove all associated image files.
        $project->delete();

        return back()->with('success', 'تم حذف المشروع بنجاح.');
    }
}
