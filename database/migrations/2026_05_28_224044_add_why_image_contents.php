<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $rows = [
            // ─── ديكورات داخلية (Landscaping) ───────────────────────────────
            [
                'page' => 'ديكورات داخلية', 'section' => 'لماذا نحن - الصورة',
                'key'  => 'services.landscaping.why.image', 'type' => 'image',
                'value' => null, 'status' => 'published',
            ],
            [
                'page' => 'ديكورات داخلية', 'section' => 'لماذا نحن - الشارة',
                'key'  => 'services.landscaping.why.badge', 'type' => 'short_text',
                'value' => 'لماذا ديكورسار؟', 'status' => 'published',
            ],
            [
                'page' => 'ديكورات داخلية', 'section' => 'لماذا نحن - العنوان',
                'key'  => 'services.landscaping.why.title', 'type' => 'short_text',
                'value' => 'نضمن لك الجمال والاحترافية في التنفيذ', 'status' => 'published',
            ],
            [
                'page' => 'ديكورات داخلية', 'section' => 'لماذا نحن - الوصف',
                'key'  => 'services.landscaping.why.desc', 'type' => 'long_text',
                'value' => 'نحن نمزج بين الفن والهندسة لنخلق مساحات تريح النفس وتسعد العين، باستخدام أجود المواد وأحدث تقنيات الديكور.', 'status' => 'published',
            ],
            // عناصر المزايا
            [
                'page' => 'ديكورات داخلية', 'section' => 'لماذا نحن - ميزة 1 - العنوان',
                'key'  => 'services.landscaping.why.item1.title', 'type' => 'short_text',
                'value' => 'إبداع في التصميم', 'status' => 'published',
            ],
            [
                'page' => 'ديكورات داخلية', 'section' => 'لماذا نحن - ميزة 1 - الوصف',
                'key'  => 'services.landscaping.why.item1.desc', 'type' => 'long_text',
                'value' => 'نبتكر أفكاراً فريدة تجعل مساحتك لوحة فنية مميزة تعكس ذوقك الرفيع.', 'status' => 'published',
            ],
            [
                'page' => 'ديكورات داخلية', 'section' => 'لماذا نحن - ميزة 2 - العنوان',
                'key'  => 'services.landscaping.why.item2.title', 'type' => 'short_text',
                'value' => 'مهندسون متخصصون', 'status' => 'published',
            ],
            [
                'page' => 'ديكورات داخلية', 'section' => 'لماذا نحن - ميزة 2 - الوصف',
                'key'  => 'services.landscaping.why.item2.desc', 'type' => 'long_text',
                'value' => 'فريق متخصص من المهندسين ذوي الخبرة الطويلة في الديكورات الداخلية.', 'status' => 'published',
            ],
            [
                'page' => 'ديكورات داخلية', 'section' => 'لماذا نحن - ميزة 3 - العنوان',
                'key'  => 'services.landscaping.why.item3.title', 'type' => 'short_text',
                'value' => 'جودة المواد', 'status' => 'published',
            ],
            [
                'page' => 'ديكورات داخلية', 'section' => 'لماذا نحن - ميزة 3 - الوصف',
                'key'  => 'services.landscaping.why.item3.desc', 'type' => 'long_text',
                'value' => 'نستخدم أفضل المواد المنتقاة بعناية لضمان استدامتها وجودتها العالية.', 'status' => 'published',
            ],
            [
                'page' => 'ديكورات داخلية', 'section' => 'لماذا نحن - ميزة 4 - العنوان',
                'key'  => 'services.landscaping.why.item4.title', 'type' => 'short_text',
                'value' => 'التزام تام', 'status' => 'published',
            ],
            [
                'page' => 'ديكورات داخلية', 'section' => 'لماذا نحن - ميزة 4 - الوصف',
                'key'  => 'services.landscaping.why.item4.desc', 'type' => 'long_text',
                'value' => 'نحترم مواعيدنا ونلتزم بتقديم أعلى مستويات الجودة في التنفيذ والتسليم.', 'status' => 'published',
            ],

            // ─── بديل الرخام والخشب (Artificial Grass) ──────────────────────
            [
                'page' => 'بديل الرخام والخشب', 'section' => 'لماذا نحن - الصورة',
                'key'  => 'services.artificial_grass.why.image', 'type' => 'image',
                'value' => null, 'status' => 'published',
            ],
            [
                'page' => 'بديل الرخام والخشب', 'section' => 'لماذا نحن - الشارة',
                'key'  => 'services.artificial_grass.why.badge', 'type' => 'short_text',
                'value' => 'لماذا نحن؟', 'status' => 'published',
            ],
            [
                'page' => 'بديل الرخام والخشب', 'section' => 'لماذا نحن - العنوان',
                'key'  => 'services.artificial_grass.why.title', 'type' => 'short_text',
                'value' => 'نضمن لك الجودة والسرعة في التنفيذ', 'status' => 'published',
            ],
            [
                'page' => 'بديل الرخام والخشب', 'section' => 'لماذا نحن - الوصف',
                'key'  => 'services.artificial_grass.why.desc', 'type' => 'long_text',
                'value' => 'نستخدم أحدث التقنيات وأفضل أنواع المواد المعتمدة عالمياً لنمنحك نتيجة مثالية بضمان حقيقي.', 'status' => 'published',
            ],
            [
                'page' => 'بديل الرخام والخشب', 'section' => 'لماذا نحن - ميزة 1 - العنوان',
                'key'  => 'services.artificial_grass.why.item1.title', 'type' => 'short_text',
                'value' => 'جودة عالمية', 'status' => 'published',
            ],
            [
                'page' => 'بديل الرخام والخشب', 'section' => 'لماذا نحن - ميزة 1 - الوصف',
                'key'  => 'services.artificial_grass.why.item1.desc', 'type' => 'long_text',
                'value' => 'نستخدم أجود المواد العالمية التي تتحمل درجات الحرارة العالية والأشعة فوق البنفسجية.', 'status' => 'published',
            ],
            [
                'page' => 'بديل الرخام والخشب', 'section' => 'لماذا نحن - ميزة 2 - العنوان',
                'key'  => 'services.artificial_grass.why.item2.title', 'type' => 'short_text',
                'value' => 'ضمان طويل', 'status' => 'published',
            ],
            [
                'page' => 'بديل الرخام والخشب', 'section' => 'لماذا نحن - ميزة 2 - الوصف',
                'key'  => 'services.artificial_grass.why.item2.desc', 'type' => 'long_text',
                'value' => 'نقدم ضمانات تصل إلى 7 سنوات على المواد ضد تغير اللون أو التلف.', 'status' => 'published',
            ],
            [
                'page' => 'بديل الرخام والخشب', 'section' => 'لماذا نحن - ميزة 3 - العنوان',
                'key'  => 'services.artificial_grass.why.item3.title', 'type' => 'short_text',
                'value' => 'توفير الوقت والتكلفة', 'status' => 'published',
            ],
            [
                'page' => 'بديل الرخام والخشب', 'section' => 'لماذا نحن - ميزة 3 - الوصف',
                'key'  => 'services.artificial_grass.why.item3.desc', 'type' => 'long_text',
                'value' => 'يوفر المواد البديلة الوقت والجهد المستغرق في العناية والصيانة الدورية.', 'status' => 'published',
            ],
            [
                'page' => 'بديل الرخام والخشب', 'section' => 'لماذا نحن - ميزة 4 - العنوان',
                'key'  => 'services.artificial_grass.why.item4.title', 'type' => 'short_text',
                'value' => 'مظهر طبيعي وأنيق', 'status' => 'published',
            ],
            [
                'page' => 'بديل الرخام والخشب', 'section' => 'لماذا نحن - ميزة 4 - الوصف',
                'key'  => 'services.artificial_grass.why.item4.desc', 'type' => 'long_text',
                'value' => 'يتميز بمظهره الطبيعي وملمسه الراقي الذي يضفي جمالاً استثنائياً على المكان.', 'status' => 'published',
            ],

            // ─── تصميم ديكورات (Design) ──────────────────────────────────────
            [
                'page' => 'تصميم ديكورات', 'section' => 'لماذا نحن - الصورة',
                'key'  => 'services.design.why.image', 'type' => 'image',
                'value' => null, 'status' => 'published',
            ],
            [
                'page' => 'تصميم ديكورات', 'section' => 'لماذا نحن - الشارة',
                'key'  => 'services.design.why.badge', 'type' => 'short_text',
                'value' => 'لماذا نحن؟', 'status' => 'published',
            ],
            [
                'page' => 'تصميم ديكورات', 'section' => 'لماذا نحن - العنوان',
                'key'  => 'services.design.why.title', 'type' => 'short_text',
                'value' => 'نضمن لك الجودة والسرعة في التنفيذ', 'status' => 'published',
            ],
            [
                'page' => 'تصميم ديكورات', 'section' => 'لماذا نحن - الوصف',
                'key'  => 'services.design.why.desc', 'type' => 'long_text',
                'value' => 'فريقنا المتميز يضع معايير الجودة نُصب عينيه، لضمان استلامك مشروعك بأفضل التقنيات الحديثة وأجود المواد الخام.', 'status' => 'published',
            ],
            [
                'page' => 'تصميم ديكورات', 'section' => 'لماذا نحن - ميزة 1 - العنوان',
                'key'  => 'services.design.why.item1.title', 'type' => 'short_text',
                'value' => 'تنفيذ في الوقت المحدد', 'status' => 'published',
            ],
            [
                'page' => 'تصميم ديكورات', 'section' => 'لماذا نحن - ميزة 1 - الوصف',
                'key'  => 'services.design.why.item1.desc', 'type' => 'long_text',
                'value' => 'نلتزم بالخطة الزمنية لتنفيذ المشروع بأسرع وقت وأعلى جودة ممكنة.', 'status' => 'published',
            ],
            [
                'page' => 'تصميم ديكورات', 'section' => 'لماذا نحن - ميزة 2 - العنوان',
                'key'  => 'services.design.why.item2.title', 'type' => 'short_text',
                'value' => 'كوادر هندسية متخصصة', 'status' => 'published',
            ],
            [
                'page' => 'تصميم ديكورات', 'section' => 'لماذا نحن - ميزة 2 - الوصف',
                'key'  => 'services.design.why.item2.desc', 'type' => 'long_text',
                'value' => 'فريق من المهندسين ذوي الكفاءة العالية في أعمال الديكورات الداخلية والخارجية.', 'status' => 'published',
            ],
            [
                'page' => 'تصميم ديكورات', 'section' => 'لماذا نحن - ميزة 3 - العنوان',
                'key'  => 'services.design.why.item3.title', 'type' => 'short_text',
                'value' => 'أسعار مدروسة', 'status' => 'published',
            ],
            [
                'page' => 'تصميم ديكورات', 'section' => 'لماذا نحن - ميزة 3 - الوصف',
                'key'  => 'services.design.why.item3.desc', 'type' => 'long_text',
                'value' => 'نقدم أسعاراً تنافسية تتناسب مع جميع الميزانيات دون التنازل عن الجودة.', 'status' => 'published',
            ],
            [
                'page' => 'تصميم ديكورات', 'section' => 'لماذا نحن - ميزة 4 - العنوان',
                'key'  => 'services.design.why.item4.title', 'type' => 'short_text',
                'value' => 'ضمان وصيانة', 'status' => 'published',
            ],
            [
                'page' => 'تصميم ديكورات', 'section' => 'لماذا نحن - ميزة 4 - الوصف',
                'key'  => 'services.design.why.item4.desc', 'type' => 'long_text',
                'value' => 'نقدم ضمانات حقيقية على كافة الأعمال مع إمكانية التعاقد للصيانة الدورية.', 'status' => 'published',
            ],
        ];

        $now = now();
        foreach ($rows as $row) {
            // Skip if key already exists
            $exists = DB::table('contents')->where('key', $row['key'])->exists();
            if (!$exists) {
                DB::table('contents')->insert(array_merge($row, [
                    'extra_value' => null,
                    'created_by'  => 1,
                    'created_at'  => $now,
                    'updated_at'  => $now,
                ]));
            }
        }

        // Clear content caches
        \Illuminate\Support\Facades\Cache::forget('published_page_contents');
        \Illuminate\Support\Facades\Cache::forget('admin_contents_index');
    }

    public function down(): void
    {
        $keys = [
            'services.landscaping.why.image', 'services.landscaping.why.badge',
            'services.landscaping.why.title', 'services.landscaping.why.desc',
            'services.landscaping.why.item1.title', 'services.landscaping.why.item1.desc',
            'services.landscaping.why.item2.title', 'services.landscaping.why.item2.desc',
            'services.landscaping.why.item3.title', 'services.landscaping.why.item3.desc',
            'services.landscaping.why.item4.title', 'services.landscaping.why.item4.desc',

            'services.artificial_grass.why.image', 'services.artificial_grass.why.badge',
            'services.artificial_grass.why.title', 'services.artificial_grass.why.desc',
            'services.artificial_grass.why.item1.title', 'services.artificial_grass.why.item1.desc',
            'services.artificial_grass.why.item2.title', 'services.artificial_grass.why.item2.desc',
            'services.artificial_grass.why.item3.title', 'services.artificial_grass.why.item3.desc',
            'services.artificial_grass.why.item4.title', 'services.artificial_grass.why.item4.desc',

            'services.design.why.image', 'services.design.why.badge',
            'services.design.why.title', 'services.design.why.desc',
            'services.design.why.item1.title', 'services.design.why.item1.desc',
            'services.design.why.item2.title', 'services.design.why.item2.desc',
            'services.design.why.item3.title', 'services.design.why.item3.desc',
            'services.design.why.item4.title', 'services.design.why.item4.desc',
        ];

        DB::table('contents')->whereIn('key', $keys)->delete();
    }
};
