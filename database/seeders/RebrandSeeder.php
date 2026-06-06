<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Content;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class RebrandSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::first() ?? User::factory()->create();

        // 1. Update general settings
        $settings = [
            'site_name' => [
                'value' => 'مظلات التميز | مظلات وسواتر وبرجولات بالرياض',
                'type' => 'text',
                'group' => 'general'
            ],
            'site_logo' => [
                'value' => null,
                'type' => 'image',
                'group' => 'general'
            ],
            'site_description' => [
                'value' => 'شركة مظلات التميز للمظلات والسواتر والبرجولات بالرياض. تركيب مظلات سيارات، مظلات حدائق، سواتر خشبية وحديد، هناجر ومستودعات ساندوتش بنل بأفضل الأسعار وأعلى جودة.',
                'type' => 'textarea',
                'group' => 'seo'
            ],
            'meta_title' => [
                'value' => 'شركة مظلات التميز | مظلات وسواتر وبرجولات بالرياض',
                'type' => 'text',
                'group' => 'seo'
            ],
            'meta_description' => [
                'value' => 'شركة مظلات التميز للمظلات والسواتر والبرجولات بالرياض. تركيب مظلات سيارات، مظلات حدائق، سواتر خشبية وحديد، هناجر ومستودعات ساندوتش بنل بأفضل الأسعار وأعلى جودة.',
                'type' => 'textarea',
                'group' => 'seo'
            ],
            'address' => [
                'value' => 'الرياض، المملكة العربية السعودية',
                'type' => 'text',
                'group' => 'general'
            ],
            'working_hours' => [
                'value' => 'يومياً: 8:00 ص - 10:00 م',
                'type' => 'text',
                'group' => 'general'
            ],
            'contact_phone' => [
                'value' => '966557757441',
                'type' => 'text',
                'group' => 'general'
            ],
            'contact_whatsapp' => [
                'value' => '966557757441',
                'type' => 'text',
                'group' => 'general'
            ]
        ];

        foreach ($settings as $key => $data) {
            Setting::updateOrCreate(
                ['key' => $key],
                $data
            );
        }

        // 2. Clear old contents to avoid mix-up or delete them
        // Let's delete all existing contents that might conflict, or just update the main pages.
        // We will keep some structure and override keys.

        $homeContents = [
            // HERO
            'home.hero.title' => 'شركة مظلات التميز لتركيب المظلات والسواتر والبرجولات',
            'home.hero.subtitle' => 'تركيب مظلات السيارات، مظلات الحدائق، البرجولات، السواتر، الهناجر، وبيوت الشعر ومستودعات الساندوتش بنل بأحدث التصاميم العصرية وبأجود المواد وضمانات طويلة.',
            'home.hero.primary_button_text' => 'طلب تسعيرة فورية',
            'home.hero.secondary_button_text' => 'مشاهدة أعمالنا',
            
            // STATS
            'home.hero.stats.projects.number' => '450',
            'home.hero.stats.projects.label_line1' => 'مشروع مظلات',
            'home.hero.stats.projects.label_line2' => 'وسواتر منفذة',
            'home.hero.stats.experience.number' => '12',
            'home.hero.stats.experience.label_line1' => 'عاماً من',
            'home.hero.stats.experience.label_line2' => 'الريادة والتميز',
            'home.hero.stats.satisfaction.number' => '100',
            'home.hero.stats.satisfaction.label_line1' => 'نسبة رضا',
            'home.hero.stats.satisfaction.label_line2' => 'العملاء التامة',

            // SERVICES INTRO
            'home.services.badge' => 'خدماتنا المتميزة',
            'home.services.title' => 'تفصيل وتركيب كافة أنواع المظلات والسواتر والبرجولات بالرياض',
            
            // WHY US
            'home.why.title' => 'لماذا تختار شركة مظلات التميز؟',
            'home.why.description' => 'نحن شركة رائدة ومعتمدة في المملكة العربية السعودية، نقدم حلول تظليل وتغطية متكاملة للمنازل والمشاريع الحكومية والخاصة بأعلى مقاييس الجودة والسلامة.',
            'home.why.stats.projects.number' => '450',
            'home.why.stats.projects.label' => 'مشروع معتمد',
            'home.why.stats.experience.number' => '12',
            'home.why.stats.experience.label' => 'سنة خبرة',
            'home.why.stats.satisfaction.number' => '100',
            'home.why.stats.satisfaction.label' => 'رضا عملائنا',

            // FEATURES
            'home.why.features.team.title' => 'فريق تركيب محترف',
            'home.why.features.team.text' => 'حدادين وفنيين متخصصين تحت إشراف هندسي لضمان المتانة والدقة.',
            'home.why.features.deadline.title' => 'سرعة ودقة التنفيذ',
            'home.why.features.deadline.text' => 'نلتزم بالمواعيد المحددة لإنهاء وتركيب المشاريع بسرعة فائقة.',
            'home.why.features.quality.title' => 'خامات أصلية معتمدة',
            'home.why.features.quality.text' => 'نستخدم حديد وطني وأقمشة PVC كوري وألماني معالجة ضد الحرائق والتمزق.',
            'home.why.features.warranty.title' => 'ضمان يصل إلى 10 سنوات',
            'home.why.features.warranty.text' => 'نقدم شهادة ضمان موثقة على كافة أعمال المظلات والسواتر والتركيب.',
            'home.why.features.support.title' => 'استشارة ومعاينة مجانية',
            'home.why.features.support.text' => 'فريقنا يصلك لرفع المقاسات وتقديم عينات مجانية لجميع الخامات.',
            'home.why.features.pricing.title' => 'أسعار تنافسية ومناسبة',
            'home.why.features.pricing.text' => 'نقدم أفضل عروض الأسعار والخصومات المستمرة للمساحات الكبيرة والمدارس.',

            // ABOUT
            'home.about.badge' => 'من نحن',
            'home.about.title' => 'مظلات التميز - خيارك الأفضل للتظليل والتغطية والكلادينج',
            'home.about.paragraph_1' => 'شركة مظلات التميز هي مؤسسة رسمية رائدة في مجال توريد وتركيب مظلات السيارات ومظلات الحدائق وسواتر الفلل والجدران والبرجولات والهناجر بالرياض. انطلقنا من شغف تقديم حلول حماية وتظليل عصرية وراقية تناسب تطلعات عملائنا الكرام وتتحمل الظروف المناخية القاسية للشرق الأوسط.',
            'home.about.paragraph_2' => 'نحرص في مظلات التميز على استخدام أجود أنواع الحديد والألمنيوم والتغطيات مثل اللكسان المقاوم للكسر، وأقمشة البولي إيثيلين، والتفلون والـ PVC عالية الكثافة. نلتزم بأعلى معايير السلامة والأمان الإنشائي مع تقديم تصميمات ثلاثية الأبعاد قبل البدء بالتنفيذ لضمان مطابقة توقعاتكم.',
            'home.about.button_text' => 'اعرف المزيد عن خدماتنا',

            // TESTIMONIALS
            'home.testimonials.badge' => 'آراء عملائنا',
            'home.testimonials.title' => 'ماذا قالوا عن خدمات مظلات التميز',
            'home.testimonials.subtitle' => 'فخورون بثقة عملائنا المستمرة في جودة ومتانة مشاريعنا بالرياض.',
            'home.testimonials.item1.text' => 'تعاملت مع شركة مظلات التميز لتركيب مظلة لسيارتي وساتر جداري، شغلهم مرتب جداً وملتزمين بالوقت والحديد المستخدم قوي والخياطة ممتازة. أنصح بالتعامل معهم بشدة.',
            'home.testimonials.item1.name' => 'أبو فهد العتيبي',
            'home.testimonials.item1.position' => 'عميل بالرياض',
            'home.testimonials.item2.text' => 'قمنا بتركيب مظلات لساحات المدرسة بالكامل، والعمل تم تحت إشراف هندسي دقيق واهتمام فائق بالأمان. السعر كان ممتازاً والالتزام بالمواصفات كان 100%. شكراً لكم.',
            'home.testimonials.item2.name' => 'أ. خالد الشمري',
            'home.testimonials.item2.position' => 'مدير مدرسة أهليّة',
            'home.testimonials.item3.text' => 'برجولة الحديقة التي ركبوها لي غيرت شكل البيت تماماً. إضاءة مدمجة وتصميم ألمنيوم فخم جداً ومقاوم للأمطار والحرارة. جودة تستحق كل ريال.',
            'home.testimonials.item3.name' => 'أم محمد',
            'home.testimonials.item3.position' => 'مالكة منزل بالصحافة',

            // CTA
            'home.cta.title' => 'هل تريد حماية منزلك أو سيارتك بمظلات وسواتر فاخرة؟',
            'home.cta.description' => 'احصل على معاينة ورفع مقاسات مجاني في الرياض اليوم. اتصل بنا وسيقوم مهندسونا بزيارتك وتقديم عينات الخامات والتصاميم المتاحة مجاناً.',
            'home.cta.button_text' => 'تواصل معنا واتساب الآن',

            // ABOUT PAGE EXPANDED
            'about.hero.title' => 'من نحن - شركة مظلات التميز بالرياض',
            'about.hero.subtitle' => 'خبرة طويلة وجودة بناء وتشييد تضعنا في مقدمة مؤسسات المظلات والسواتر والهناجر بالمملكة العربية السعودية.',
            'about.hero.button_text' => 'اتصل بنا الآن',
            'about.company.badge' => 'الريادة والتميز',
            'about.company.title' => 'أفضل شركة مظلات وسواتر في الرياض وجدة والمملكة',
            'about.company.paragraph_1' => 'نحن شركة مظلات التميز متصلون بأحدث الابتكارات الهندسية في عالم التظليل، متخصصون في توريد وتركيب كافة أعمال مظلات السيارات ومظلات الساحات والحدائق وسواتر الفلل الفاخرة بالإضافة إلى تشييد الهناجر والمستودعات والكلادينج والقرميد.',
            'about.company.paragraph_2' => 'على مدار أكثر من عقد من الزمان، نفذنا المئات من المشاريع السكنية والتجارية بنجاح مبهر. فريقنا الإداري والفني والحدادين المهرة يسعون دائماً لتقديم أفضل خدمة وأطول ضمان للعميل، لأن رضاكم هو هدفنا الأسمى.',
            'about.vision.title' => 'رؤيتنا',
            'about.vision.text' => 'أن نكون الشركة الرائدة والأولى في تقديم وتطوير حلول التظليل والتغطية الحديثة والمبتكرة في المملكة ودول الخليج العربي.',
            'about.mission.title' => 'رسالتنا',
            'about.mission.text' => 'تقديم خدمات تركيب مظلات وسواتر مطابقة للمواصفات القياسية بأسعار مناسبة ومعايير أمان هندسية صارمة تضمن استدامة أعمالنا لسنوات طويلة.',
            
            // VALUES
            'about.values.quality.title' => 'الجودة المطلقة',
            'about.values.quality.text' => 'نستخدم حديد سابك المعتمد وأقمشة PVC كوري عالي الجودة والوزن المقاوم للشمس.',
            'about.values.commitment.title' => 'الالتزام التام بالوقت',
            'about.values.commitment.text' => 'نحترم أوقات عملائنا ونسلم المشاريع في الأوقات المتفق عليها دون أي تأخير.',
            'about.values.transparency.title' => 'الشفافية والصدق',
            'about.values.transparency.text' => 'نلتزم بالمواصفات الفنية وسماكة الحديد المتفق عليها بالملي دون تلاعب.',
            'about.values.safety.title' => 'الأمان الهندسي',
            'about.values.safety.text' => 'نصمم القواعد ونثبت الهياكل بطرق هندسية تضمن مقاومة الرياح العاتية ومخاطر السقوط.',
            'about.values.innovation.title' => 'التصاميم المبتكرة',
            'about.values.innovation.text' => 'نطور أشكال المظلات والبرجولات والكلادينج لنواكب أحدث التصاميم العالمية الفخمة.',
            'about.values.development.title' => 'التطوير المستمر',
            'about.values.development.text' => 'ندرب عمالتنا ونحدث معداتنا باستمرار لتقديم حلول تظليل تواكب المستقبل.',

            // ABOUT STATS
            'about.stats.projects.number' => '450',
            'about.stats.projects.label' => 'مشروع مظلات منفذ',
            'about.stats.experience.number' => '12',
            'about.stats.experience.label' => 'عاماً من الخبرة',
            'about.stats.engineers.number' => '35',
            'about.stats.engineers.label' => 'فني وحداد متخصص',
            'about.stats.satisfaction.number' => '100',
            'about.stats.satisfaction.label' => 'نسبة رضا العملاء',

            // ABOUT TEAM
            'about.team.member1.name' => 'المهندس رائد أبو فهد',
            'about.team.member1.position' => 'المدير العام والتنفيذي',
            'about.team.member2.name' => 'م. أحمد ناصر',
            'about.team.member2.position' => 'رئيس قسم التصميم والتسعير',
            'about.team.member3.name' => 'سلطان القحطاني',
            'about.team.member3.position' => 'مشرف تركيبات المواقع والمشاريع',
            'about.team.member4.name' => 'م. عبد اللطيف',
            'about.team.member4.position' => 'استشاري الأمان والسلامة الإنشائية',

            // ABOUT CTA
            'about.cta.title' => 'هل تود الحصول على مظلة سيارة أو برجولة حديقة عصرية؟',
            'about.cta.text' => 'تواصل مع خبراء مظلات التميز الآن للحصول على استشارة وتصميم ثلاثي الأبعاد مجاناً.',
            'about.cta.button_text' => 'احصل على معاينة مجانية الآن',
        ];

        foreach ($homeContents as $key => $value) {
            Content::updateOrCreate(
                ['key' => $key],
                [
                    'page' => str_contains($key, 'about') ? 'من نحن' : 'الرئيسية',
                    'section' => 'المحتوى العام للشركة',
                    'type' => strlen($value) < 100 ? 'short_text' : 'long_text',
                    'value' => $value,
                    'status' => 'published',
                    'created_by' => $admin->id
                ]
            );
        }

        // 2.5 Seed Background Images (type: image) for general pages (Home, About, Blog, Contact)
        $backgroundImages = [
            'home.hero.image' => [
                'page' => 'الرئيسية',
                'section' => 'صورة البداية (Hero)',
                'value' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
                'extra_value' => '50',
            ],
            'home.cta.background' => [
                'page' => 'الرئيسية',
                'section' => 'الخاتمة - الخلفية',
                'value' => 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
                'extra_value' => '50',
            ],
            'about.hero.image' => [
                'page' => 'من نحن',
                'section' => 'الهيدر - الصورة',
                'value' => 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop',
                'extra_value' => '50',
            ],
            'about.cta.background' => [
                'page' => 'من نحن',
                'section' => 'دعوة للعمل - الخلفية',
                'value' => 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
                'extra_value' => '50',
            ],
            'blog.hero.background_image' => [
                'page' => 'المدونة',
                'section' => 'الهيدر - الخلفية',
                'value' => 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop',
                'extra_value' => '80',
            ],
            'contact.header.image' => [
                'page' => 'اتصل بنا',
                'section' => 'الخلفية العلوية',
                'value' => 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
                'extra_value' => '50',
            ],
        ];

        foreach ($backgroundImages as $key => $data) {
            Content::firstOrCreate(
                ['key' => $key],
                [
                    'page' => $data['page'],
                    'section' => $data['section'],
                    'type' => 'image',
                    'value' => $data['value'],
                    'extra_value' => $data['extra_value'],
                    'status' => 'published',
                    'created_by' => $admin->id,
                ]
            );
        }

        // 3. Clear database entries matching old deleted services to keep it clean
        // We will seed the 16 new services
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
                    'value' => "تركيب {$service['title']} بالرياض | شركة مظلات التميز",
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
                    'value' => "أفضل خدمات توريد وتركيب {$service['title']} بالرياض من شركة مظلات التميز بضمان يصل لـ 10 سنوات وتصاميم فخمة وأسعار ممتازة.",
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
                    'value' => "نقدم في شركة مظلات التميز خدمة تركيب {$service['title']} بأعلى معايير الدقة والاحترافية وسرعة التنفيذ، باستخدام أجود المواد المقاومة للعوامل الجوية وتحت إشراف كادر هندسي متخصص لضمان سلامة وجودة كافة الأعمال.",
                    'status' => 'published',
                    'created_by' => $admin->id,
                ]
            );

            // Seed 4 features for this service
            $features = [
                ['title' => 'جودة المواد', 'desc' => "نستخدم أفضل خامات الحديد والدهانات والتغطيات لـ {$service['title']} لضمان عمر افتراضي طويل.", 'icon' => 'verified'],
                ['title' => 'كادر فني خبير', 'desc' => "يتم التركيب بواسطة أفضل الحدادين والفنيين المتخصصين في {$service['title']}.", 'icon' => 'engineering'],
                ['title' => 'تصاميم حديثة', 'desc' => "نوفر أحدث التصاميم العصرية لـ {$service['title']} التي تضفي جمالاً على منزلك.", 'icon' => 'architecture'],
                ['title' => 'ضمان حقيقي', 'desc' => "نقدم ضمانات تصل إلى 10 سنوات على كافة أعمال {$service['title']} المنجزة.", 'icon' => 'security'],
            ];

            foreach ($features as $idx => $feat) {
                $num = $idx + 1;
                Content::updateOrCreate(
                    ['key' => "services.{$slug}.why.item{$num}.title"],
                    [
                        'page' => $pageName,
                        'section' => 'لماذا نحن - ميزة ' . $num,
                        'type' => 'short_text',
                        'value' => $feat['title'],
                        'status' => 'published',
                        'created_by' => $admin->id,
                    ]
                );
                Content::updateOrCreate(
                    ['key' => "services.{$slug}.why.item{$num}.desc"],
                    [
                        'page' => $pageName,
                        'section' => 'لماذا نحن - ميزة ' . $num . ' - الوصف',
                        'type' => 'long_text',
                        'value' => $feat['desc'],
                        'status' => 'published',
                        'created_by' => $admin->id,
                    ]
                );
                Content::updateOrCreate(
                    ['key' => "services.{$slug}.why.item{$num}.icon"],
                    [
                        'page' => $pageName,
                        'section' => 'لماذا نحن - ميزة ' . $num . ' - أيقونة',
                        'type' => 'short_text',
                        'value' => $feat['icon'],
                        'status' => 'published',
                        'created_by' => $admin->id,
                    ]
                );
            }
        }

        // Clear content caches
        Cache::forget('home_site_contents');
        Cache::forget('home_projects');
        Cache::forget('gallery_page_home');
        Cache::forget('home_before_after_images');
        Cache::forget('published_page_contents');
        Cache::forget('admin_contents_index');

        echo "Database content rebranded successfully to 'مظلات التميز'!\n";
    }
}
