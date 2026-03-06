<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProjectRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectRequestController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/ProjectRequests/Index', [
            'requests' => ProjectRequest::latest()->paginate(10)
        ]);
    }

    public function updateStatus(Request $request, ProjectRequest $projectRequest)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,reviewed,accepted,rejected'
        ]);
        
        $projectRequest->update($validated);
        return back()->with('success', 'Project request status updated.');
    }
    
    public function destroy(ProjectRequest $projectRequest)
    {
        $projectRequest->delete();
        return back()->with('success', 'Project request deleted.');
    }
}
