<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;

/**
 * SitemapController
 *
 * يُولِّد ملف sitemap.xml ديناميكياً يشمل:
 * - الصفحات الثابتة (الرئيسية، الخدمات، من نحن، تواصل)
 * - صفحات الخدمات الفردية
 * - مشاريعنا (ديناميكي من قاعدة البيانات)
 * - مقالات المدونة (ديناميكي من قاعدة البيانات)
 */
class SitemapController extends Controller
{
    public function index(): Response
    {
        $sitemapXml = Cache::remember('sitemap_xml', 3600, function () {
            $baseUrl = rtrim(config('app.url'), '/');
            $now = now()->toAtomString();

            // ——— الصفحات الثابتة ———
            $staticPages = [
                ['url' => $baseUrl . '/', 'priority' => '1.0', 'changefreq' => 'weekly', 'lastmod' => $now],
                ['url' => $baseUrl . '/services', 'priority' => '0.9', 'changefreq' => 'monthly', 'lastmod' => $now],
                ['url' => $baseUrl . '/about-us', 'priority' => '0.7', 'changefreq' => 'monthly', 'lastmod' => $now],
                ['url' => $baseUrl . '/contact-us', 'priority' => '0.8', 'changefreq' => 'monthly', 'lastmod' => $now],
                ['url' => $baseUrl . '/our-projects', 'priority' => '0.8', 'changefreq' => 'weekly', 'lastmod' => $now],
                ['url' => $baseUrl . '/blog', 'priority' => '0.7', 'changefreq' => 'weekly', 'lastmod' => $now],
            ];

            // ——— صفحات الخدمات الديناميكية ———
            $servicesList = config('services_list') ?? [];
            foreach (array_keys($servicesList) as $serviceSlug) {
                $staticPages[] = [
                    'url' => $baseUrl . '/services/' . $serviceSlug,
                    'priority' => '0.8',
                    'changefreq' => 'monthly',
                    'lastmod' => $now
                ];
            }

            // ——— المشاريع الديناميكية ———
            $projects = Project::select('id', 'updated_at')->latest()->get();

            // ——— مقالات المدونة الديناميكية ———
            $posts = Post::select('slug', 'updated_at')
                ->where('is_published', true)
                ->latest('updated_at')
                ->get();

            // ——— بناء XML ———
            $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
            $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' . "\n";
            $xml .= '        xmlns:xhtml="http://www.w3.org/1999/xhtml">' . "\n";

            foreach ($staticPages as $page) {
                $xml .= "  <url>\n";
                $xml .= "    <loc>{$page['url']}</loc>\n";
                $xml .= "    <lastmod>{$page['lastmod']}</lastmod>\n";
                $xml .= "    <changefreq>{$page['changefreq']}</changefreq>\n";
                $xml .= "    <priority>{$page['priority']}</priority>\n";
                $xml .= "  </url>\n";
            }

            foreach ($projects as $project) {
                $url = $baseUrl . '/our-projects/' . $project->id;
                $lastmod = $project->updated_at?->toAtomString() ?? $now;
                $xml .= "  <url>\n";
                $xml .= "    <loc>{$url}</loc>\n";
                $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
                $xml .= "    <changefreq>monthly</changefreq>\n";
                $xml .= "    <priority>0.6</priority>\n";
                $xml .= "  </url>\n";
            }

            foreach ($posts as $post) {
                $url = $baseUrl . '/blog/' . $post->slug;
                $lastmod = $post->updated_at?->toAtomString() ?? $now;
                $xml .= "  <url>\n";
                $xml .= "    <loc>{$url}</loc>\n";
                $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
                $xml .= "    <changefreq>monthly</changefreq>\n";
                $xml .= "    <priority>0.6</priority>\n";
                $xml .= "  </url>\n";
            }

            $xml .= '</urlset>';

            return $xml;
        });

        return response($sitemapXml, 200, [
            'Content-Type' => 'application/xml; charset=UTF-8',
        ]);
    }
}
