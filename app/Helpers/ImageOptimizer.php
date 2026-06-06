<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;

class ImageOptimizer
{
    /**
     * Process an uploaded file, convert to WebP, and store it.
     *
     * @param  UploadedFile  $file        The uploaded file from the request.
     * @param  string        $directory   Storage directory inside public disk (e.g. 'gallery').
     * @param  int           $maxWidth    Maximum width in pixels (default 1280).
     * @param  int           $maxHeight   Maximum height in pixels (default 720).
     * @param  int           $quality     WebP quality 1-100 (default 65).
     * @param  string|null   $oldPath     Optional old file path to delete before saving.
     * @return string  Relative path stored in public disk.
     */
    public static function storeAsWebP(
        UploadedFile $file,
        string $directory,
        int $maxWidth  = 1280,
        int $maxHeight = 720,
        int $quality   = 80,
        ?string $oldPath = null,
        ?string $customName = null
    ): string {
        // Delete previous file if supplied
        if ($oldPath) {
            Storage::disk('public')->delete($oldPath);
        }

        // Build a unique filename
        if ($customName) {
            $slug = Str::slug($customName);
            if (empty($slug)) {
                $filename = Str::uuid() . '.webp';
            } else {
                $filename = substr($slug, 0, 100) . '-' . Str::random(6) . '.webp';
            }
        } else {
            $filename  = Str::uuid() . '.webp';
        }
        $storagePath = $directory . '/' . $filename;
        $fullPath    = Storage::disk('public')->path($storagePath);

        // Ensure directory exists
        Storage::disk('public')->makeDirectory($directory);

        // Use Intervention Image 3.x API
        $manager = new ImageManager(new GdDriver());
        $image   = $manager->read($file->getRealPath());

        // Scale down proportionally if the image exceeds the maximum dimensions;
        // never upscale.
        if ($image->width() > $maxWidth || $image->height() > $maxHeight) {
            $image->scaleDown($maxWidth, $maxHeight);
        }

        // Encode and save as WebP
        $image->toWebp($quality)->save($fullPath);

        return $storagePath;
    }

    /**
     * Convenience overload for avatar / profile photos.
     * Sizes the image to a square (800×800) suitable for avatars.
     */
    public static function storeAvatarWebP(
        UploadedFile $file,
        ?string $oldPath = null
    ): string {
        return self::storeAsWebP($file, 'avatars', 720, 720, 80, $oldPath);
    }
}
