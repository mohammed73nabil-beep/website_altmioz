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
        Schema::create('contents', function (Blueprint $table) {
            $table->id();
            $table->string('page');
            $table->string('section');
            $table->string('key')->unique();
            $table->string('type'); // short text, long text, image, video, button, color
            $table->text('value')->nullable();
            $table->text('extra_value')->nullable();
            $table->enum('status', ['published', 'hidden'])->default('published');
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contents');
    }
};
