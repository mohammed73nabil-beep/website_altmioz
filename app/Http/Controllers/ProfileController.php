<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Helpers\ImageOptimizer;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status'          => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Upload / replace the user's avatar.
     */
    public function uploadAvatar(Request $request): RedirectResponse
    {
        $request->validate([
            'avatar' => ['required', 'file', 'mimes:jpg,jpeg,png,gif,webp', 'max:5120'],
        ]);

        $user = $request->user();

        // Convert to WebP (800×800) and delete old file automatically
        $path = ImageOptimizer::storeAvatarWebP(
            $request->file('avatar'),
            $user->avatar  // old path to delete
        );

        $user->update(['avatar' => $path]);

        return Redirect::route('profile.edit')->with('status', 'avatar-updated');
    }

    /**
     * Remove the user's avatar (revert to initials).
     */
    public function removeAvatar(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
            $user->update(['avatar' => null]);
        }

        return Redirect::route('profile.edit')->with('status', 'avatar-removed');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
