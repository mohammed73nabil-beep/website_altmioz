<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with('category')->where('is_published', true);

        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        $posts = $query->orderBy('published_at', 'desc')->paginate(9);
        $categories = Category::all();

        return Inertia::render('Public/Blog/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'currentCategory' => $request->category,
        ]);
    }

    public function show(Post $post)
    {
        abort_if(!$post->is_published, 404);

        // Increment views
        $post->increment('views');

        // Fetch related posts (same category, excluding current)
        $relatedPosts = Post::where('category_id', $post->category_id)
            ->where('id', '!=', $post->id)
            ->where('is_published', true)
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('Public/Blog/Show', [
            'post' => $post->load('category'),
            'relatedPosts' => $relatedPosts,
        ]);
    }
}
