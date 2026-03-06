<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectRequest extends Model
{
    protected $fillable = [
        'client_name',
        'client_email',
        'company_name',
        'project_type',
        'budget_range',
        'project_details',
        'attachments',
        'status',
    ];

    protected $casts = [
        'attachments' => 'array',
    ];
}
