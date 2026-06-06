<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Handle the incoming request.
     *
     * Fix: When the browser restores a tab after a long idle period, it may
     * re-issue the last XHR (which carried X-Inertia: true). If the cached
     * response is replayed before the JS runtime is ready, the raw JSON is
     * displayed on screen. Setting Cache-Control: no-store on every Inertia
     * XHR response prevents the browser from ever caching that JSON payload.
     */
    public function handle(Request $request, \Closure $next)
    {
        $response = parent::handle($request, $next);
        
        $response->headers->set('Vary', 'X-Inertia');

        // Prevent raw JSON from appearing when the user returns to a stale tab.
        if ($request->header('X-Inertia')) {
            $response->headers->set('Cache-Control', 'no-store, no-cache, must-revalidate');
            $response->headers->set('Pragma', 'no-cache');
        }
        
        return $response;
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Admin pages do not need the full public CMS payload on every request.
        // Keeping props smaller dramatically speeds up Inertia navigation.
        if ($request->is('admin*') || $request->is('profile*')) {
            return [
                ...parent::share($request),
                'auth' => [
                    'user' => $request->user(),
                ],
                'flash' => [
                    'message' => fn () => $request->session()->get('message'),
                    'success' => fn () => $request->session()->get('success'),
                ],
            ];
        }

        // Public: Cache settings so we don't hit the DB on every request.
        $settings = Cache::rememberForever('global_settings', function () {
            return \App\Models\Setting::all()->mapWithKeys(function ($item) {
                return [$item->key => [
                    'value' => $item->value,
                    'group' => $item->group,
                    'type'  => $item->type,
                ]];
            })->toArray();
        });

        // Public: Fetch and cache a lightweight flat array instead of heavy Eloquent models to prevent max_allowed_packet errors.
        $pageData = Cache::rememberForever('published_page_contents', function () {
            $published = \App\Models\Content::where('status', 'published')
                ->select(['key', 'value', 'extra_value'])
                ->get();

            return [
                'contents' => $published->pluck('value', 'key')->toArray(),
                'extras'   => $published->pluck('extra_value', 'key')->toArray(),
            ];
        });

        $pageContents = $pageData['contents'];
        $pageContentExtras = $pageData['extras'];

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'globalSettings' => $settings,
            'pageContents' => $pageContents,
            'pageContentExtras' => $pageContentExtras,
            'servicesList' => config('services_list'),
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'success' => fn () => $request->session()->get('success')
            ]
        ];
    }
}
