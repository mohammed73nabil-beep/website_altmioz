$keys = [
    ['page' => 'تنسيق الحدائق', 'section' => 'خلفيات الصور', 'key' => 'services.landscaping.hero.image', 'type' => 'image', 'value' => ''],
    ['page' => 'تنسيق الحدائق', 'section' => 'خلفيات الصور', 'key' => 'services.landscaping.why.image', 'type' => 'image', 'value' => ''],
    ['page' => 'تصميم الحدائق', 'section' => 'خلفيات الصور', 'key' => 'services.design.hero.image', 'type' => 'image', 'value' => ''],
    ['page' => 'تصميم الحدائق', 'section' => 'خلفيات الصور', 'key' => 'services.design.why.image', 'type' => 'image', 'value' => ''],
    ['page' => 'العشب الصناعي', 'section' => 'خلفيات الصور', 'key' => 'services.artificial_grass.hero.image', 'type' => 'image', 'value' => ''],
    ['page' => 'العشب الصناعي', 'section' => 'خلفيات الصور', 'key' => 'services.artificial_grass.why.image', 'type' => 'image', 'value' => ''],
];

foreach ($keys as $k) {
    App\Models\Content::firstOrCreate(['key' => $k['key']], $k);
}
echo "Done\n";
