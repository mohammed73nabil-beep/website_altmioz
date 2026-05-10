<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ProjectRequestController;
use App\Http\Controllers\Api\PageController;

Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:10,1');
Route::post('/project-request', [ProjectRequestController::class, 'store'])->middleware('throttle:6,1');
Route::get('/pages/{slug}', [PageController::class, 'show']);
