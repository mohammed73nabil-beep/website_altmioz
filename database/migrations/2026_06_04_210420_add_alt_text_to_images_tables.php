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
        Schema::table('gallery_images', function (Blueprint $table) {
            $table->string('alt_text')->nullable()->after('title');
        });

        Schema::table('before_after_images', function (Blueprint $table) {
            $table->string('alt_text')->nullable()->after('title');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('gallery_images', function (Blueprint $table) {
            $table->dropColumn('alt_text');
        });

        Schema::table('before_after_images', function (Blueprint $table) {
            $table->dropColumn('alt_text');
        });
    }
};
