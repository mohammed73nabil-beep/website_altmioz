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
        Schema::create('project_requests', function (Blueprint $table) {
            $table->id();
            $table->string('client_name');
            $table->string('client_email');
            $table->string('company_name')->nullable();
            $table->string('project_type');
            $table->string('budget_range')->nullable();
            $table->text('project_details');
            $table->json('attachments')->nullable();
            $table->enum('status', ['pending', 'reviewed', 'accepted', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_requests');
    }
};
