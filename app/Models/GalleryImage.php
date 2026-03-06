<?php

namespace App\Models;

use App\Traits\HasMediaCleanup;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class GalleryImage extends Model
{
    use HasFactory, HasMediaCleanup;

    /**
     * HasMediaCleanup uses this to know which columns to watch.
     */
    protected array $mediaColumns = ['image_path'];

    protected $fillable = [
        'page',
        'title',
        'image_path',
        'order',
    ];

    /**
     * Bust gallery cache on any change (create / update / delete).
     */
    protected static function booted(): void
    {
        $clearCache = function (self $image) {
            Cache::forget("gallery_page_{$image->page}");
        };

        static::created($clearCache);
        static::updated($clearCache);
        static::deleted($clearCache);
    }
}
