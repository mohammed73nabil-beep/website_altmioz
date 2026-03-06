<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactMessageRequest;
use App\Models\ContactMessage;
use App\Notifications\NewContactMessage;
use Illuminate\Support\Facades\Notification;

class ContactController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContactMessageRequest $request)
    {
        $message = ContactMessage::create($request->validated());

        // Notify admin (using a configuration email or default)
        $adminEmail = env('MAIL_FROM_ADDRESS', 'admin@example.com');
        Notification::route('mail', $adminEmail)->notify(new NewContactMessage($message));

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Your message has been sent successfully.',
                'data' => $message
            ], 201);
        }

        return redirect()->back()->with('success', 'Your message has been sent successfully.');
    }
}
