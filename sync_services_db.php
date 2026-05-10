<?php

use App\Models\Content;
use Illuminate\Support\Facades\DB;

// Bootstrap Laravel
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Delete all old services content to allow the default values in Index.jsx to show,
// OR we can explicitly seed the new landscaping content. 
// Let's explicitly seed the landscaping content to be safe and allow the user to edit it in the Admin panel.

// 1. Delete old services content
Content::where('key', 'like', 'services.%')->delete();

$servicesContent = [
    // Hero
    'services.hero.title' => 'تصميم وتنسيق حدائق بمعايير استثنائية',
    'services.hero.subtitle' => 'حلول متكاملة نصنع بها من مساحاتك الخارجية لوحات فنية تنبض بالحياة.',
    'services.hero.primary_button_text' => 'اطلب عرض سعر',
    'services.hero.secondary_button_text' => 'تواصل معنا',
    
    // Grid Badge
    'services.grid.badge' => 'خدماتنا الشاملة',

    // Grid Items (Icons, Titles, Descriptions)
    'services.grid.maintenance.icon' => 'yard',
    'services.grid.maintenance.title' => 'تنسيق الحدائق',
    'services.grid.maintenance.description' => 'تصاميم خارجية مذهلة وتحويل المساحات إلى واحات خضراء تعكس ذوقك.',
    
    'services.grid.caravans.icon' => 'design_services',
    'services.grid.caravans.title' => 'تصميم 3D',
    'services.grid.caravans.description' => 'رؤية حديقتك قبل التنفيذ باستخدام أحدث برامج التصميم ثلاثي الأبعاد.',
    
    'services.grid.portacabins.icon' => 'grass',
    'services.grid.portacabins.title' => 'العشب الصناعي',
    'services.grid.portacabins.description' => 'أفضل أنواع العشب المعتمد عالمياً، مقاوم للحرارة ومثالي لبيئتنا.',
    
    'services.grid.renovation.icon' => 'pool',
    'services.grid.renovation.title' => 'نوافير وشلالات',
    'services.grid.renovation.description' => 'إضافة لمسة مائية ساحرة تمنح حديقتك لمسة من الهدوء والأناقة.',
    
    'services.grid.insulation.icon' => 'deck',
    'services.grid.insulation.title' => 'مظلات وجلسات',
    'services.grid.insulation.description' => 'تصميم وتنفيذ مساحات مريحة للعائلة بأفضل الخامات وأحدث التصاميم.',
    
    'services.grid.electrical.icon' => 'water_drop',
    'services.grid.electrical.title' => 'شبكات الري',
    'services.grid.electrical.description' => 'أنظمة ري ذكية ومخفية تحافظ على جمال حديقتك بكفاءة عالية.',

    // Details Items (Titles, Descriptions, Features)
    'services.details.maintenance.title' => 'تنسيق الحدائق',
    'services.details.maintenance.description' => 'نقدم خدمات تنسيق شاملة للحدائق السكنية والتجارية، تشمل التصميم والتنفيذ واختيار النباتات المناسبة لضمان استدامة وجمال المساحة الخضراء.',
    'services.details.maintenance.feature1' => 'تصميم هندسي متكامل للحديقة',
    'services.details.maintenance.feature2' => 'اختيار نباتات تتناسب مع البيئة المحلية',
    'services.details.maintenance.feature3' => 'ضمان على الأعمال والمزروعات',
    
    'services.details.caravans.title' => 'تصميم 3D للحدائق',
    'services.details.caravans.description' => 'نصمم حديقتك ثلاثية الأبعاد بأعلى مستويات الدقة، لتتمكن من رؤية النتيجة النهائية بوضوح قبل البدء في التنفيذ وتوفير الوقت والجهد.',
    'services.details.caravans.feature1' => 'تصاميم واقعية قابلة للتعديل',
    'services.details.caravans.feature2' => 'توزيع ذكي للمساحات والإضاءة',
    'services.details.caravans.feature3' => 'مراعاة جميع متطلبات العميل',
    
    'services.details.portacabins.title' => 'العشب الصناعي والطبيعي',
    'services.details.portacabins.description' => 'نوفر حلول العشب السريعة والمستدامة للحدائق والملاعب، مع الالتزام التام بمعايير الجودة العالمية ومقاومة العوامل الجوية.',
    'services.details.portacabins.feature1' => 'تنفيذ ومتابعة هندسية متكاملة',
    'services.details.portacabins.feature2' => 'سرعة في التوريد والتركيب',
    'services.details.portacabins.feature3' => 'مقاومة للعوامل الجوية والحرارة',
    
    'services.details.renovation.title' => 'الشلالات والنوافير',
    'services.details.renovation.description' => 'تصميم وتنفيذ الشلالات والنوافير بأساليب حديثة، نستخدم مواد متطورة ومضخات عالية الجودة لتدوم طويلاً وتزيد من جمال العقار.',
    'services.details.renovation.feature1' => 'تصاميم مائية مبتكرة وعصرية',
    'services.details.renovation.feature2' => 'عزل مائي متطور ومضمون',
    'services.details.renovation.feature3' => 'استخدام أحدث المضخات والإنارة',
    
    'services.details.insulation.title' => 'المظلات والجلسات',
    'services.details.insulation.description' => 'تنفيذ وتركيب مختلف أنواع المظلات والبرجولات والجلسات الخارجية، لحماية من الشمس وإضافة مساحة مريحة للعائلة والضيوف.',
    'services.details.insulation.feature1' => 'تنوع في الخامات والتصاميم',
    'services.details.insulation.feature2' => 'عزل حراري ومائي ممتاز',
    'services.details.insulation.feature3' => 'متانة ومقاومة عالية للرياح',
    
    'services.details.electrical.title' => 'أنظمة شبكات الري',
    'services.details.electrical.description' => 'تصميم وتأسيس شبكات ري حديثة وذكية للحدائق، تعمل أوتوماتيكياً لتوفير استهلاك المياه والحفاظ على النباتات بأفضل حالة.',
    'services.details.electrical.feature1' => 'توزيع ذكي لشبكات الري',
    'services.details.electrical.feature2' => 'أنظمة تحكم آلي متطورة',
    'services.details.electrical.feature3' => 'ترشيد استهلاك المياه بكفاءة',

    // Strength
    'services.strength.title' => 'لماذا نحن الخيار الأمثل؟',
    
    'services.strength.experience.icon' => 'military_tech',
    'services.strength.experience.title' => 'خبرة طويلة',
    'services.strength.experience.description' => 'سنوات من التميز في مجال تنسيق الحدائق وتصميم اللاندسكيب.',
    
    'services.strength.team.icon' => 'groups',
    'services.strength.team.title' => 'فريق متخصص',
    'services.strength.team.description' => 'نخبة من المهندسين والفنيين ذوي الكفاءة العالية.',
    
    'services.strength.speed.icon' => 'timer',
    'services.strength.speed.title' => 'سرعة الإنجاز',
    'services.strength.speed.description' => 'تنفيذ دقيق مع الالتزام التام بالجداول الزمنية المحددة.',
    
    'services.strength.quality.icon' => 'verified',
    'services.strength.quality.title' => 'جودة استثنائية',
    'services.strength.quality.description' => 'نستخدم أفضل المواد والخامات لضمان استدامة وجمال مشاريعنا.',
    
    'services.strength.warranty.icon' => 'gpp_good',
    'services.strength.warranty.title' => 'ضمان شامل',
    'services.strength.warranty.description' => 'نقدم ضمانات حقيقية على جميع أعمالنا لراحتك واطمئنانك.',
    
    'services.strength.support.icon' => 'support_agent',
    'services.strength.support.title' => 'دعم مستمر',
    'services.strength.support.description' => 'خدمة عملاء متميزة ومتابعة دورية بعد تسليم المشروع.',

    // Projects
    'services.projects.badge' => 'سجل أعمالنا',
    'services.projects.title' => 'أحدث المشاريع المنجزة',

    // Testimonials
    'services.testimonials.badge' => 'شركاء النجاح',
    'services.testimonials.title' => 'ثقة تبنى على الإنجازات',
    
    'services.testimonials.item1.text' => 'عمل احترافي وإتقان غير مسبوق في تنفيذ حديقة منزلي. أوصي بهم بشدة.',
    'services.testimonials.item1.name' => 'محمد عبدالله',
    'services.testimonials.item1.company' => 'عميل سابق',
    
    'services.testimonials.item2.text' => 'التزام بالمواعيد وجودة في التشطيب. التصميم 3D كان مطابقاً للواقع.',
    'services.testimonials.item2.name' => 'أحمد خالد',
    'services.testimonials.item2.company' => 'مالك فيلا',
    
    'services.testimonials.item3.text' => 'تجربة ممتازة من البداية للنهاية، الشلال أعطى منظراً رائعاً للواجهة.',
    'services.testimonials.item3.name' => 'سعود الشمري',
    'services.testimonials.item3.company' => 'عميل سابق',

    // CTA
    'services.cta.icon' => 'rocket_launch',
    'services.cta.title' => 'هل لديك مشروع حديقة قادم؟',
    'services.cta.description' => 'نحن هنا لنحول أفكارك وتصوراتك إلى واقع ملموس باحترافية عالية.',
    'services.cta.button_text' => 'اطلب استشارة مجانية الآن',
];

foreach ($servicesContent as $key => $value) {
    Content::updateOrCreate(
        ['key' => $key],
        ['page' => 'الخدمات', 'section' => 'محتوى الصفحة', 'value' => $value, 'type' => 'short_text', 'status' => 'published']
    );
}

echo "Services content updated successfully!\n";
