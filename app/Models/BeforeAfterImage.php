<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class BeforeAfterImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'before_image_path',
        'after_image_path',
        'order',
    ];

    protected static function booted()
    {
        static::created(function ($image) {
            Cache::forget('home_before_after_images');
        });

        static::updated(function ($image) {
            Cache::forget('home_before_after_images');
        });

        static::deleted(function ($image) {
            Cache::forget('home_before_after_images');
            if ($image->before_image_path) {
                Storage::disk('public')->delete($image->before_image_path);
            }
            if ($image->after_image_path) {
                Storage::disk('public')->delete($image->after_image_path);
            }
        });
    }
}
