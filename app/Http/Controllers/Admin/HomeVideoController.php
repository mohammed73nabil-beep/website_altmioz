<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Helpers\ImageOptimizer;
use App\Models\Content;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class HomeVideoController extends Controller
{
    public function index()
    {
        $videoContents = Content::where('key', 'like', 'home.video.%')->get()
            ->pluck('value', 'key');

        return Inertia::render('Admin/HomeVideo', [
            'videoContents' => $videoContents
        ]);
    }

    public function update(Request $request)
    {
        \Illuminate\Support\Facades\Log::info('HomeVideoController payload:', ['all' => $request->all(), 'files' => $request->allFiles()]);
        
        // Handle video file upload first if present
        $localPath = null;
        $videoFile = $request->file('home.video.file') ?? $request->file('home_video_file');
        
        if ($videoFile) {
            // Permanently delete old video file from storage
            $oldVideo = Content::where('key', 'home.video.local_path')->first();
            if ($oldVideo && $oldVideo->value && Storage::disk('public')->exists($oldVideo->value)) {
                Storage::disk('public')->delete($oldVideo->value);
            }

            $localPath = $videoFile->store('videos', 'public');
        }

        // Handle thumbnail upload — convert to WebP at 90% quality
        $thumbnailFile = $request->file('home.video.thumbnail') ?? $request->file('home_video_thumbnail');
        if ($thumbnailFile) {
            // Permanently delete old thumbnail file from storage
            $oldThumb = Content::where('key', 'home.video.thumbnail')->first();
            $oldThumbPath = $oldThumb?->value;

            // Use ImageOptimizer: 1920×1080 max, 90% quality WebP
            $thumbPath = ImageOptimizer::storeAsWebP(
                $thumbnailFile,
                'site_images',
                1920,
                1080,
                90,
                $oldThumbPath  // old file is deleted inside helper
            );

            Content::updateOrCreate(
                ['key' => 'home.video.thumbnail'],
                [
                    'page'    => 'الرئيسية',
                    'section' => 'فيديو الأعمال',
                    'type'    => 'image',
                    'value'   => $thumbPath,
                    'status'  => 'published'
                ]
            );
        }

        // Keys to update from request (text/type fields)
        $keys = [
            'home.video.url', 
            'home.video.type', 
            'home.video.title', 
            'home.video.subtitle',
            'home.video.autoplay'
        ];

        $data = $request->all();

        foreach ($keys as $key) {
            $underscoreKey = str_replace('.', '_', $key);
            
            $value = null;
            $hasKey = false;

            if (array_key_exists($key, $data)) {
                $value = $data[$key];
                $hasKey = true;
            } elseif (array_key_exists($underscoreKey, $data)) {
                $value = $data[$underscoreKey];
                $hasKey = true;
            } elseif ($request->has($key)) { // Nested
                $value = $request->input($key);
                $hasKey = true;
            }

            if ($hasKey) {
                $finalValue = $value;
                if ($key === 'home.video.autoplay') {
                    $finalValue = $value ? '1' : '0';
                }

                Content::updateOrCreate(
                    ['key' => $key],
                    [
                        'page'    => 'الرئيسية',
                        'section' => 'فيديو الأعمال',
                        'type'    => 'text',
                        'value'   => $finalValue ?? '',
                        'status'  => 'published'
                    ]
                );
            }
        }

        // Save local path if a new file was uploaded
        if ($localPath) {
            Content::updateOrCreate(
                ['key' => 'home.video.local_path'],
                [
                    'page'    => 'الرئيسية',
                    'section' => 'فيديو الأعمال',
                    'type'    => 'text',
                    'value'   => $localPath,
                    'status'  => 'published'
                ]
            );
        }

        Cache::forget('published_page_contents');
        Cache::forget('home_site_contents');

        return back()->with('success', 'تم تحديث بيانات الفيديو بنجاح!');
    }

    /**
     * Permanently delete the thumbnail image from storage and remove the DB record.
     */
    public function deleteThumbnail()
    {
        $thumb = Content::where('key', 'home.video.thumbnail')->first();

        if ($thumb) {
            if ($thumb->value && Storage::disk('public')->exists($thumb->value)) {
                Storage::disk('public')->delete($thumb->value);
            }
            $thumb->delete();
        }

        Cache::forget('published_page_contents');
        Cache::forget('home_site_contents');

        return back()->with('success', 'تم حذف الصورة المصغرة بنجاح!');
    }

    /**
     * Permanently delete the local video file from storage and clear the DB record.
     */
    public function deleteVideoFile()
    {
        $videoRecord = Content::where('key', 'home.video.local_path')->first();

        if ($videoRecord) {
            if ($videoRecord->value && Storage::disk('public')->exists($videoRecord->value)) {
                Storage::disk('public')->delete($videoRecord->value);
            }
            $videoRecord->value = '';
            $videoRecord->save();
        }

        // Also reset video type to youtube since there's no local file
        Content::updateOrCreate(
            ['key' => 'home.video.type'],
            [
                'page'    => 'الرئيسية',
                'section' => 'فيديو الأعمال',
                'type'    => 'text',
                'value'   => 'youtube',
                'status'  => 'published'
            ]
        );

        Cache::forget('published_page_contents');
        Cache::forget('home_site_contents');

        return back()->with('success', 'تم حذف ملف الفيديو بنجاح!');
    }
}
