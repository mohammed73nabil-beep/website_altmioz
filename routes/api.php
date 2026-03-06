<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ProjectRequestController;
use App\Http\Controllers\Api\PageController;

Route::post('/contact', [ContactController::class, 'store']);
Route::post('/project-request', [ProjectRequestController::class, 'store']);
Route::get('/pages/{slug}', [PageController::class, 'show']);
