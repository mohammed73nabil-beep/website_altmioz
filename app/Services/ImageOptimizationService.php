<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageOptimizationService
{
    /**
     * Optimize and save an uploaded image as WebP.
     *
     * @param \Illuminate\Http\UploadedFile $file The uploaded file instance
     * @param string $directory The directory inside the public disk
     * @return string The relative path to the saved WebP image
     */
    public function optimizeAndSave($file, string $directory = 'pages'): string
    {
        // initialize image manager with GD driver
        $manager = new ImageManager(new Driver());
        
        // Read the image from the temporary upload path
        $image = $manager->read($file->getRealPath());
        
        // Generate a unique filename with .webp extension
        $filename = uniqid('img_') . '_' . time() . '.webp';
        
        // Encode to WebP format with 80% quality
        $encodedImage = $image->toWebp(80);
        
        // Build the full storage path
        $fullPath = $directory . '/' . $filename;
        
        // Save the encoded binary data to the storage disk
        Storage::disk('public')->put($fullPath, $encodedImage->toString());
        
        return $fullPath;
    }
}
