<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Content;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class NewServicesSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::first() ?? User::factory()->create();

        $services = config('services_list');

        foreach ($services as $slug => $service) {
            $pageName = $service['title'];

            // SEO Meta Title
            Content::updateOrCreate(
                ['key' => "services.{$slug}.seo.title"],
                [
                    'page' => $pageName,
                    'section' => 'السيو (SEO)',
                    'type' => 'short_text',
                    'value' => $service['title'] . ' | مقاولات عامة وديكورات',
                    'status' => 'published',
                    'created_by' => $admin->id,
                ]
            );

            // SEO Meta Description
            Content::updateOrCreate(
                ['key' => "services.{$slug}.seo.description"],
                [
                    'page' => $pageName,
                    'section' => 'السيو (SEO)',
                    'type' => 'long_text',
                    'value' => $service['desc'],
                    'status' => 'published',
                    'created_by' => $admin->id,
                ]
            );

            // Hero Title
            Content::updateOrCreate(
                ['key' => "services.{$slug}.hero.title"],
                [
                    'page' => $pageName,
                    'section' => 'البانر الرئيسي',
                    'type' => 'short_text',
                    'value' => $service['title'],
                    'status' => 'published',
                    'created_by' => $admin->id,
                ]
            );

            // Hero Subtitle
            Content::updateOrCreate(
                ['key' => "services.{$slug}.hero.subtitle"],
                [
                    'page' => $pageName,
                    'section' => 'البانر الرئيسي',
                    'type' => 'long_text',
                    'value' => $service['desc'],
                    'status' => 'published',
                    'created_by' => $admin->id,
                ]
            );
            
            // Overview Paragraph
            Content::updateOrCreate(
                ['key' => "services.{$slug}.overview.text"],
                [
                    'page' => $pageName,
                    'section' => 'نبذة عن الخدمة',
                    'type' => 'long_text',
                    'value' => 'نقدم أفضل خدمات ' . $service['title'] . ' بأعلى معايير الجودة والمقاييس لضمان رضا عملائنا وتحقيق تطلعاتهم.',
                    'status' => 'published',
                    'created_by' => $admin->id,
                ]
            );
        }
    }
}
