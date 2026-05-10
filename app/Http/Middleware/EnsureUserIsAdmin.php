<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            abort(403);
        }

        // Local/dev bootstrap: if no admins exist yet, promote the first logged-in user.
        // This keeps production safe while preventing local lockouts.
        if (! (bool) ($user->is_admin ?? false) && app()->isLocal()) {
            $adminsExist = DB::table('users')->where('is_admin', true)->exists();
            if (! $adminsExist) {
                $user->forceFill(['is_admin' => true])->save();
            }
        }

        if (! (bool) ($user->is_admin ?? false)) {
            abort(403);
        }

        return $next($request);
    }
}

