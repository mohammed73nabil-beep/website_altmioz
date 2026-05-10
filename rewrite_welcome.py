import sys
import re

sys.stdout = open(sys.stdout.fileno(), mode='w', encoding='utf-8', buffering=1)

with open('resources/js/Pages/Welcome.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

def repl(pattern, replacement):
    global text
    new_text, count = re.subn(pattern, replacement, text, flags=re.DOTALL)
    if count == 0:
        print(f"WARNING: Pattern not found: {pattern}")
    text = new_text

# 1. HERO SECTION
repl(r"home\.hero\.title'\]\s*\|\|\s*'[^']+'", "home.hero.title'] || 'نحوّل مساحتك إلى حديقة فاخرة'")
repl(r"home\.hero\.subtitle'\]\s*\|\|\s*'[^']+'", "home.hero.subtitle'] || 'تصميم وتنسيق حدائق، شلالات، نوافير، وعشب طبيعي وصناعي بأعلى جودة'")
repl(r"home\.hero\.primary_button_text'\]\s*\|\|\s*'[^']+'", "home.hero.primary_button_text'] || 'اطلب تصميم الآن'")
repl(r"home\.hero\.secondary_button_text'\]\s*\|\|\s*'[^']+'", "home.hero.secondary_button_text'] || 'تواصل عبر واتساب'")

# 2. WHY US SECTION
why_features_replacement = """    const whyFeatures = [
        { title: pageContents?.['home.why.features.f1.title'] || 'تنفيذ احترافي وسريع', icon: pageContents?.['home.why.features.f1.icon'] || 'bolt', desc: pageContents?.['home.why.features.f1.text'] || 'ننجز أعمالنا بأقصى سرعة مع الحفاظ على أعلى معايير الجودة والإتقان.' },
        { title: pageContents?.['home.why.features.f2.title'] || 'جودة عالية في التفاصيل', icon: pageContents?.['home.why.features.f2.icon'] || 'diamond', desc: pageContents?.['home.why.features.f2.text'] || 'نعتني بأدق التفاصيل لضمان مخرجات تليق بتطلعات عملائنا ومساحاتهم.' },
        { title: pageContents?.['home.why.features.f3.title'] || 'أسعار مناسبة', icon: pageContents?.['home.why.features.f3.icon'] || 'payments', desc: pageContents?.['home.why.features.f3.text'] || 'نقدم أفضل باقات التسعير التي تجمع بين الجودة العالية والتكلفة المعقولة.' },
        { title: pageContents?.['home.why.features.f4.title'] || 'خبرة حقيقية في اللاندسكيب', icon: pageContents?.['home.why.features.f4.icon'] || 'park', desc: pageContents?.['home.why.features.f4.text'] || 'نمتلك فريق عمل متخصص يمتلك سنوات من الخبرة في تصميم وتنسيق الحدائق.' },
    ];"""
repl(r"const whyFeatures = \[[^\]]+\];", why_features_replacement)

# 3. SERVICES SECTION
services_replacement = """const services = [
        {
            id: 1,
            icon: pageContents?.['home.services.item1.icon'] || 'architecture',
            title: pageContents?.['home.services.item1.title'] || 'تصميم الحدائق',
            desc: pageContents?.['home.services.item1.desc'] || 'نقدم تصاميم لاندسكيب احترافية تجمع بين الجماليات والوظيفية لأي مساحة خارجية.',
            buttonText: pageContents?.['home.services.item1.button'] || 'اطلب الخدمة',
        },
        {
            id: 2,
            icon: pageContents?.['home.services.item2.icon'] || 'park',
            title: pageContents?.['home.services.item2.title'] || 'تنسيق الحدائق',
            desc: pageContents?.['home.services.item2.desc'] || 'نُنفذ حدائق خضراء فاخرة تعكس ذوقك وتُضفي جمالاً طبيعياً على مساحتك.',
            buttonText: pageContents?.['home.services.item2.button'] || 'اطلب الخدمة',
        },
        {
            id: 3,
            icon: pageContents?.['home.services.item3.icon'] || 'grass',
            title: pageContents?.['home.services.item3.title'] || 'العشب الطبيعي والصناعي',
            desc: pageContents?.['home.services.item3.desc'] || 'نوفر وتركيب أجود أنواع العشب الطبيعي والصناعي المقاوم للحرارة والمناسب للبيئة.',
            buttonText: pageContents?.['home.services.item3.button'] || 'اطلب الخدمة',
        },
        {
            id: 4,
            icon: pageContents?.['home.services.item4.icon'] || 'water_drop',
            title: pageContents?.['home.services.item4.title'] || 'الشلالات والنوافير',
            desc: pageContents?.['home.services.item4.desc'] || 'نُنشئ عناصر مائية خلابة من شلالات ونوافير تضيف الحيوية والأناقة لحديقتك.',
            buttonText: pageContents?.['home.services.item4.button'] || 'اطلب الخدمة',
        },
        {
            id: 5,
            icon: pageContents?.['home.services.item5.icon'] || 'wb_sunny',
            title: pageContents?.['home.services.item5.title'] || 'الإضاءة الخارجية',
            desc: pageContents?.['home.services.item5.desc'] || 'أنظمة إضاءة حديقة ذكية وأنيقة تُبرز جمال مساحتك الخضراء ليلاً.',
            buttonText: pageContents?.['home.services.item5.button'] || 'اطلب الخدمة',
        }
    ];"""
repl(r"const services = \[[^\]]+\];", services_replacement)

# 4. PROJECTS SECTION
repl(r"home\.projects\.badge'\]\s*\|\|\s*'[^']+'", "home.projects.badge'] || 'مشاريعنا في اللاندسكيب'")
repl(r"home\.projects\.title'\]\s*\|\|\s*'[^']+'", "home.projects.title'] || 'شاهد التحولات المذهلة قبل وبعد'")

# 5. TESTIMONIALS SECTION (Make sure they are landscaping focused)
testimonial_1 = "كان تنسيق الحدائق وتركيب العشب الصناعي للمشروع مبهراً للغاية. جودة المواد المستخدمة ودقة التنفيذ تعكس احترافية عالية جداً."
testimonial_2 = "شلالات المياه والنوافير أضافت لمسة من الهدوء والرقي للمنزل. فريق العمل كان متعاوناً ومبدعاً في طرح الأفكار وتنفيذها."
testimonial_3 = "تم تحويل حديقة منزلي إلى مساحة خضراء خلابة مع إضاءة خارجية رائعة. شكراً لـ حديقتي لاندسكيب على هذا الإبداع والالتزام."

repl(r"home\.testimonials\.item1\.text'\]\s*\|\|\s*'[^']+'", f"home.testimonials.item1.text'] || '{testimonial_1}'")
repl(r"home\.testimonials\.item2\.text'\]\s*\|\|\s*'[^']+'", f"home.testimonials.item2.text'] || '{testimonial_2}'")
repl(r"home\.testimonials\.item3\.text'\]\s*\|\|\s*'[^']+'", f"home.testimonials.item3.text'] || '{testimonial_3}'")

# 6. CTA SECTION
repl(r"home\.cta\.title'\]\s*\|\|\s*'[^']+'", "home.cta.title'] || 'ابدأ تصميم حديقتك الآن'")
repl(r"home\.cta\.description'\]\s*\|\|\s*'[^']+'", "home.cta.description'] || 'تواصل معنا واحصل على استشارة مجانية'")
repl(r"home\.cta\.button_text'\]\s*\|\|\s*'[^']+'", "home.cta.button_text'] || 'تواصل معنا الآن'")

# 7. SEO OPTIMIZATION
repl(r"seoTitle.*?\? `.*?`\s*: '[^']+';", "seoTitle = pageContents?.['home.hero.title']\n        ? `حديقتي لاندسكيب | ${pageContents['home.hero.title']}`\n        : 'حديقتي لاندسكيب | تصميم وتنسيق حدائق';")

# 8. SERVICES BADGE
repl(r"home\.services\.badge'\]\s*\|\|\s*'[^']+'", "home.services.badge'] || 'خدمات اللاندسكيب'")
repl(r"home\.services\.title'\]\s*\|\|\s*'[^']+'", "home.services.title'] || 'خدماتنا في تصميم وتنسيق الحدائق'")


with open('resources/js/Pages/Welcome.jsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Replacements complete.")
