<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Content;

class ServiceImagesSeeder extends Seeder
{
    public function run(): void
    {
        $services = config('services_list');

        foreach ($services as $slug => $service) {
            $pageName = $service['title'];

            // 1. Hero Image
            Content::firstOrCreate(
                ['key' => "services.{$slug}.hero.image"],
                [
                    'page' => $pageName,
                    'section' => 'الهيدر - الخلفية',
                    'type' => 'image',
                    'value' => 'https://images.unsplash.com/photo-1558904541-efa843a96f09?q=80&w=2070&auto=format&fit=crop',
                    'extra_value' => '50',
                    'status' => 'published',
                    'created_by' => 1,
                ]
            );

            // 2. CTA Background
            Content::firstOrCreate(
                ['key' => "services.{$slug}.cta.background_image"],
                [
                    'page' => $pageName,
                    'section' => 'الخلفية السفلية (CTA)',
                    'type' => 'image',
                    'value' => 'https://images.unsplash.com/photo-1558904541-efa843a96f09?q=80&w=2070&auto=format&fit=crop',
                    'extra_value' => '50',
                    'status' => 'published',
                    'created_by' => 1,
                ]
            );

            // 3. Why Us side image
            Content::firstOrCreate(
                ['key' => "services.{$slug}.why.image"],
                [
                    'page' => $pageName,
                    'section' => 'لماذا نحن - صورة جانبية',
                    'type' => 'image',
                    'value' => 'https://images.unsplash.com/photo-1594922119159-4d22edfa5041?q=80&w=2070&auto=format&fit=crop',
                    'extra_value' => '50',
                    'status' => 'published',
                    'created_by' => 1,
                ]
            );
        }
    }
}
