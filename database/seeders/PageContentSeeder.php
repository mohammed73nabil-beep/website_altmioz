<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PageContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contents = [
            // --- Home Page ---
            // HERO SECTION
            [
                'page' => 'الرئيسية', 'section' => 'عنوان البداية (Hero)', 'key' => 'home.hero.title',
                'type' => 'short_text', 'value' => 'حلول صيانة وتنفيذ بمعايير هندسية عالية', 'status' => 'published'
            ],
            [
                'page' => 'الرئيسية', 'section' => 'وصف البداية (Hero)', 'key' => 'home.hero.subtitle',
                'type' => 'long_text', 'value' => 'متخصصون في صيانة المباني، تركيب الكرفانات، وتنفيذ البركسات بأعلى مستويات الجودة والالتزام في المملكة والخليج.', 'status' => 'published'
            ],
            [
                'page' => 'الرئيسية', 'section' => 'النص للزر الأساسي (Hero)', 'key' => 'home.hero.primary_button_text',
                'type' => 'short_text', 'value' => 'اطلب عرض سعر', 'status' => 'published'
            ],

            [
                'page' => 'الرئيسية', 'section' => 'النص للزر الثانوي (Hero)', 'key' => 'home.hero.secondary_button_text',
                'type' => 'short_text', 'value' => 'تصفح مشاريعنا', 'status' => 'published'
            ],

            [
                'page' => 'الرئيسية', 'section' => 'صورة البداية (Hero)', 'key' => 'home.hero.image',
                'type' => 'image', 'value' => '/images/hero-bg-2.jpg', 'status' => 'published'
            ],

            // HERO STATISTICS
            [ 'page' => 'الرئيسية', 'section' => 'إحصائيات الهيرو - المشاريع - الرقم', 'key' => 'home.hero.stats.projects.number', 'type' => 'short_text', 'value' => '150', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'إحصائيات الهيرو - المشاريع - السطر 1', 'key' => 'home.hero.stats.projects.label_line1', 'type' => 'short_text', 'value' => 'مشروع', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'إحصائيات الهيرو - المشاريع - السطر 2', 'key' => 'home.hero.stats.projects.label_line2', 'type' => 'short_text', 'value' => 'مكتمل', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'إحصائيات الهيرو - الخبرة - الرقم', 'key' => 'home.hero.stats.experience.number', 'type' => 'short_text', 'value' => '10', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'إحصائيات الهيرو - الخبرة - السطر 1', 'key' => 'home.hero.stats.experience.label_line1', 'type' => 'short_text', 'value' => 'سنوات', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'إحصائيات الهيرو - الخبرة - السطر 2', 'key' => 'home.hero.stats.experience.label_line2', 'type' => 'short_text', 'value' => 'خبرة', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'إحصائيات الهيرو - الرضا - الرقم', 'key' => 'home.hero.stats.satisfaction.number', 'type' => 'short_text', 'value' => '98', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'إحصائيات الهيرو - الرضا - السطر 1', 'key' => 'home.hero.stats.satisfaction.label_line1', 'type' => 'short_text', 'value' => 'رضا', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'إحصائيات الهيرو - الرضا - السطر 2', 'key' => 'home.hero.stats.satisfaction.label_line2', 'type' => 'short_text', 'value' => 'العملاء', 'status' => 'published' ],

            // SERVICES SECTION
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - الشارة', 'key' => 'home.services.badge', 'type' => 'short_text', 'value' => 'مجالات التخصص', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - العنوان', 'key' => 'home.services.title', 'type' => 'short_text', 'value' => 'خدمات متكاملة وحلول مبكرة', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - العنوان الفرعي', 'key' => 'home.services.subtitle', 'type' => 'long_text', 'value' => '', 'status' => 'published' ],
            
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - صيانة - العنوان', 'key' => 'home.services.maintenance.title', 'type' => 'short_text', 'value' => 'صيانة المباني', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - صيانة - الوصف', 'key' => 'home.services.maintenance.description', 'type' => 'long_text', 'value' => 'حلول متكاملة لصيانة وترميم المباني والمرافق بأحدث المعدات لضمان استدامتها وديمومتها.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - صيانة - الزر', 'key' => 'home.services.maintenance.button_text', 'type' => 'short_text', 'value' => 'المزيد من التفاصيل', 'status' => 'published' ],
            
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - كرفانات - العنوان', 'key' => 'home.services.caravans.title', 'type' => 'short_text', 'value' => 'تركيب الكرفانات', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - كرفانات - الوصف', 'key' => 'home.services.caravans.description', 'type' => 'long_text', 'value' => 'تصنيع وتجهيز الكرفانات الفاخرة لتناسب كافة الاحتياجات الميدانية والإدارية بمواصفات عالية.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - كرفانات - الزر', 'key' => 'home.services.caravans.button_text', 'type' => 'short_text', 'value' => 'المزيد من التفاصيل', 'status' => 'published' ],
            
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - بركسات - العنوان', 'key' => 'home.services.portacabins.title', 'type' => 'short_text', 'value' => 'تنفيذ البركسات', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - بركسات - الوصف', 'key' => 'home.services.portacabins.description', 'type' => 'long_text', 'value' => 'بركسات مسبقة الصنع بتصاميم هندسية دقيقة للمشاريع والمعسكرات بسرعة تنفيذ فائقة.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - بركسات - الزر', 'key' => 'home.services.portacabins.button_text', 'type' => 'short_text', 'value' => 'المزيد من التفاصيل', 'status' => 'published' ],
            
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - ترميم - العنوان', 'key' => 'home.services.renovation.title', 'type' => 'short_text', 'value' => 'أعمال الترميم', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - ترميم - الوصف', 'key' => 'home.services.renovation.description', 'type' => 'long_text', 'value' => 'إعادة إحياء وتجديد العقارات السكنية والتجارية لتبدو كأنها جديدة تماماً مع الحفاظ على هويتها.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - ترميم - الزر', 'key' => 'home.services.renovation.button_text', 'type' => 'short_text', 'value' => 'المزيد من التفاصيل', 'status' => 'published' ],
            
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - عزل - العنوان', 'key' => 'home.services.insulation.title', 'type' => 'short_text', 'value' => 'العزل الحراري والمائي', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - عزل - الوصف', 'key' => 'home.services.insulation.description', 'type' => 'long_text', 'value' => 'حماية المنشآت من التسربات والتأثيرات المناخية القاسية باستخدام أفضل المواد العازلة عالمياً.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - عزل - الزر', 'key' => 'home.services.insulation.button_text', 'type' => 'short_text', 'value' => 'المزيد من التفاصيل', 'status' => 'published' ],
            
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - كهرباء - العنوان', 'key' => 'home.services.electrical.title', 'type' => 'short_text', 'value' => 'الكهرباء والسباكة', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - كهرباء - الوصف', 'key' => 'home.services.electrical.description', 'type' => 'long_text', 'value' => 'صيانة وتأسيس شبكات الكهرباء والسباكة بمعايير فنية وأمنية عالية لضمان السلامة التامة.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - كهرباء - الزر', 'key' => 'home.services.electrical.button_text', 'type' => 'short_text', 'value' => 'المزيد من التفاصيل', 'status' => 'published' ],
            
            [ 'page' => 'الرئيسية', 'section' => 'الخدمات - عرض الكل - الزر', 'key' => 'home.services.view_all_text', 'type' => 'short_text', 'value' => 'عرض كافة الخدمات المتوفرة', 'status' => 'published' ],


            // WHY CHOOSE US SECTION
            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - العنوان', 'key' => 'home.why.title', 'type' => 'short_text', 'value' => 'لماذا نحن خيارك الأول للمشاريع الكبرى؟', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - الوصف', 'key' => 'home.why.description', 'type' => 'long_text', 'value' => 'نعتمد في عملنا على أحدث التقنيات وأفضل الكفاءات الهندسية لضمان تنفيذ المشاريع بأعلى معايير الجودة، مع التزام تام بالجداول الزمنية المحددة.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - إحصائيات المشاريع - الرقم', 'key' => 'home.why.stats.projects.number', 'type' => 'short_text', 'value' => '150', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - إحصائيات المشاريع - النص', 'key' => 'home.why.stats.projects.label', 'type' => 'short_text', 'value' => 'مشروع موثق', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - إحصائيات الخبرة - الرقم', 'key' => 'home.why.stats.experience.number', 'type' => 'short_text', 'value' => '10', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - إحصائيات الخبرة - النص', 'key' => 'home.why.stats.experience.label', 'type' => 'short_text', 'value' => 'سنوات الخبرة', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - إحصائيات الرضا - الرقم', 'key' => 'home.why.stats.satisfaction.number', 'type' => 'short_text', 'value' => '98', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - إحصائيات الرضا - النص', 'key' => 'home.why.stats.satisfaction.label', 'type' => 'short_text', 'value' => 'رضا العملاء', 'status' => 'published' ],

            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - الميزات - الفريق - العنوان', 'key' => 'home.why.features.team.title', 'type' => 'short_text', 'value' => 'فريق هندسي محترف', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - الميزات - الفريق - النص', 'key' => 'home.why.features.team.text', 'type' => 'long_text', 'value' => 'كوادر متخصصة ذات كفاءة عالية.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - الميزات - الوقت - العنوان', 'key' => 'home.why.features.deadline.title', 'type' => 'short_text', 'value' => 'التزام بالمواعيد', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - الميزات - الوقت - النص', 'key' => 'home.why.features.deadline.text', 'type' => 'long_text', 'value' => 'تسليم المشاريع في الوقت المحدد بدقة.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - الميزات - الجودة - العنوان', 'key' => 'home.why.features.quality.title', 'type' => 'short_text', 'value' => 'مواد عالية الجودة', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - الميزات - الجودة - النص', 'key' => 'home.why.features.quality.text', 'type' => 'long_text', 'value' => 'نستخدم أفضل الخامات والمواد المعتمدة.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - الميزات - الضمان - العنوان', 'key' => 'home.why.features.warranty.title', 'type' => 'short_text', 'value' => 'ضمان على الأعمال', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - الميزات - الضمان - النص', 'key' => 'home.why.features.warranty.text', 'type' => 'long_text', 'value' => 'نقدم ضمانات حقيقية على كافة مشاريعنا.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - الميزات - الدعم - العنوان', 'key' => 'home.why.features.support.title', 'type' => 'short_text', 'value' => 'خدمة سريعة 24/7', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - الميزات - الدعم - النص', 'key' => 'home.why.features.support.text', 'type' => 'long_text', 'value' => 'دعم فني واستجابة سريعة لحالات الطوارئ.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - الميزات - السعر - العنوان', 'key' => 'home.why.features.pricing.title', 'type' => 'short_text', 'value' => 'أسعار تنافسية', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'لماذا نحن - الميزات - السعر - النص', 'key' => 'home.why.features.pricing.text', 'type' => 'long_text', 'value' => 'أفضل قيمة مقابل جودة العمل الاستثنائية.', 'status' => 'published' ],

            // PROJECTS SECTION
            [ 'page' => 'الرئيسية', 'section' => 'مشاريعنا - الشارة', 'key' => 'home.projects.badge', 'type' => 'short_text', 'value' => 'سجل أعمالنا الحافل', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'مشاريعنا - العنوان', 'key' => 'home.projects.title', 'type' => 'short_text', 'value' => 'مشاريع مميزة قمنا بتنفيذها', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'مشاريعنا - نص الزر', 'key' => 'home.projects.view_all_text', 'type' => 'short_text', 'value' => 'عرض جميع المشاريع', 'status' => 'published' ],


            // ABOUT PREVIEW SECTION
            [ 'page' => 'الرئيسية', 'section' => 'نبذة الشركة - الشارة', 'key' => 'home.about.badge', 'type' => 'short_text', 'value' => 'من نحن', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'نبذة الشركة - العنوان', 'key' => 'home.about.title', 'type' => 'short_text', 'value' => 'شريكك الموثوق في رحلة النجاح العمراني.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'نبذة الشركة - فقرة 1', 'key' => 'home.about.paragraph_1', 'type' => 'long_text', 'value' => 'منذ انطلاقتنا، وضعنا نصب أعيننا معياراً واحداً: الدقة التي لا تساوم على الجودة. نحن نجمع بين العقول الهندسية الفذة والأيدي الماهرة لنقدم لعملائنا في جميع أنحاء المملكة مشاريع تتحدث عن نفسها.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'نبذة الشركة - فقرة 2', 'key' => 'home.about.paragraph_2', 'type' => 'long_text', 'value' => 'سواء كان مشروعك صيانة وتجديداً أو تأسيساً لكرفانات وبركسات بأحجام ضخمة، فنحن نضمن لك رحلة عمل سلسة، احترافية، ونتائج تتخطى التوقعات وتدوم لأجيال.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'نبذة الشركة - نص الزر', 'key' => 'home.about.button_text', 'type' => 'short_text', 'value' => 'تعرّف علينا أكثر', 'status' => 'published' ],

            [ 'page' => 'الرئيسية', 'section' => 'نبذة الشركة - تسمية الهاتف', 'key' => 'home.about.phone_label', 'type' => 'short_text', 'value' => 'اتصل للحصول على مساعدة', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'نبذة الشركة - رقم الهاتف', 'key' => 'home.about.phone_number', 'type' => 'short_text', 'value' => '+966 50 123 4567', 'status' => 'published' ],

            // TESTIMONIALS SECTION
            [ 'page' => 'الرئيسية', 'section' => 'آراء العملاء - الشارة', 'key' => 'home.testimonials.badge', 'type' => 'short_text', 'value' => 'آراء العملاء', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'آراء العملاء - العنوان', 'key' => 'home.testimonials.title', 'type' => 'short_text', 'value' => 'ماذا يقول شركاؤنا عنّا', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'آراء العملاء - العنوان الفرعي', 'key' => 'home.testimonials.subtitle', 'type' => 'long_text', 'value' => 'فخورون بكل كلمة طيبة وثقة منحها لنا شركاؤنا بعد إتمام مشاريعهم بنجاح واحترافية.', 'status' => 'published' ],

            [ 'page' => 'الرئيسية', 'section' => 'آراء العملاء - رأي 1 - النص', 'key' => 'home.testimonials.item1.text', 'type' => 'long_text', 'value' => 'كان التزام الفريق بالجدول الزمني مثيراً للإعجاب حقاً. نوعية الكرفانات الموردة وتفاصيل العزل الفاخر فاقت كل توقعاتنا المسبقة.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'آراء العملاء - رأي 1 - الاسم', 'key' => 'home.testimonials.item1.name', 'type' => 'short_text', 'value' => 'شركة المقاولون العرب', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'آراء العملاء - رأي 1 - الشركة', 'key' => 'home.testimonials.item1.company', 'type' => 'short_text', 'value' => '', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'آراء العملاء - رأي 1 - المنصب', 'key' => 'home.testimonials.item1.position', 'type' => 'short_text', 'value' => 'مدير المشروع', 'status' => 'published' ],

            [ 'page' => 'الرئيسية', 'section' => 'آراء العملاء - رأي 2 - النص', 'key' => 'home.testimonials.item2.text', 'type' => 'long_text', 'value' => 'سرعة استجابة هائلة لأي متطلبات طارئة. دقة في ترميم الواجهات ونتائج مبهرة في أعمال السباكة والكهرباء بالمجمع السكني.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'آراء العملاء - رأي 2 - الاسم', 'key' => 'home.testimonials.item2.name', 'type' => 'short_text', 'value' => 'وزارة الإسكان', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'آراء العملاء - رأي 2 - الشركة', 'key' => 'home.testimonials.item2.company', 'type' => 'short_text', 'value' => '', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'آراء العملاء - رأي 2 - المنصب', 'key' => 'home.testimonials.item2.position', 'type' => 'short_text', 'value' => 'مهندس مشرف', 'status' => 'published' ],

            [ 'page' => 'الرئيسية', 'section' => 'آراء العملاء - رأي 3 - النص', 'key' => 'home.testimonials.item3.text', 'type' => 'long_text', 'value' => 'تم تنفيذ بركس إداري متكامل لمشروعي الاستثماري بتصميم ذكي ومريح للعين. الجودة تظهر في أدق التفاصيل من الداخل والخارج.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'آراء العملاء - رأي 3 - الاسم', 'key' => 'home.testimonials.item3.name', 'type' => 'short_text', 'value' => 'أحمد بن طلال', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'آراء العملاء - رأي 3 - الشركة', 'key' => 'home.testimonials.item3.company', 'type' => 'short_text', 'value' => '', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'آراء العملاء - رأي 3 - المنصب', 'key' => 'home.testimonials.item3.position', 'type' => 'short_text', 'value' => 'مستثمر عقاري', 'status' => 'published' ],

            // FINAL CTA SECTION
            [ 'page' => 'الرئيسية', 'section' => 'الخاتمة - العنوان', 'key' => 'home.cta.title', 'type' => 'long_text', 'value' => 'هل لديك مشروع قادم؟ دعنا نحوله إلى واقع احترافي.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'الخاتمة - الوصف', 'key' => 'home.cta.description', 'type' => 'long_text', 'value' => 'نمتلك الجاهزية التامة للبدء في مشروعك مهما كان حجمه. تواصل معنا اليوم لتحصل على استشارة مبدئية وخطة عمل متكاملة.', 'status' => 'published' ],
            [ 'page' => 'الرئيسية', 'section' => 'الخاتمة - نص الزر', 'key' => 'home.cta.button_text', 'type' => 'short_text', 'value' => 'تواصل معنا الآن', 'status' => 'published' ],

            [ 'page' => 'الرئيسية', 'section' => 'الخاتمة - الخلفية', 'key' => 'home.cta.background', 'type' => 'image', 'value' => 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop', 'status' => 'published' ],


            // --- About Page (Expanded) ---
            // HERO SECTION
            [
                'page' => 'من نحن',
                'section' => 'الهيدر - العنوان',
                'key' => 'about.hero.title',
                'type' => 'short_text',
                'value' => 'من نحن - فخامة الإنجاز',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الهيدر - الوصف',
                'key' => 'about.hero.subtitle',
                'type' => 'long_text',
                'value' => 'خبرة هندسية وجودة تنفيذ تضعنا في مقدمة مؤسسات الصيانة والبناء في المملكة العربية السعودية ودول الخليج.',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الهيدر - نص الزر',
                'key' => 'about.hero.button_text',
                'type' => 'short_text',
                'value' => 'تواصل معنا',
                'status' => 'published'
            ],

            [
                'page' => 'من نحن',
                'section' => 'الهيدر - الصورة',
                'key' => 'about.hero.image',
                'type' => 'image',
                'value' => 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop',
                'status' => 'published'
            ],

            // COMPANY INTRO
            [
                'page' => 'من نحن',
                'section' => 'نبذة الشركة - الشارة',
                'key' => 'about.company.badge',
                'type' => 'short_text',
                'value' => 'نبذة عن الشركة',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'نبذة الشركة - العنوان',
                'key' => 'about.company.title',
                'type' => 'short_text',
                'value' => 'مؤسسة وطنية بمعايير احترافية عالمية',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'نبذة الشركة - فقرة 1',
                'key' => 'about.company.paragraph_1',
                'type' => 'long_text',
                'value' => 'نحن كيان هندسي وفني متكامل، نمتلك سنوات طويلة من الخبرة في تقديم حلول صيانة المباني وتأسيس الهياكل الميدانية من الكرفانات والبركسات. نعمل وفق منهجية صارمة تعتمد على الدقة، الجودة، والتنفيذ الآمن.',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'نبذة الشركة - فقرة 2',
                'key' => 'about.company.paragraph_2',
                'type' => 'long_text',
                'value' => 'فريقنا يضم نخبة من المهندسين والفنيين الذين يكرسون جهودهم لدعم القطاعات السكنية، التجارية، والصناعية، لنرتقي بمستوى الخدمات في المملكة للمنافسة العالمية وتقديم بيئات عمل وسكن تدوم طويلاً.',
                'status' => 'published'
            ],

            // VISION
            [
                'page' => 'من نحن',
                'section' => 'الرؤية - العنوان',
                'key' => 'about.vision.title',
                'type' => 'short_text',
                'value' => 'رؤيتنا',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الرؤية - النص',
                'key' => 'about.vision.text',
                'type' => 'long_text',
                'value' => 'أن نكون الخيار الأول والرائد في مجال صيانة المباني وتنفيذ الكرفانات والبركسات على مستوى المملكة، وذلك من خلال تقديم حلول مستدامة تعكس روح الابتكار والتقدم.',
                'status' => 'published'
            ],

            // MISSION
            [
                'page' => 'من نحن',
                'section' => 'الرسالة - العنوان',
                'key' => 'about.mission.title',
                'type' => 'short_text',
                'value' => 'رسالتنا',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الرسالة - النص',
                'key' => 'about.mission.text',
                'type' => 'long_text',
                'value' => 'تقديم خدمات احترافية بمعايير هندسية صارمة وجودة لا تضاهى، تضمن رضا العملاء التام وتلتزم بأعلى درجات السلامة والمواعيد المحددة لبناء مستقبل عقاري أفضل.',
                'status' => 'published'
            ],

            // CORE VALUES
            [
                'page' => 'من نحن',
                'section' => 'القيم - الجودة - العنوان',
                'key' => 'about.values.quality.title',
                'type' => 'short_text',
                'value' => 'الجودة',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'القيم - الجودة - النص',
                'key' => 'about.values.quality.text',
                'type' => 'long_text',
                'value' => 'نلتزم بأعلى معايير الجودة العالمية في التصميم والتنفيذ لضمان ديمومة المشاريع.',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'القيم - الالتزام - العنوان',
                'key' => 'about.values.commitment.title',
                'type' => 'short_text',
                'value' => 'الالتزام',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'القيم - الالتزام - النص',
                'key' => 'about.values.commitment.text',
                'type' => 'long_text',
                'value' => 'العمل بجدية لتسليم المشاريع في الوقت المحدد والميزانية المعتمدة.',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'القيم - الشفافية - العنوان',
                'key' => 'about.values.transparency.title',
                'type' => 'short_text',
                'value' => 'الشفافية',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'القيم - الشفافية - النص',
                'key' => 'about.values.transparency.text',
                'type' => 'long_text',
                'value' => 'وضوح تام في التعامل ومشاركة العميل بتفاصيل مراحل العمل كشريك استراتيجي.',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'القيم - الأمان - العنوان',
                'key' => 'about.values.safety.title',
                'type' => 'short_text',
                'value' => 'الأمان',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'القيم - الأمان - النص',
                'key' => 'about.values.safety.text',
                'type' => 'long_text',
                'value' => 'تطبيق صارم لبروتوكولات السلامة المهنية لحماية فرق العمل والممتلكات.',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'القيم - الابتكار - العنوان',
                'key' => 'about.values.innovation.title',
                'type' => 'short_text',
                'value' => 'الابتكار',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'القيم - الابتكار - النص',
                'key' => 'about.values.innovation.text',
                'type' => 'long_text',
                'value' => 'توظيف أحدث التقنيات والمواد لتقديم حلول هندسية ذكية وفعالة.',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'القيم - التطوير - العنوان',
                'key' => 'about.values.development.title',
                'type' => 'short_text',
                'value' => 'التطوير',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'القيم - التطوير - النص',
                'key' => 'about.values.development.text',
                'type' => 'long_text',
                'value' => 'تحسين مستمر لمهارات الكوادر وتحديث المعدات لنواكب تطلعات المستقبل.',
                'status' => 'published'
            ],

            // STATISTICS
            [
                'page' => 'من نحن',
                'section' => 'الإحصائيات - المشاريع - الرقم',
                'key' => 'about.stats.projects.number',
                'type' => 'short_text',
                'value' => '150',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الإحصائيات - المشاريع - الوصف',
                'key' => 'about.stats.projects.label',
                'type' => 'short_text',
                'value' => 'مشروع مكتمل',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الإحصائيات - الخبرة - الرقم',
                'key' => 'about.stats.experience.number',
                'type' => 'short_text',
                'value' => '10',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الإحصائيات - الخبرة - الوصف',
                'key' => 'about.stats.experience.label',
                'type' => 'short_text',
                'value' => 'سنوات من الخبرة',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الإحصائيات - المهندسين - الرقم',
                'key' => 'about.stats.engineers.number',
                'type' => 'short_text',
                'value' => '25',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الإحصائيات - المهندسين - الوصف',
                'key' => 'about.stats.engineers.label',
                'type' => 'short_text',
                'value' => 'مهندس وفني محترف',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الإحصائيات - الرضا - الرقم',
                'key' => 'about.stats.satisfaction.number',
                'type' => 'short_text',
                'value' => '98',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الإحصائيات - الرضا - الوصف',
                'key' => 'about.stats.satisfaction.label',
                'type' => 'short_text',
                'value' => 'نسبة رضا العملاء',
                'status' => 'published'
            ],

            // TEAM MEMBERS
            [
                'page' => 'من نحن',
                'section' => 'الفريق - عضو 1 - الاسم',
                'key' => 'about.team.member1.name',
                'type' => 'short_text',
                'value' => 'المهندس طارق',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الفريق - عضو 1 - المنصب',
                'key' => 'about.team.member1.position',
                'type' => 'short_text',
                'value' => 'المدير العام والمؤسس',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الفريق - عضو 1 - الإيميل',
                'key' => 'about.team.member1.email',
                'type' => 'short_text',
                'value' => 'tareq@example.com',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الفريق - عضو 1 - الصورة',
                'key' => 'about.team.member1.image',
                'type' => 'image',
                'value' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop',
                'status' => 'published'
            ],
            // Member 2
            [
                'page' => 'من نحن',
                'section' => 'الفريق - عضو 2 - الاسم',
                'key' => 'about.team.member2.name',
                'type' => 'short_text',
                'value' => 'م.محمد نبيل',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الفريق - عضو 2 - المنصب',
                'key' => 'about.team.member2.position',
                'type' => 'short_text',
                'value' => 'رئيس قسم الهندسة الميدانية',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الفريق - عضو 2 - الإيميل',
                'key' => 'about.team.member2.email',
                'type' => 'short_text',
                'value' => 'mohammed@example.com',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الفريق - عضو 2 - الصورة',
                'key' => 'about.team.member2.image',
                'type' => 'image',
                'value' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2000&auto=format&fit=crop',
                'status' => 'published'
            ],
            // Member 3
            [
                'page' => 'من نحن',
                'section' => 'الفريق - عضو 3 - الاسم',
                'key' => 'about.team.member3.name',
                'type' => 'short_text',
                'value' => 'سلطان الدوسري',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الفريق - عضو 3 - المنصب',
                'key' => 'about.team.member3.position',
                'type' => 'short_text',
                'value' => 'مدير عمليات الكرفانات',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الفريق - عضو 3 - الإيميل',
                'key' => 'about.team.member3.email',
                'type' => 'short_text',
                'value' => 'sultan@example.com',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الفريق - عضو 3 - الصورة',
                'key' => 'about.team.member3.image',
                'type' => 'image',
                'value' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop',
                'status' => 'published'
            ],
            // Member 4
            [
                'page' => 'من نحن',
                'section' => 'الفريق - عضو 4 - الاسم',
                'key' => 'about.team.member4.name',
                'type' => 'short_text',
                'value' => 'م. عبد الله',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الفريق - عضو 4 - المنصب',
                'key' => 'about.team.member4.position',
                'type' => 'short_text',
                'value' => 'استشاري العزل والصيانة',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الفريق - عضو 4 - الإيميل',
                'key' => 'about.team.member4.email',
                'type' => 'short_text',
                'value' => 'abdullah@example.com',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'الفريق - عضو 4 - الصورة',
                'key' => 'about.team.member4.image',
                'type' => 'image',
                'value' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000&auto=format&fit=crop',
                'status' => 'published'
            ],

            // CTA SECTION
            [
                'page' => 'من نحن',
                'section' => 'دعوة للعمل - العنوان',
                'key' => 'about.cta.title',
                'type' => 'long_text',
                'value' => 'هل لديك مشروع قادم؟ دعنا نبدأ اليوم.',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'دعوة للعمل - النص',
                'key' => 'about.cta.text',
                'type' => 'long_text',
                'value' => 'اكتشف الفرق مع فريقنا الاحترافي الذي يضع رؤيتك في مقدمة أولوياته.',
                'status' => 'published'
            ],
            [
                'page' => 'من نحن',
                'section' => 'دعوة للعمل - نص الزر',
                'key' => 'about.cta.button_text',
                'type' => 'short_text',
                'value' => 'اطلب استشارة مجانية',
                'status' => 'published'
            ],

            [
                'page' => 'من نحن',
                'section' => 'دعوة للعمل - الخلفية',
                'key' => 'about.cta.background',
                'type' => 'image',
                'value' => 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
                'status' => 'published'
            ],

            // --- Services Page ---
            // HERO SECTION
            [ 'page' => 'الخدمات', 'section' => 'الهيدر - العنوان', 'key' => 'services.hero.title', 'type' => 'short_text', 'value' => 'خدمات صيانة وتنفيذ بمعايير احترافية', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الهيدر - الوصف', 'key' => 'services.hero.subtitle', 'type' => 'long_text', 'value' => 'نقدم حلول متكاملة لصيانة المباني الكرفانات والبركسات بأعلى معايير الجودة العالمية.', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الهيدر - الزر الأساسي', 'key' => 'services.hero.primary_button_text', 'type' => 'short_text', 'value' => 'اطلب عرض سعر', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الهيدر - الزر الثانوي', 'key' => 'services.hero.secondary_button_text', 'type' => 'short_text', 'value' => 'تواصل معنا', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الهيدر - الخلفية', 'key' => 'services.hero.background_image', 'type' => 'image', 'value' => 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop', 'status' => 'published' ],

            // SERVICES GRID SECTION
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - الشارة', 'key' => 'services.grid.badge', 'type' => 'short_text', 'value' => 'خدماتنا الشاملة', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - العنوان', 'key' => 'services.grid.title', 'type' => 'short_text', 'value' => 'خدمات صيانة وتشييد فاخر', 'status' => 'published' ],
            // Maintenance
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - صيانة - أيقونة', 'key' => 'services.grid.maintenance.icon', 'type' => 'short_text', 'value' => 'home_repair_service', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - صيانة - العنوان', 'key' => 'services.grid.maintenance.title', 'type' => 'short_text', 'value' => 'صيانة المباني', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - صيانة - الوصف', 'key' => 'services.grid.maintenance.description', 'type' => 'long_text', 'value' => 'حلول متكاملة لصيانة وترميم المباني والمرافق بأحدث المعدات.', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - صيانة - الزر', 'key' => 'services.grid.maintenance.button_text', 'type' => 'short_text', 'value' => 'عرض التفاصيل', 'status' => 'published' ],
            // Caravans
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - كرفانات - أيقونة', 'key' => 'services.grid.caravans.icon', 'type' => 'short_text', 'value' => 'rv_hookup', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - كرفانات - العنوان', 'key' => 'services.grid.caravans.title', 'type' => 'short_text', 'value' => 'تركيب الكرفانات', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - كرفانات - الوصف', 'key' => 'services.grid.caravans.description', 'type' => 'long_text', 'value' => 'تصنيع وتجهيز الكرفانات الفاخرة لتناسب كافة الاحتياجات.', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - كرفانات - الزر', 'key' => 'services.grid.caravans.button_text', 'type' => 'short_text', 'value' => 'عرض التفاصيل', 'status' => 'published' ],
            // Portacabins
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - بركسات - أيقونة', 'key' => 'services.grid.portacabins.icon', 'type' => 'short_text', 'value' => 'domain', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - بركسات - العنوان', 'key' => 'services.grid.portacabins.title', 'type' => 'short_text', 'value' => 'تنفيذ البركسات', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - بركسات - الوصف', 'key' => 'services.grid.portacabins.description', 'type' => 'long_text', 'value' => 'بركسات مسبقة الصنع بتصاميم هندسية دقيقة للمشاريع.', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - بركسات - الزر', 'key' => 'services.grid.portacabins.button_text', 'type' => 'short_text', 'value' => 'عرض التفاصيل', 'status' => 'published' ],
            // Renovation
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - ترميم - أيقونة', 'key' => 'services.grid.renovation.icon', 'type' => 'short_text', 'value' => 'architecture', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - ترميم - العنوان', 'key' => 'services.grid.renovation.title', 'type' => 'short_text', 'value' => 'أعمال الترميم', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - ترميم - الوصف', 'key' => 'services.grid.renovation.description', 'type' => 'long_text', 'value' => 'إعادة إحياء وتجديد العقارات لتبدو كأنها جديدة تماماً.', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - ترميم - الزر', 'key' => 'services.grid.renovation.button_text', 'type' => 'short_text', 'value' => 'عرض التفاصيل', 'status' => 'published' ],
            // Insulation
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - عزل - أيقونة', 'key' => 'services.grid.insulation.icon', 'type' => 'short_text', 'value' => 'water_drop', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - عزل - العنوان', 'key' => 'services.grid.insulation.title', 'type' => 'short_text', 'value' => 'العزل الحراري والمائي', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - عزل - الوصف', 'key' => 'services.grid.insulation.description', 'type' => 'long_text', 'value' => 'حماية المنشآت من التسربات والتأثيرات المناخية القاسية.', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - عزل - الزر', 'key' => 'services.grid.insulation.button_text', 'type' => 'short_text', 'value' => 'عرض التفاصيل', 'status' => 'published' ],
            // Electrical
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - كهرباء - أيقونة', 'key' => 'services.grid.electrical.icon', 'type' => 'short_text', 'value' => 'electrical_services', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - كهرباء - العنوان', 'key' => 'services.grid.electrical.title', 'type' => 'short_text', 'value' => 'الكهرباء والسباكة', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - كهرباء - الوصف', 'key' => 'services.grid.electrical.description', 'type' => 'long_text', 'value' => 'صيانة وتأسيس شبكات الكهرباء والسباكة بمعايير فنية عالية.', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الشبكة - كهرباء - الزر', 'key' => 'services.grid.electrical.button_text', 'type' => 'short_text', 'value' => 'عرض التفاصيل', 'status' => 'published' ],

            // SERVICE DETAILS SECTIONS
            // Maintenance
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - صيانة - أيقونة', 'key' => 'services.details.maintenance.icon', 'type' => 'short_text', 'value' => 'home_repair_service', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - صيانة - الشارة', 'key' => 'services.details.maintenance.badge', 'type' => 'short_text', 'value' => 'تفاصيل الخدمة', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - صيانة - العنوان', 'key' => 'services.details.maintenance.title', 'type' => 'short_text', 'value' => 'صيانة المباني', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - صيانة - الوصف', 'key' => 'services.details.maintenance.description', 'type' => 'long_text', 'value' => 'نقدم خدمات صيانة شاملة للمباني السكنية والتجارية، تشمل الفحص الدوري، معالجة التصدعات، وتجديد الواجهات الخارجية لضمان استدامة وسلامة المنشأة.', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - صيانة - ميزة 1', 'key' => 'services.details.maintenance.feature1', 'type' => 'short_text', 'value' => 'تنفيذ ومتابعة هندسية متكاملة لصيانة المباني', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - صيانة - ميزة 2', 'key' => 'services.details.maintenance.feature2', 'type' => 'short_text', 'value' => 'فريق متخصص للطوارئ', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - صيانة - ميزة 3', 'key' => 'services.details.maintenance.feature3', 'type' => 'short_text', 'value' => 'ضمان على الأعمال والمواد', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - صيانة - الزر', 'key' => 'services.details.maintenance.button_text', 'type' => 'short_text', 'value' => 'طلب الخدمة الآن', 'status' => 'published' ],
            // Caravans
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - كرفانات - أيقونة', 'key' => 'services.details.caravans.icon', 'type' => 'short_text', 'value' => 'rv_hookup', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - كرفانات - الشارة', 'key' => 'services.details.caravans.badge', 'type' => 'short_text', 'value' => 'تفاصيل الخدمة', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - كرفانات - العنوان', 'key' => 'services.details.caravans.title', 'type' => 'short_text', 'value' => 'تركيب الكرفانات', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - كرفانات - الوصف', 'key' => 'services.details.caravans.description', 'type' => 'long_text', 'value' => 'نصمم وننفذ كرفانات مجهزة بأعلى مستويات الرفاهية والعزل الحراري، لتوفير بيئة مثالية سواء للرحلات السياحية أو الاستخدامات الإدارية الميدانية في المشاريع الكبرى.', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - كرفانات - ميزة 1', 'key' => 'services.details.caravans.feature1', 'type' => 'short_text', 'value' => 'تنفيذ ومتابعة هندسية متكاملة لتركيب الكرفانات', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - كرفانات - ميزة 2', 'key' => 'services.details.caravans.feature2', 'type' => 'short_text', 'value' => 'تصاميم داخلية فاخرة', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - كرفانات - ميزة 3', 'key' => 'services.details.caravans.feature3', 'type' => 'short_text', 'value' => 'عزل حراري ومائي ممتاز', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - كرفانات - الزر', 'key' => 'services.details.caravans.button_text', 'type' => 'short_text', 'value' => 'طلب الخدمة الآن', 'status' => 'published' ],
            // Portacabins
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - بركسات - أيقونة', 'key' => 'services.details.portacabins.icon', 'type' => 'short_text', 'value' => 'domain', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - بركسات - الشارة', 'key' => 'services.details.portacabins.badge', 'type' => 'short_text', 'value' => 'تفاصيل الخدمة', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - بركسات - العنوان', 'key' => 'services.details.portacabins.title', 'type' => 'short_text', 'value' => 'تنفيذ البركسات', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - بركسات - الوصف', 'key' => 'services.details.portacabins.description', 'type' => 'long_text', 'value' => 'نوفر حلول البركسات السريعة والمستدامة لمعسكرات العمال والمكاتب الإدارية المؤقتة، مع الالتزام التام بمعايير السلامة والجودة العالمية.', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - بركسات - ميزة 1', 'key' => 'services.details.portacabins.feature1', 'type' => 'short_text', 'value' => 'تنفيذ ومتابعة هندسية متكاملة لتنفيذ البركسات', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - بركسات - ميزة 2', 'key' => 'services.details.portacabins.feature2', 'type' => 'short_text', 'value' => 'سرعة في التوريد والتركيب', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - بركسات - ميزة 3', 'key' => 'services.details.portacabins.feature3', 'type' => 'short_text', 'value' => 'مقاومة للعوامل الجوية', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - بركسات - الزر', 'key' => 'services.details.portacabins.button_text', 'type' => 'short_text', 'value' => 'طلب الخدمة الآن', 'status' => 'published' ],
            // Renovation
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - ترميم - أيقونة', 'key' => 'services.details.renovation.icon', 'type' => 'short_text', 'value' => 'architecture', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - ترميم - الشارة', 'key' => 'services.details.renovation.badge', 'type' => 'short_text', 'value' => 'تفاصيل الخدمة', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - ترميم - العنوان', 'key' => 'services.details.renovation.title', 'type' => 'short_text', 'value' => 'أعمال الترميم', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - ترميم - الوصف', 'key' => 'services.details.renovation.description', 'type' => 'long_text', 'value' => 'عمليات ترميم دقيقة للمباني التاريخية والمعاصرة، نستخدم مواد متطورة تعالج أساسات البناء والتشطيبات لتدوم طويلاً وتزيد من قيمة العقار.', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - ترميم - ميزة 1', 'key' => 'services.details.renovation.feature1', 'type' => 'short_text', 'value' => 'تنفيذ ومتابعة هندسية متكاملة لأعمال الترميم', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - ترميم - ميزة 2', 'key' => 'services.details.renovation.feature2', 'type' => 'short_text', 'value' => 'إعادة التصميم الداخلي والخارجي', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - ترميم - ميزة 3', 'key' => 'services.details.renovation.feature3', 'type' => 'short_text', 'value' => 'استخدام أحدث مواد البناء', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'التفاصيل - ترميم - الزر', 'key' => 'services.details.renovation.button_text', 'type' => 'short_text', 'value' => 'طلب الخدمة الآن', 'status' => 'published' ],

            // STRENGTH POINTS SECTION
            [ 'page' => 'الخدمات', 'section' => 'القوة - العنوان', 'key' => 'services.strength.title', 'type' => 'short_text', 'value' => 'لماذا نعد الخيار الأمثل؟', 'status' => 'published' ],

            [ 'page' => 'الخدمات', 'section' => 'القوة - خبرة - أيقونة', 'key' => 'services.strength.experience.icon', 'type' => 'short_text', 'value' => 'military_tech', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'القوة - خبرة - العنوان', 'key' => 'services.strength.experience.title', 'type' => 'short_text', 'value' => '+10 سنوات خبرة', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'القوة - خبرة - الوصف', 'key' => 'services.strength.experience.description', 'type' => 'short_text', 'value' => 'تاريخ طويل من الإنجازات', 'status' => 'published' ],

            [ 'page' => 'الخدمات', 'section' => 'القوة - فريق - أيقونة', 'key' => 'services.strength.team.icon', 'type' => 'short_text', 'value' => 'engineering', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'القوة - فريق - العنوان', 'key' => 'services.strength.team.title', 'type' => 'short_text', 'value' => 'فريق هندسي محترف', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'القوة - فريق - الوصف', 'key' => 'services.strength.team.description', 'type' => 'short_text', 'value' => 'خبرات فنية استثنائية', 'status' => 'published' ],

            [ 'page' => 'الخدمات', 'section' => 'القوة - سرعة - أيقونة', 'key' => 'services.strength.speed.icon', 'type' => 'short_text', 'value' => 'speed', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'القوة - سرعة - العنوان', 'key' => 'services.strength.speed.title', 'type' => 'short_text', 'value' => 'تنفيذ سريع', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'القوة - سرعة - الوصف', 'key' => 'services.strength.speed.description', 'type' => 'short_text', 'value' => 'التزام دقيق بالمواعيد', 'status' => 'published' ],

            [ 'page' => 'الخدمات', 'section' => 'القوة - جودة - أيقونة', 'key' => 'services.strength.quality.icon', 'type' => 'short_text', 'value' => 'diamond', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'القوة - جودة - العنوان', 'key' => 'services.strength.quality.title', 'type' => 'short_text', 'value' => 'مواد عالية الجودة', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'القوة - جودة - الوصف', 'key' => 'services.strength.quality.description', 'type' => 'short_text', 'value' => 'شراكات مع موردين عالميين', 'status' => 'published' ],

            [ 'page' => 'الخدمات', 'section' => 'القوة - ضمان - أيقونة', 'key' => 'services.strength.warranty.icon', 'type' => 'short_text', 'value' => 'verified_user', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'القوة - ضمان - العنوان', 'key' => 'services.strength.warranty.title', 'type' => 'short_text', 'value' => 'ضمان على الأعمال', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'القوة - ضمان - الوصف', 'key' => 'services.strength.warranty.description', 'type' => 'short_text', 'value' => 'راحة بال للعميل', 'status' => 'published' ],

            [ 'page' => 'الخدمات', 'section' => 'القوة - دعم - أيقونة', 'key' => 'services.strength.support.icon', 'type' => 'short_text', 'value' => 'support_agent', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'القوة - دعم - العنوان', 'key' => 'services.strength.support.title', 'type' => 'short_text', 'value' => 'خدمة 24/7', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'القوة - دعم - الوصف', 'key' => 'services.strength.support.description', 'type' => 'short_text', 'value' => 'استجابة فورية للأعطال', 'status' => 'published' ],

            // PROJECTS PREVIEW SECTION
            [ 'page' => 'الخدمات', 'section' => 'مشاريع - الشارة', 'key' => 'services.projects.badge', 'type' => 'short_text', 'value' => 'سجل أعمالنا', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'مشاريع - العنوان', 'key' => 'services.projects.title', 'type' => 'short_text', 'value' => 'أحدث المشاريع المنفذة', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'مشاريع - نص الزر', 'key' => 'services.projects.view_all_text', 'type' => 'short_text', 'value' => 'عرض جميع المشاريع', 'status' => 'published' ],

            // TESTIMONIALS SECTION
            [ 'page' => 'الخدمات', 'section' => 'تقييمات - الشارة', 'key' => 'services.testimonials.badge', 'type' => 'short_text', 'value' => 'شركاء النجاح', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'تقييمات - العنوان', 'key' => 'services.testimonials.title', 'type' => 'short_text', 'value' => 'ثقة تبنى على الإنجازات', 'status' => 'published' ],

            [ 'page' => 'الخدمات', 'section' => 'تقييمات - 1 - النص', 'key' => 'services.testimonials.item1.text', 'type' => 'long_text', 'value' => 'سرعة في صيانة المبنى الإداري ومهنية عالية في التعامل مع أنظمة العزل الحراري، نعتبرهم شريك استراتيجي.', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'تقييمات - 1 - الاسم', 'key' => 'services.testimonials.item1.name', 'type' => 'short_text', 'value' => 'مجموعة المجد للتجارة', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'تقييمات - 1 - الشركة', 'key' => 'services.testimonials.item1.company', 'type' => 'short_text', 'value' => 'مجموعة المجد للتجارة', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'تقييمات - 1 - المنصب', 'key' => 'services.testimonials.item1.position', 'type' => 'short_text', 'value' => 'مدير العمليات', 'status' => 'published' ],

            [ 'page' => 'الخدمات', 'section' => 'تقييمات - 2 - النص', 'key' => 'services.testimonials.item2.text', 'type' => 'long_text', 'value' => 'نفذوا لنا 3 كرفانات مكتبية فاخرة بمواصفات عزل غير مسبوقة، جودة التنفيذ واضحة في كل زاوية.', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'تقييمات - 2 - الاسم', 'key' => 'services.testimonials.item2.name', 'type' => 'short_text', 'value' => 'شركة أبعاد هندسية', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'تقييمات - 2 - الشركة', 'key' => 'services.testimonials.item2.company', 'type' => 'short_text', 'value' => 'شركة أبعاد هندسية', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'تقييمات - 2 - المنصب', 'key' => 'services.testimonials.item2.position', 'type' => 'short_text', 'value' => 'المدير التنفيذي', 'status' => 'published' ],

            [ 'page' => 'الخدمات', 'section' => 'تقييمات - 3 - النص', 'key' => 'services.testimonials.item3.text', 'type' => 'long_text', 'value' => 'تم تصميم وتصنيع برت كابن متكامل لمشروعي الخاص. الجودة والسرعة في التسليم كانت مبهرة حقاً.', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'تقييمات - 3 - الاسم', 'key' => 'services.testimonials.item3.name', 'type' => 'short_text', 'value' => 'سالم الشمري', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'تقييمات - 3 - الشركة', 'key' => 'services.testimonials.item3.company', 'type' => 'short_text', 'value' => 'مزرعة خاصة', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'تقييمات - 3 - المنصب', 'key' => 'services.testimonials.item3.position', 'type' => 'short_text', 'value' => 'مالك مزرعة', 'status' => 'published' ],

            // FINAL CTA SECTION
            [ 'page' => 'الخدمات', 'section' => 'الخاتمة - أيقونة', 'key' => 'services.cta.icon', 'type' => 'short_text', 'value' => 'engineering', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الخاتمة - العنوان', 'key' => 'services.cta.title', 'type' => 'short_text', 'value' => 'هل لديك مشروع قادم؟ دعنا نبدأ اليوم.', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الخاتمة - الوصف', 'key' => 'services.cta.description', 'type' => 'long_text', 'value' => 'نحن هنا لنحول أفكارك إلى واقع ملموس. احصل على استشارة هندسية احترافية تتناسب مع ميزانيتك.', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الخاتمة - نص الزر', 'key' => 'services.cta.button_text', 'type' => 'short_text', 'value' => 'اطلب استشارة مجانية', 'status' => 'published' ],
            [ 'page' => 'الخدمات', 'section' => 'الخاتمة - الخلفية', 'key' => 'services.cta.background_image', 'type' => 'image', 'value' => 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop', 'status' => 'published' ],


            // --- Projects Page ---
            [
                'page' => 'مشاريعنا',
                'section' => 'العنوان الرئيسي',
                'key' => 'projects.header.title',
                'type' => 'short_text',
                'value' => 'سجل أعمالنا',
                'status' => 'published'
            ],
            [
                'page' => 'مشاريعنا',
                'section' => 'الوصف الرئيسي',
                'key' => 'projects.header.subtitle',
                'type' => 'long_text',
                'value' => 'نفتخر برصيد حافل بالنجاحات من المشاريع المنجزة بكفاءة واحترافية عالية، لتكون شواهد على التزامنا بجودة العمل.',
                'status' => 'published'
            ],
            [
                'page' => 'مشاريعنا',
                'section' => 'الصورة الرئيسية',
                'key' => 'projects.header.image',
                'type' => 'image',
                'value' => 'https://images.unsplash.com/photo-1541888081600-618840cae389?q=80&w=2670&auto=format&fit=crop',
                'status' => 'published'
            ],

             // --- Contact Page ---
             [
                'page' => 'اتصل بنا',
                'section' => 'العنوان الرئيسي',
                'key' => 'contact.header.title',
                'type' => 'short_text',
                'value' => 'نحن هنا لخدمتكم',
                'status' => 'published'
            ],
            [
                'page' => 'اتصل بنا',
                'section' => 'الوصف الرئيسي',
                'key' => 'contact.header.subtitle',
                'type' => 'long_text',
                'value' => 'يسعدنا تواصلكم معنا للرد والاستفسار عن خدماتنا أو لطلب استشارة مبدئية بدون أي التزامات.',
                'status' => 'published'
            ],
            [
                'page' => 'اتصل بنا',
                'section' => 'الصورة الرئيسية',
                'key' => 'contact.header.image',
                'type' => 'image',
                'value' => 'https://images.unsplash.com/photo-1541888081600-618840cae389?q=80&w=2670&auto=format&fit=crop',
                'status' => 'published'
            ],
        ];

        foreach ($contents as $data) {
            \App\Models\Content::updateOrCreate(
                ['key' => $data['key']],
                $data
            );
        }
    }
}
