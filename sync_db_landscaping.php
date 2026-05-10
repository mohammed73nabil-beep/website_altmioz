<?php

use App\Models\Content;
use Illuminate\Support\Facades\DB;

// 1. Delete old irrelevant pages
$oldPages = [
    'صيانة البركسات',
    'صيانة الكرفانات',
    'صيانة المباني',
];

Content::whereIn('page', $oldPages)->delete();

// 2. Update homepage keys to match landscaping brand
// mapping old keys to new keys if possible, or just cleaning up
$homeContent = [
    // Hero
    'home.hero.title' => 'نحوّل مساحتك إلى حديقة فاخرة',
    'home.hero.subtitle' => 'تصميم وتنسيق حدائق، شلالات، نوافير، وعشب طبيعي وصناعي بأعلى جودة',
    'home.hero.primary_button_text' => 'اطلب تصميم الآن',
    'home.hero.secondary_button_text' => 'تواصل عبر واتساب',
    
    // Services Section Headings
    'home.services.badge' => 'خدماتنا',
    'home.services.title' => 'إبداع في كل مساحة',
    
    // Why Us
    'home.why.title' => 'جودة عالمية بأيدي وطنية',
    'home.why.description' => 'نعتمد على أحدث التقنيات وأفضل الكفاءات لضمان تنفيذ مشروعك بأعلى المعايير.',
    
    // CTA
    'home.cta.title' => 'ابدأ تصميم حديقتك الآن',
    'home.cta.description' => 'تواصل معنا واحصل على استشارة مجانية',
];

foreach ($homeContent as $key => $value) {
    Content::where('key', $key)->update(['value' => $value]);
}

// 3. Handle Service Items in Homepage
// We need to migrate home.services.maintenance.* to home.services.item1.* etc.
$serviceMapping = [
    'maintenance' => 'item1',
    'caravans' => 'item2',
    'portacabins' => 'item3',
    'renovation' => 'item4',
    'insulation' => 'item5',
    'electrical' => 'item6',
];

foreach ($serviceMapping as $old => $new) {
    Content::where('key', "home.services.{$old}.title")->update(['key' => "home.services.{$new}.title"]);
    Content::where('key', "home.services.{$old}.description")->update(['key' => "home.services.{$new}.desc"]);
    Content::where('key', "home.services.{$old}.button_text")->update(['key' => "home.services.{$new}.button"]);
}

// 4. Update the actual values for these items to match landscaping
$newServiceValues = [
    'home.services.item1.title' => 'تصميم الحدائق',
    'home.services.item1.desc' => 'تصاميم لاندسكيب مبتكرة تجمع بين الجمال والوظيفة.',
    'home.services.item2.title' => 'تنسيق الحدائق',
    'home.services.item2.desc' => 'تحويل المساحات إلى واحات خضراء تعكس ذوقك.',
    'home.services.item3.title' => 'العشب الطبيعي والصناعي',
    'home.services.item3.desc' => 'أجود أنواع العشب المقاوم للحرارة والمثالي لبيئتنا.',
    'home.services.item4.title' => 'الشلالات والنوافير',
    'home.services.item4.desc' => 'عناصر مائية تمنح حديقتك لمسة من الهدوء والأناقة.',
    'home.services.item5.title' => 'الإضاءة الخارجية',
    'home.services.item5.desc' => 'أنظمة إضاءة ذكية تبرز جمال حديقتك في الليل.',
];

foreach ($newServiceValues as $key => $value) {
    Content::updateOrCreate(
        ['key' => $key],
        ['page' => 'الرئيسية', 'section' => 'الخدمات', 'value' => $value, 'type' => 'short_text', 'status' => 'published']
    );
}

// 5. Update Why Us features
$whyMapping = [
    'warranty' => 'warranty',
    'support' => 'support',
    'pricing' => 'pricing',
    'team' => 'f4',
];

foreach ($whyMapping as $old => $new) {
    // If team exists, change it to f4
    if ($old === 'team') {
        Content::where('key', "home.why.features.team.title")->update(['key' => "home.why.features.f4.title"]);
        Content::where('key', "home.why.features.team.text")->update(['key' => "home.why.features.f4.text"]);
    }
}

$newWhyValues = [
    'home.why.features.warranty.title' => 'سرعة واحترافية',
    'home.why.features.warranty.text' => 'تنفيذ دقيق مع الالتزام التام بالجداول الزمنية.',
    'home.why.features.support.title' => 'إتقان التفاصيل',
    'home.why.features.support.text' => 'جودة استثنائية في كل ركن من أركان مشروعك.',
    'home.why.features.pricing.title' => 'أسعار تنافسية',
    'home.why.features.pricing.text' => 'أفضل قيمة مقابل جودة هندسية لا تضاهى.',
    'home.why.features.f4.title' => 'فريق خبير',
    'home.why.features.f4.text' => 'نخبة من المهندسين بخبرة تزيد عن 10 سنوات.',
];

foreach ($newWhyValues as $key => $value) {
    Content::updateOrCreate(
        ['key' => $key],
        ['page' => 'الرئيسية', 'section' => 'لماذا نحن؟', 'value' => $value, 'type' => 'short_text', 'status' => 'published']
    );
}

// 6. Ensure the new service pages exist in the list
$pagesToEnsure = [
    'تنسيق الحدائق',
    'تصميم الحدائق',
    'العشب الصناعي',
];

foreach ($pagesToEnsure as $page) {
    if (Content::where('page', $page)->count() === 0) {
        Content::create([
            'page' => $page,
            'section' => 'عام',
            'key' => "page.".\Illuminate\Support\Str::slug($page).".placeholder",
            'type' => 'short_text',
            'value' => "محتوى صفحة {$page}",
            'status' => 'published'
        ]);
    }
}

echo "Database cleaned and synced with Landscaping brand.";
