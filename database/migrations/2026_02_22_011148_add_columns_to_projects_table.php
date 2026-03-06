<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('title_ar')->nullable();
            $table->string('title_en')->nullable();
            $table->text('description_ar')->nullable();
            $table->string('status')->default('In Progress');
            $table->string('image_path')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['title_ar', 'title_en', 'description_ar', 'status', 'image_path']);
        });
    }
};
