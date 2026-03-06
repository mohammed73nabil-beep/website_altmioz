<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Content;

class ProjectsPageContentSeeder extends Seeder
{
    public function run(): void
    {
        $contents = [
            // Projects Hero
            ['key' => 'projects.hero.background_image', 'value' => '/images/projects_bg.jpg', 'type' => 'image', 'page' => 'projects', 'section' => 'hero'],
            ['key' => 'projects.hero.badge', 'value' => 'مشاريعنا المميزة', 'type' => 'short_text', 'page' => 'projects', 'section' => 'hero'],
            ['key' => 'projects.hero.title', 'value' => 'شاهد إبداعاتنا في التنفيذ', 'type' => 'long_text', 'page' => 'projects', 'section' => 'hero'],
            ['key' => 'projects.hero.subtitle', 'value' => 'نفتخر برصيدنا من المشاريع الناجحة التي تعكس التزامنا بأعلى معايير الجودة والاحترافية.', 'type' => 'long_text', 'page' => 'projects', 'section' => 'hero'],
            ['key' => 'projects.hero.primary_button_text', 'value' => 'تصفح المشاريع', 'type' => 'short_text', 'page' => 'projects', 'section' => 'hero'],
            ['key' => 'projects.hero.secondary_button_text', 'value' => 'تواصل معنا لمشروعك', 'type' => 'short_text', 'page' => 'projects', 'section' => 'hero'],

            // Projects Filters
            ['key' => 'projects.filters.all', 'value' => 'الكل', 'type' => 'short_text', 'page' => 'projects', 'section' => 'filters'],
            ['key' => 'projects.filters.maintenance', 'value' => 'صيانة مباني', 'type' => 'short_text', 'page' => 'projects', 'section' => 'filters'],
            ['key' => 'projects.filters.caravans', 'value' => 'كرفانات', 'type' => 'short_text', 'page' => 'projects', 'section' => 'filters'],
            ['key' => 'projects.filters.portacabins', 'value' => 'بركسات', 'type' => 'short_text', 'page' => 'projects', 'section' => 'filters'],
            ['key' => 'projects.filters.renovation', 'value' => 'ترميم', 'type' => 'short_text', 'page' => 'projects', 'section' => 'filters'],
            ['key' => 'projects.filters.insulation', 'value' => 'عزل', 'type' => 'short_text', 'page' => 'projects', 'section' => 'filters'],

            // Statistics
            ['key' => 'projects.stats.projects_completed.icon', 'value' => 'domain_verification', 'type' => 'short_text', 'page' => 'projects', 'section' => 'stats'],
            ['key' => 'projects.stats.projects_completed.value', 'value' => '+150', 'type' => 'short_text', 'page' => 'projects', 'section' => 'stats'],
            ['key' => 'projects.stats.projects_completed.title', 'value' => 'مشروع مكتمل', 'type' => 'short_text', 'page' => 'projects', 'section' => 'stats'],
            
            ['key' => 'projects.stats.years_experience.icon', 'value' => 'history', 'type' => 'short_text', 'page' => 'projects', 'section' => 'stats'],
            ['key' => 'projects.stats.years_experience.value', 'value' => '10', 'type' => 'short_text', 'page' => 'projects', 'section' => 'stats'],
            ['key' => 'projects.stats.years_experience.title', 'value' => 'سنوات خبرة', 'type' => 'short_text', 'page' => 'projects', 'section' => 'stats'],
            
            ['key' => 'projects.stats.customer_satisfaction.icon', 'value' => 'thumb_up', 'type' => 'short_text', 'page' => 'projects', 'section' => 'stats'],
            ['key' => 'projects.stats.customer_satisfaction.value', 'value' => '%98', 'type' => 'short_text', 'page' => 'projects', 'section' => 'stats'],
            ['key' => 'projects.stats.customer_satisfaction.title', 'value' => 'رضا العملاء', 'type' => 'short_text', 'page' => 'projects', 'section' => 'stats'],
            
            ['key' => 'projects.stats.engineers.icon', 'value' => 'engineering', 'type' => 'short_text', 'page' => 'projects', 'section' => 'stats'],
            ['key' => 'projects.stats.engineers.value', 'value' => '50', 'type' => 'short_text', 'page' => 'projects', 'section' => 'stats'],
            ['key' => 'projects.stats.engineers.title', 'value' => 'خبير فني مهندس', 'type' => 'short_text', 'page' => 'projects', 'section' => 'stats'],

            // Testimonials
            ['key' => 'projects.testimonials.badge', 'value' => 'شركاء النجاح', 'type' => 'short_text', 'page' => 'projects', 'section' => 'testimonials'],
            ['key' => 'projects.testimonials.title', 'value' => 'آراء عملائنا', 'type' => 'short_text', 'page' => 'projects', 'section' => 'testimonials'],
            
            ['key' => 'projects.testimonials.item1.name', 'value' => 'مؤسسة إعمار', 'type' => 'short_text', 'page' => 'projects', 'section' => 'testimonials'],
            ['key' => 'projects.testimonials.item1.position', 'value' => 'مدير المشتريات', 'type' => 'short_text', 'page' => 'projects', 'section' => 'testimonials'],
            ['key' => 'projects.testimonials.item1.text', 'value' => 'سرعة في الإنجاز ودقة متناهية في تسليم مجمعات الساندوتش بانل الخاصة بالمشروع.', 'type' => 'long_text', 'page' => 'projects', 'section' => 'testimonials'],
            
            ['key' => 'projects.testimonials.item2.name', 'value' => 'شركة الخليج', 'type' => 'short_text', 'page' => 'projects', 'section' => 'testimonials'],
            ['key' => 'projects.testimonials.item2.position', 'value' => 'المدير التنفيذي', 'type' => 'short_text', 'page' => 'projects', 'section' => 'testimonials'],
            ['key' => 'projects.testimonials.item2.text', 'value' => 'أشرفوا على ترميم وحداتنا المتنقلة بأعلى مقاييس الجودة، ننصح بالتعامل معهم لحلولهم المبتكرة.', 'type' => 'long_text', 'page' => 'projects', 'section' => 'testimonials'],
            
            ['key' => 'projects.testimonials.item3.name', 'value' => 'سالم العتيبي', 'type' => 'short_text', 'page' => 'projects', 'section' => 'testimonials'],
            ['key' => 'projects.testimonials.item3.position', 'value' => 'مستثمر', 'type' => 'short_text', 'page' => 'projects', 'section' => 'testimonials'],
            ['key' => 'projects.testimonials.item3.text', 'value' => 'كرفانات الرحلات تم تصميمها وتجهيزها داخلياً بفخامة لم أكن أتوقعها من شركة محلية. احترافية عالية.', 'type' => 'long_text', 'page' => 'projects', 'section' => 'testimonials'],

            // CTA
            ['key' => 'projects.cta.background_image', 'value' => '/images/projects_cta_bg.jpg', 'type' => 'image', 'page' => 'projects', 'section' => 'cta'],
            ['key' => 'projects.cta.icon', 'value' => 'handshake', 'type' => 'text', 'page' => 'projects', 'section' => 'cta'],
            ['key' => 'projects.cta.title', 'value' => 'هل لديك مشروع قادم؟\nدعنا نبدأ اليوم.', 'type' => 'textarea', 'page' => 'projects', 'section' => 'cta'],
            ['key' => 'projects.cta.description', 'value' => 'تواصل معنا الآن للحصول على استشارة هندسية مجانية وعرض سعر مبدئي لتنفيذ متطلباتك بأعلى معايير الجودة.', 'type' => 'textarea', 'page' => 'projects', 'section' => 'cta'],
            ['key' => 'projects.cta.button_text', 'value' => 'تواصل معنا الآن', 'type' => 'text', 'page' => 'projects', 'section' => 'cta'],
        ];

        foreach ($contents as $data) {
            Content::updateOrCreate(
                ['key' => $data['key']],
                $data
            );
        }
    }
}
