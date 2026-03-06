<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Content;

class NewServicePagesContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contents = [
            // --- صيانة الكرفانات ---
            [ 'page' => 'صيانة الكرفانات', 'section' => 'الهيدر - العنوان', 'key' => 'services.caravans.hero.title', 'type' => 'short_text', 'value' => 'صيانة الكرفانات', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'الهيدر - الوصف', 'key' => 'services.caravans.hero.subtitle', 'type' => 'long_text', 'value' => 'نقدم خدمات متكاملة لصيانة وتجديد وتجهيز الكرفانات بأحدث المواصفات لتلبية كافة احتياجاتك.', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'الهيدر - الشارة', 'key' => 'services.caravans.hero.badge', 'type' => 'short_text', 'value' => 'تجهيز وتجديد', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'الهيدر - الخلفية', 'key' => 'services.caravans.hero.image', 'type' => 'image', 'value' => '/images/services/caravans_bg.png', 'status' => 'published' ],

            [ 'page' => 'صيانة الكرفانات', 'section' => 'ماذا نقدم - الشارة', 'key' => 'services.caravans.services.badge', 'type' => 'short_text', 'value' => 'ماذا نقدم؟', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'ماذا نقدم - العنوان', 'key' => 'services.caravans.services.title', 'type' => 'short_text', 'value' => 'خدمات صيانة الكرفانات', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'ماذا نقدم - خدمة 1 - العنوان', 'key' => 'services.caravans.services.item1.title', 'type' => 'short_text', 'value' => 'صيانة كهربائية', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'ماذا نقدم - خدمة 1 - الوصف', 'key' => 'services.caravans.services.item1.desc', 'type' => 'long_text', 'value' => 'تأسيس وإصلاح كافة التمديدات الكهربائية لضمان الجودة والأمان.', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'ماذا نقدم - خدمة 2 - العنوان', 'key' => 'services.caravans.services.item2.title', 'type' => 'short_text', 'value' => 'صيانة ميكانيكية', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'ماذا نقدم - خدمة 2 - الوصف', 'key' => 'services.caravans.services.item2.desc', 'type' => 'long_text', 'value' => 'إصلاح جميع الأعطال الميكانيكية بقطع غيار أصلية وخبرة وكفاءة.', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'ماذا نقدم - خدمة 3 - العنوان', 'key' => 'services.caravans.services.item3.title', 'type' => 'short_text', 'value' => 'تجديد داخلي', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'ماذا نقدم - خدمة 3 - الوصف', 'key' => 'services.caravans.services.item3.desc', 'type' => 'long_text', 'value' => 'إعادة تصميم وفرش الكرفانات داخلياً بأحدث الديكورات العصرية.', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'ماذا نقدم - خدمة 4 - العنوان', 'key' => 'services.caravans.services.item4.title', 'type' => 'short_text', 'value' => 'تنظيف وتجهيز', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'ماذا نقدم - خدمة 4 - الوصف', 'key' => 'services.caravans.services.item4.desc', 'type' => 'long_text', 'value' => 'تجهيز الكرفان وتنظيفه بالكامل ليكون جاهزاً للاستخدام المباشر.', 'status' => 'published' ],

            [ 'page' => 'صيانة الكرفانات', 'section' => 'آلية العمل - الشارة', 'key' => 'services.caravans.process.badge', 'type' => 'short_text', 'value' => 'آلية العمل', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'آلية العمل - العنوان', 'key' => 'services.caravans.process.title', 'type' => 'short_text', 'value' => 'خطوات الصيانة خطوة بخطوة', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'آلية العمل - خطوة 1 - العنوان', 'key' => 'services.caravans.process.step1.title', 'type' => 'short_text', 'value' => 'تقييم الكرفان', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'آلية العمل - خطوة 1 - الوصف', 'key' => 'services.caravans.process.step1.desc', 'type' => 'long_text', 'value' => 'نقوم بفحص الكرفان بشكل كامل لتحديد احتياجات الصيانة بدقة.', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'آلية العمل - خطوة 2 - العنوان', 'key' => 'services.caravans.process.step2.title', 'type' => 'short_text', 'value' => 'عرض السعر', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'آلية العمل - خطوة 2 - الوصف', 'key' => 'services.caravans.process.step2.desc', 'type' => 'long_text', 'value' => 'نقدم لك عرض سعر تفصيلي وشفاف بناءً على الفحص الميداني.', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'آلية العمل - خطوة 3 - العنوان', 'key' => 'services.caravans.process.step3.title', 'type' => 'short_text', 'value' => 'التنفيذ', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'آلية العمل - خطوة 3 - الوصف', 'key' => 'services.caravans.process.step3.desc', 'type' => 'long_text', 'value' => 'يبدأ فريقنا المتخصص بتنفيذ أعمال الصيانة بأعلى المعايير.', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'آلية العمل - خطوة 4 - العنوان', 'key' => 'services.caravans.process.step4.title', 'type' => 'short_text', 'value' => 'الفحص النهائي', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'آلية العمل - خطوة 4 - الوصف', 'key' => 'services.caravans.process.step4.desc', 'type' => 'long_text', 'value' => 'نسلمك الكرفان بعد إجراء فحص شامل لضمان جودة العمل.', 'status' => 'published' ],

            [ 'page' => 'صيانة الكرفانات', 'section' => 'لماذا نحن - الشارة', 'key' => 'services.caravans.why.badge', 'type' => 'short_text', 'value' => 'لماذا نحن؟', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'لماذا نحن - العنوان', 'key' => 'services.caravans.why.title', 'type' => 'short_text', 'value' => 'نضمن لك الجودة والسرعة في التنفيذ', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'لماذا نحن - الوصف', 'key' => 'services.caravans.why.desc', 'type' => 'long_text', 'value' => 'فريقنا المتميز يضع معايير الجودة نُصب عينيه، لضمان استلامك كرفانك جاهزاً وكأنه جديد، بأفضل التقنيات الحديثة وأجود المواد الخام المتاحة.', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'لماذا نحن - ميزة 1 - العنوان', 'key' => 'services.caravans.why.item1.title', 'type' => 'short_text', 'value' => 'تنفيذ سريع', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'لماذا نحن - ميزة 1 - الوصف', 'key' => 'services.caravans.why.item1.desc', 'type' => 'long_text', 'value' => 'نلتزم بالمواعيد المحددة ونسلمك الكرفان في الوقت المتفق عليه.', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'لماذا نحن - ميزة 2 - العنوان', 'key' => 'services.caravans.why.item2.title', 'type' => 'short_text', 'value' => 'فريق متخصص', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'لماذا نحن - ميزة 2 - الوصف', 'key' => 'services.caravans.why.item2.desc', 'type' => 'long_text', 'value' => 'مهندسون وفنيون ذوو خبرة طويلة في صيانة وتجديد الكرفانات.', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'لماذا نحن - ميزة 3 - العنوان', 'key' => 'services.caravans.why.item3.title', 'type' => 'short_text', 'value' => 'أسعار تنافسية', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'لماذا نحن - ميزة 3 - الوصف', 'key' => 'services.caravans.why.item3.desc', 'type' => 'long_text', 'value' => 'نقدم خدمات استثنائية بأسعار مدروسة تناسب ميزانيتك.', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'لماذا نحن - ميزة 4 - العنوان', 'key' => 'services.caravans.why.item4.title', 'type' => 'short_text', 'value' => 'رضا العملاء', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'لماذا نحن - ميزة 4 - الوصف', 'key' => 'services.caravans.why.item4.desc', 'type' => 'long_text', 'value' => 'نضع رضا العميل على رأس أولوياتنا مع ضمان على الخدمات.', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'لماذا نحن - الصورة', 'key' => 'services.caravans.why.image', 'type' => 'image', 'value' => 'https://images.unsplash.com/photo-1527525443983-6e60c75fff50?q=80&w=1972&auto=format&fit=crop', 'status' => 'published' ],

            [ 'page' => 'صيانة الكرفانات', 'section' => 'الخاتمة - العنوان', 'key' => 'services.caravans.cta.title', 'type' => 'short_text', 'value' => 'هل كرفانك يحتاج إلى صيانة؟', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'الخاتمة - الوصف', 'key' => 'services.caravans.cta.subtitle', 'type' => 'long_text', 'value' => 'تواصل معنا الآن للحصول على استشارة وعرض سعر.', 'status' => 'published' ],
            [ 'page' => 'صيانة الكرفانات', 'section' => 'الخاتمة - الزر', 'key' => 'services.caravans.cta.button_text', 'type' => 'short_text', 'value' => 'اطلب عرض السعر', 'status' => 'published' ],


            // --- صيانة البركسات ---
            [ 'page' => 'صيانة البركسات', 'section' => 'الهيدر - العنوان', 'key' => 'services.portacabins.hero.title', 'type' => 'short_text', 'value' => 'صيانة وتنفيذ البركسات', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'الهيدر - الوصف', 'key' => 'services.portacabins.hero.subtitle', 'type' => 'long_text', 'value' => 'نقدم حلولاً متكاملة لتصميم، تنفيذ، وصيانة البركسات بمواصفات هندسية عالية الجودة لتناسب كافة قطاعات الأعمال والاحتياجات الميدانية.', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'الهيدر - الشارة', 'key' => 'services.portacabins.hero.badge', 'type' => 'short_text', 'value' => 'تصميم وتنفيذ', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'الهيدر - الخلفية', 'key' => 'services.portacabins.hero.image', 'type' => 'image', 'value' => '/images/services/portacabins_bg.png', 'status' => 'published' ],

            [ 'page' => 'صيانة البركسات', 'section' => 'ماذا نقدم - الشارة', 'key' => 'services.portacabins.services.badge', 'type' => 'short_text', 'value' => 'خدمات البركسات المتكاملة', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'ماذا نقدم - العنوان', 'key' => 'services.portacabins.services.title', 'type' => 'short_text', 'value' => 'لماذا تختار خدماتنا للبركسات؟', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'ماذا نقدم - خدمة 1 - العنوان', 'key' => 'services.portacabins.services.item1.title', 'type' => 'short_text', 'value' => 'تنفيذ المشاريع الجديدة', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'ماذا نقدم - خدمة 1 - الوصف', 'key' => 'services.portacabins.services.item1.desc', 'type' => 'long_text', 'value' => 'نصمم ونبني بركسات جديدة بمساحات وتصاميم مخصصة لتلبية احتياجات مشروعك الميداني بشكل مثالي.', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'ماذا نقدم - خدمة 2 - العنوان', 'key' => 'services.portacabins.services.item2.title', 'type' => 'short_text', 'value' => 'الصيانة الشاملة', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'ماذا نقدم - خدمة 2 - الوصف', 'key' => 'services.portacabins.services.item2.desc', 'type' => 'long_text', 'value' => 'صيانة وتجديد البركسات القديمة لتعود كالجديدة، مما يطيل عمرها الافتراضي ويوفر عليك التكاليف.', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'ماذا نقدم - خدمة 3 - العنوان', 'key' => 'services.portacabins.services.item3.title', 'type' => 'short_text', 'value' => 'تحديث الأنظمة', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'ماذا نقدم - خدمة 3 - الوصف', 'key' => 'services.portacabins.services.item3.desc', 'type' => 'long_text', 'value' => 'ترقية أنظمة الكهرباء، التكييف، والسباكة في البركسات بأحدث التقنيات لضمان الكفاءة والأمان.', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'ماذا نقدم - خدمة 4 - العنوان', 'key' => 'services.portacabins.services.item4.title', 'type' => 'short_text', 'value' => 'تطوير العزل', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'ماذا نقدم - خدمة 4 - الوصف', 'key' => 'services.portacabins.services.item4.desc', 'type' => 'long_text', 'value' => 'تحسين العزل الحراري بنظام البانل ساندوتش لضمان تحمل أقسى الظروف المناخية في الموقع.', 'status' => 'published' ],

            [ 'page' => 'صيانة البركسات', 'section' => 'لماذا نحن - الشارة', 'key' => 'services.portacabins.why.badge', 'type' => 'short_text', 'value' => 'مزايا التعامل معنا', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'لماذا نحن - العنوان', 'key' => 'services.portacabins.why.title', 'type' => 'short_text', 'value' => 'الجودة والمتانة التي يمكنك الاعتماد عليها', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'لماذا نحن - الوصف', 'key' => 'services.portacabins.why.desc', 'type' => 'long_text', 'value' => 'نحن نتفهم أهمية البركسات كركيزة أساسية في مواقع العمل والمعسكرات، لذلك نحرص على تقديم أعلى مستويات المتانة والجودة في جميع مشاريعنا لضمان بيئة عمل آمنة ومريحة لفرقكم.', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'لماذا نحن - ميزة 1 - العنوان', 'key' => 'services.portacabins.why.item1.title', 'type' => 'short_text', 'value' => 'مواد عالية الجودة', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'لماذا نحن - ميزة 1 - الوصف', 'key' => 'services.portacabins.why.item1.desc', 'type' => 'long_text', 'value' => 'نستخدم فقط المواد المعتمدة والمطابقة للمواصفات العالمية في بناء وتشطيب البركسات.', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'لماذا نحن - ميزة 2 - العنوان', 'key' => 'services.portacabins.why.item2.title', 'type' => 'short_text', 'value' => 'تصاميم مرنة', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'لماذا نحن - ميزة 2 - الوصف', 'key' => 'services.portacabins.why.item2.desc', 'type' => 'long_text', 'value' => 'نقدم حلول تصميم قابلة للتعديل والدمج لتوفير مساحات أكبر عند الحاجة.', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'لماذا نحن - ميزة 3 - العنوان', 'key' => 'services.portacabins.why.item3.title', 'type' => 'short_text', 'value' => 'سرعة الإنجاز', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'لماذا نحن - ميزة 3 - الوصف', 'key' => 'services.portacabins.why.item3.desc', 'type' => 'long_text', 'value' => 'إدارة مشاريع فعالة تضمن توريد وتركيب البركسات في أسرع وقت ممكن لبدء عملكم.', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'لماذا نحن - ميزة 4 - العنوان', 'key' => 'services.portacabins.why.item4.title', 'type' => 'short_text', 'value' => 'مقاومة للعوامل الجوية', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'لماذا نحن - ميزة 4 - الوصف', 'key' => 'services.portacabins.why.item4.desc', 'type' => 'long_text', 'value' => 'هياكل قوية مصممة لتحمل الرياح والأمطار ودرجات الحرارة المرتفعة.', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'لماذا نحن - الصورة', 'key' => 'services.portacabins.why.image', 'type' => 'image', 'value' => 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?q=80&w=2070&auto=format&fit=crop', 'status' => 'published' ],

            [ 'page' => 'صيانة البركسات', 'section' => 'الخاتمة - العنوان', 'key' => 'services.portacabins.cta.title', 'type' => 'short_text', 'value' => 'هل تخطط لمشروع جديد؟', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'الخاتمة - الوصف', 'key' => 'services.portacabins.cta.subtitle', 'type' => 'long_text', 'value' => 'احصل على بركسات مصممة خصيصاً لاحتياجاتك بأفضل الأسعار. تواصل معنا اليوم لتحصل على عرض سعر مخصص وخطط توفر عليك الوقت والجهد.', 'status' => 'published' ],
            [ 'page' => 'صيانة البركسات', 'section' => 'الخاتمة - الزر', 'key' => 'services.portacabins.cta.button_text', 'type' => 'short_text', 'value' => 'اطلب استشارة وتصميم مجاني', 'status' => 'published' ],


            // --- صيانة المباني ---
            [ 'page' => 'صيانة المباني', 'section' => 'الهيدر - العنوان', 'key' => 'services.buildings.hero.title', 'type' => 'short_text', 'value' => 'صيانة شاملة للمباني', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'الهيدر - الوصف', 'key' => 'services.buildings.hero.subtitle', 'type' => 'long_text', 'value' => 'نوفر خدمات متكاملة للحفاظ على استدامة وجمالية المباني السكنية والتجارية، بخبرات هندسية رائدة وتكنولوجيا صيانة حديثة.', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'الهيدر - الشارة', 'key' => 'services.buildings.hero.badge', 'type' => 'short_text', 'value' => 'حماية واستدامة', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'الهيدر - الخلفية', 'key' => 'services.buildings.hero.image', 'type' => 'image', 'value' => '/images/services/buildings_bg.png', 'status' => 'published' ],

            [ 'page' => 'صيانة المباني', 'section' => 'ماذا نقدم - الشارة', 'key' => 'services.buildings.services.badge', 'type' => 'short_text', 'value' => 'تغدية شاملة لاحتياجاتك', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'ماذا نقدم - العنوان', 'key' => 'services.buildings.services.title', 'type' => 'short_text', 'value' => 'حلول الصيانة المتكاملة التي نقدمها', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'ماذا نقدم - خدمة 1 - العنوان', 'key' => 'services.buildings.services.item1.title', 'type' => 'short_text', 'value' => 'الترميم الشامل', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'ماذا نقدم - خدمة 1 - الوصف', 'key' => 'services.buildings.services.item1.desc', 'type' => 'long_text', 'value' => 'تجديد داخلي وخارجي للفلل والمجمعات السكنية والتجارية لتعود متألقة وقوية الهيكل.', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'ماذا نقدم - خدمة 2 - العنوان', 'key' => 'services.buildings.services.item2.title', 'type' => 'short_text', 'value' => 'العزل الهندسي', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'ماذا نقدم - خدمة 2 - الوصف', 'key' => 'services.buildings.services.item2.desc', 'type' => 'long_text', 'value' => 'تنفيذ أنظمة العزل الحراري والمائي للأسطح والواجهات لحمايتها من تسربات المياه والتغيرات المناخية.', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'ماذا نقدم - خدمة 3 - العنوان', 'key' => 'services.buildings.services.item3.title', 'type' => 'short_text', 'value' => 'السباكة والكهرباء', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'ماذا نقدم - خدمة 3 - الوصف', 'key' => 'services.buildings.services.item3.desc', 'type' => 'long_text', 'value' => 'فحص وصيانة وتحديث جميع شبكات الكهرباء وأنظمة المياه والصرف الصحي بأعلى معايير السلامة.', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'ماذا نقدم - خدمة 4 - العنوان', 'key' => 'services.buildings.services.item4.title', 'type' => 'short_text', 'value' => 'التشطيبات والدهانات', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'ماذا نقدم - خدمة 4 - الوصف', 'key' => 'services.buildings.services.item4.desc', 'type' => 'long_text', 'value' => 'لمسـات أخيرة احترافية تشمل دهانات عصرية وأسقف معلقة وتكسيات للواجهات تعكس رقياً فائقاً.', 'status' => 'published' ],

            [ 'page' => 'صيانة المباني', 'section' => 'لماذا نحن - الشارة', 'key' => 'services.buildings.why.badge', 'type' => 'short_text', 'value' => 'رؤية هندسية واضحة', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'لماذا نحن - العنوان', 'key' => 'services.buildings.why.title', 'type' => 'short_text', 'value' => 'إطالة عمر المبنى والحفاظ على قيمته', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'لماذا نحن - الوصف', 'key' => 'services.buildings.why.desc', 'type' => 'long_text', 'value' => 'تتعرض المباني مع مرور الوقت لتحديات بيئية وإنشائية عديدة. فريقنا الهندسي المجهز بأحدث أجهزة الفحص، يقوم برصد أسباب المشكلة ومعالجتها جذرياً لا مؤقتاً، لحماية استثمارك العقاري للحاضر والمستقبل.', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'لماذا نحن - ميزة 1 - العنوان', 'key' => 'services.buildings.why.item1.title', 'type' => 'short_text', 'value' => 'تشخيص دقيق', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'لماذا نحن - ميزة 1 - الوصف', 'key' => 'services.buildings.why.item1.desc', 'type' => 'long_text', 'value' => 'نستخدم أدوات وتقنيات متطورة للكشف عن التصدعات وأماكن التسرب المائي المخفية دون تكسير للحوائط.', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'لماذا نحن - ميزة 2 - العنوان', 'key' => 'services.buildings.why.item2.title', 'type' => 'short_text', 'value' => 'مواد صيانة متطورة', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'لماذا نحن - ميزة 2 - الوصف', 'key' => 'services.buildings.why.item2.desc', 'type' => 'long_text', 'value' => 'اختيار مواد بناء وحقن كيماوي للخرسانة معتمدة لضمان عدم تكرار المشكلة ومعالجة أساس الخلل.', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'لماذا نحن - ميزة 3 - العنوان', 'key' => 'services.buildings.why.item3.title', 'type' => 'short_text', 'value' => 'حفاظ عالٍ على النظافة', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'لماذا نحن - ميزة 3 - الوصف', 'key' => 'services.buildings.why.item3.desc', 'type' => 'long_text', 'value' => 'نحرص على احترام مساحات العملاء، ونقوم بعمليات الصيانة بطريقة منظمة ونظيفة قدر الإمكان.', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'لماذا نحن - ميزة 4 - العنوان', 'key' => 'services.buildings.why.item4.title', 'type' => 'short_text', 'value' => 'ضمانات ممتازة', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'لماذا نحن - ميزة 4 - الوصف', 'key' => 'services.buildings.why.item4.desc', 'type' => 'long_text', 'value' => 'نمنحك شهادات ضمان موثقة على كافة أعمال العزل الشاملة والصيانة الإنشائية التي ننفذها.', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'لماذا نحن - الصورة', 'key' => 'services.buildings.why.image', 'type' => 'image', 'value' => 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2000&auto=format&fit=crop', 'status' => 'published' ],

            [ 'page' => 'صيانة المباني', 'section' => 'الخاتمة - العنوان', 'key' => 'services.buildings.cta.title', 'type' => 'short_text', 'value' => 'براءات اختراع في إطالة عمر مبناك!', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'الخاتمة - الوصف', 'key' => 'services.buildings.cta.subtitle', 'type' => 'long_text', 'value' => 'مهما كان نوع التدخل الذي يحتاجه العقار السكني أو المرفق التجاري الخاص بك، اترك عبء الصيانة لنا بأمان. اطلب معاينة للبدء في تشخيص وحل المشكلة بشكل فوري.', 'status' => 'published' ],
            [ 'page' => 'صيانة المباني', 'section' => 'الخاتمة - الزر', 'key' => 'services.buildings.cta.button_text', 'type' => 'short_text', 'value' => 'اطلب معاينة وتشخيص', 'status' => 'published' ],

        ];

        foreach ($contents as $data) {
            Content::updateOrCreate(
                ['key' => $data['key']],
                $data
            );
        }
    }
}
