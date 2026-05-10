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

        // Public: Fetch the published content collection ONCE, then map it twice.
        $publishedContents = Cache::rememberForever('published_page_contents', function () {
            return \App\Models\Content::where('status', 'published')->get();
        });

        $pageContents = $publishedContents
            ->mapWithKeys(fn ($item) => [$item->key => $item->value])
            ->toArray();

        $pageContentExtras = $publishedContents
            ->mapWithKeys(fn ($item) => [$item->key => $item->extra_value])
            ->toArray();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'globalSettings' => $settings,
            'pageContents' => $pageContents,
            'pageContentExtras' => $pageContentExtras,
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'success' => fn () => $request->session()->get('success')
            ]
        ];
    }
}
