<?php

namespace App\Models;

use App\Traits\HasMediaCleanup;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasMediaCleanup;

    /**
     * Columns that hold storage-relative image paths.
     * HasMediaCleanup will watch these for changes and clean up old files.
     */
    protected array $mediaColumns = ['image_path', 'image_url'];

    protected $fillable = [
        'title', 'title_ar', 'title_en',
        'category',
        'description', 'description_ar',
        'image_url', 'image_path',
        'status',
    ];
}
