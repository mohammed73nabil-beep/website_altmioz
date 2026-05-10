$items = App\Models\Content::whereIn('key', [
    'services.landscaping.hero.image',
    'services.landscaping.why.image',
    'services.design.hero.image',
    'services.design.why.image',
    'services.artificial_grass.hero.image',
    'services.artificial_grass.why.image',
])->get(['id','page','section','key']);
foreach($items as $i) {
    echo $i->id . ' | [page:' . $i->page . '] | [section:' . $i->section . '] | ' . $i->key . "\n";
}
