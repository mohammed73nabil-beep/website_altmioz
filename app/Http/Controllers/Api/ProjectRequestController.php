<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequestRequest;
use App\Models\ProjectRequest;
use App\Notifications\NewProjectRequest;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;

class ProjectRequestController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequestRequest $request)
    {
        $data = $request->validated();
        
        $attachmentPaths = [];
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('project_attachments', 'public');
                $attachmentPaths[] = $path;
            }
        }
        $data['attachments'] = $attachmentPaths;
        $data['status'] = 'pending';

        $projectReq = ProjectRequest::create($data);

        // Notify admin
        $adminEmail = config('site.admin_email', 'admin@example.com');
        Notification::route('mail', $adminEmail)->notify(new NewProjectRequest($projectReq));

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Your project request has been submitted successfully.',
                'data' => $projectReq
            ], 201);
        }

        return redirect()->back()->with('success', 'Your project request has been submitted successfully.');
    }
}
