// Give descriptive Arabic section names
$sectionNames = [
    'services.landscaping.hero.image'      => 'الهيدر - الصورة الرئيسية',
    'services.landscaping.why.image'       => 'قسم لماذا نحن - الصورة الجانبية',
    'services.design.hero.image'           => 'الهيدر - الصورة الرئيسية',
    'services.design.why.image'            => 'قسم لماذا نحن - الصورة الجانبية',
    'services.artificial_grass.hero.image' => 'الهيدر - الصورة الرئيسية',
    'services.artificial_grass.why.image'  => 'قسم لماذا نحن - الصورة الجانبية',
];

foreach ($sectionNames as $key => $section) {
    $updated = App\Models\Content::where('key', $key)->update(['section' => $section]);
    echo "Section '$key': $updated rows\n";
}
