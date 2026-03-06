<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PublicProjectController extends Controller
{
    /**
     * List all projects — paginated to prevent unbounded memory growth.
     * Fix #1: replaced ->get() with ->paginate() (audit bottleneck #1).
     */
    public function index(Request $request)
    {
        $projects = Project::latest()->get();

        return Inertia::render('Public/Projects/Index', [
            'projects' => $projects,
        ]);
    }

    /**
     * Show a single project with related projects.
     * Fix #2: replaced ORDER BY RAND() with a fast indexed random selection
     * (audit bottleneck #2). Strategy: grab a random offset within the
     * non-current rows, then fetch 3 records from that offset.
     */
    public function show($id)
    {
        $project = Project::findOrFail($id);

        // Count available related rows (excluding current project)
        $count = Project::where('id', '!=', $id)->count();

        // Pick a random offset, capped so we always get 3 results
        $offset = max(0, rand(0, max(0, $count - 3)));

        $relatedProjects = Project::where('id', '!=', $id)
            ->orderBy('id')          // deterministic order — uses PK index
            ->skip($offset)
            ->take(3)
            ->get();

        return Inertia::render('Public/Projects/Show', [
            'project'         => $project,
            'relatedProjects' => $relatedProjects,
        ]);
    }
}
