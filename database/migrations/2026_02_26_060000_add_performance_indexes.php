<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Performance fix: add missing indexes highlighted in the performance audit.
 *
 * Fixes:
 *  - projects.category   (used in LIKE queries on service pages)
 *  - projects.status     (used in completed count dashboard query)
 *  - projects.created_at (used in latest() ordering)
 *  - project_requests.status (used in pending count dashboard query)
 *  - contents.page + status composite (used in content manager queries)
 *  - site_contents.key   (used for key-based pluck lookups)
 *  - settings.key        (used for key-based settings lookups)
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->index('category', 'idx_projects_category');
            $table->index('status',   'idx_projects_status');
            $table->index('created_at', 'idx_projects_created_at');
        });

        Schema::table('project_requests', function (Blueprint $table) {
            $table->index('status', 'idx_project_requests_status');
        });

        Schema::table('contents', function (Blueprint $table) {
            $table->index('page',   'idx_contents_page');
            $table->index(['page', 'status'], 'idx_contents_page_status');
        });

        Schema::table('site_contents', function (Blueprint $table) {
            // Add index on key if it doesn't already exist
            $table->index('key', 'idx_site_contents_key');
        });

        Schema::table('settings', function (Blueprint $table) {
            $table->index('key', 'idx_settings_key');
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropIndex('idx_projects_category');
            $table->dropIndex('idx_projects_status');
            $table->dropIndex('idx_projects_created_at');
        });

        Schema::table('project_requests', function (Blueprint $table) {
            $table->dropIndex('idx_project_requests_status');
        });

        Schema::table('contents', function (Blueprint $table) {
            $table->dropIndex('idx_contents_page');
            $table->dropIndex('idx_contents_page_status');
        });

        Schema::table('site_contents', function (Blueprint $table) {
            $table->dropIndex('idx_site_contents_key');
        });

        Schema::table('settings', function (Blueprint $table) {
            $table->dropIndex('idx_settings_key');
        });
    }
};
