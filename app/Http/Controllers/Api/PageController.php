<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PageController extends Controller
{
    /**
     * Fetch a dynamic page by its slug (e.g. 'home', 'about')
     */
    public function show($slug)
    {
        // Cache the published page response
        $pageData = Cache::remember("page_{$slug}_published", 60 * 60 * 24, function () use ($slug) {
            $page = Page::with('activeVersion')
                ->where('slug', $slug)
                ->where('status', 'published')
                ->first();

            if (!$page || !$page->activeVersion) {
                return null;
            }

            return [
                'id' => $page->id,
                'slug' => $page->slug,
                'title' => $page->title,
                'meta_title' => $page->meta_title,
                'meta_description' => $page->meta_description,
                'meta_keywords' => $page->meta_keywords,
                'content' => $page->activeVersion->content,
                'last_updated' => $page->activeVersion->created_at,
            ];
        });

        if (!$pageData) {
            return response()->json(['message' => 'Page not found or not published.'], 404);
        }

        return response()->json($pageData);
    }
}
