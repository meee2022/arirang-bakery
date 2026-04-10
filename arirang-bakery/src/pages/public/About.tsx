import { useLanguage } from "../../contexts/LanguageContext";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { AnimatedSection } from "../../components/ui/AnimatedSection";
import { Award, Heart, Star, Shield } from "lucide-react";

const timeline = [
  { year: "2004", ar: "تأسيس اريرانج بيكري", en: "Arirang Bakery founded" },
  { year: "2008", ar: "افتتاح الفرع الثاني في جدة", en: "Second branch opened in Jeddah" },
  { year: "2013", ar: "جائزة أفضل مخبز في المنطقة", en: "Best Bakery Award in the region" },
  { year: "2018", ar: "توسع إلى الدمام وشرق المملكة", en: "Expansion to Dammam and Eastern Region" },
  { year: "2024", ar: "إطلاق الهوية الجديدة والمنتجات الفاخرة", en: "Launch of new identity and premium products" },
];

export default function About() {
  const { t, lang } = useLanguage();
  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-16 burgundy-bg pattern-bg text-white text-center">
        <AnimatedSection>
          <p className="section-eyebrow mb-3">{lang === "ar" ? "تعرف علينا" : "Who We Are"}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{fontFamily:"Cairo,serif"}}>{t("aboutTitle")}</h1>
          <div className="gold-divider mx-auto" />
          <p className="text-white/80 mt-4 max-w-xl mx-auto" style={{fontFamily:"Cairo,Inter,serif"}}>{t("aboutSub")}</p>
        </AnimatedSection>
      </section>

      {/* Intro */}
      <section className="section-py bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <AnimatedSection animation={lang === "ar" ? "slideLeft" : "slideRight"}>
              <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&q=80" alt="Bakery" className="rounded-2xl w-full h-[420px] object-cover shadow-2xl" />
            </AnimatedSection>
            <AnimatedSection animation={lang === "ar" ? "slideRight" : "slideLeft"}>
              <SectionTitle eyebrow={lang === "ar" ? "قصتنا" : "Our Story"} title={lang === "ar" ? "رحلة من الشغف نحو التميز" : "A Journey of Passion Toward Excellence"} center={false} />
              <p className="text-[#7A6A58] leading-relaxed mb-6" style={{fontFamily:"Cairo,Inter,serif"}}>
                {lang === "ar"
                  ? "انطلقت اريرانج بيكري في عام 2004 بحلم بسيط: تقديم أجود المخبوزات الفاخرة بأصالة عربية وبلمسة عالمية. على مدار أكثر من عشرين عامًا، بنينا ثقة العملاء كلقمة بكلقمة، وتوسعنا لنخدم محبي الجودة في أرجاء المملكة."
                  : "Arirang Bakery started in 2004 with a simple dream: to offer the finest premium baked goods with Arabian authenticity and a global touch. Over more than twenty years, we have built customer trust bite by bite, expanding to serve quality lovers across the Kingdom."}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[{v:"20+", l: lang === "ar" ? "سنة خبرة" : "Years Experience"}, {v:"3", l: lang === "ar" ? "فروع نشطة" : "Active Branches"}, {v:"50+", l: lang === "ar" ? "منتج فاخر" : "Premium Products"}, {v:"10K+", l: lang === "ar" ? "عميل راضٍ" : "Happy Clients"}].map(i => (
                  <div key={i.l} className="bg-[#F5EDD8] rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-[#6B1A2A]">{i.v}</div>
                    <div className="text-sm text-[#7A6A58] mt-1" style={{fontFamily:"Cairo,Inter,serif"}}>{i.l}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-py secondary-bg pattern-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <AnimatedSection>
            <SectionTitle title={lang === "ar" ? "رسالتنا ورؤيتنا" : "Mission & Vision"} />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[{icon: Heart, titleAr: "رسالتنا", titleEn: "Our Mission", textAr: "تقديم منتجات مخبوزة فاخرة بأعلى معايير الجودة والطزاجة، مع الحفاظ على تراثنا الأصيل وإسعاد عملائنا في كل لقمة.", textEn: "To deliver premium baked products with the highest quality and freshness standards, preserving our authentic heritage and delighting our clients with every bite."}, {icon: Star, titleAr: "رؤيتنا", titleEn: "Our Vision", textAr: "أن نكون العلامة التجارية الأولى للمخابز الفاخرة في المنطقة، ونموذجًا يُحتذى به في الجودة والابتكار والخدمة.", textEn: "To become the leading premium bakery brand in the region, a model of quality, innovation, and service excellence."}].map(({icon: Icon, titleAr, titleEn, textAr, textEn}, i) => (
              <AnimatedSection key={titleEn} delay={i * 150} animation="slideUp">
                <div className="premium-card p-8 h-full">
                  <div className="w-14 h-14 rounded-2xl burgundy-bg flex items-center justify-center mb-5 shadow-lg">
                    <Icon size={26} className="text-[#C9A96E]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1C1008] mb-4" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? titleAr : titleEn}</h3>
                  <p className="text-[#7A6A58] leading-relaxed" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? textAr : textEn}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="section-py bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <AnimatedSection animation={lang === "ar" ? "slideRight" : "slideLeft"}>
              <SectionTitle eyebrow={lang === "ar" ? "معاييرنا" : "Our Standards"} titleKey="qualityCommitment" center={false} />
              <p className="text-[#7A6A58] leading-relaxed mb-8" style={{fontFamily:"Cairo,Inter,serif"}}>{t("qualityCommitmentText")}</p>
              <div className="space-y-4">
                {[{icon: Shield, ar: "شهادات جودة معتمدة", en: "Certified quality standards"}, {icon: Award, ar: "مكونات طبيعية 100%", en: "100% natural ingredients"}, {icon: Star, ar: "خبز يومي طازج", en: "Fresh daily baking"}].map(({icon: Icon, ar, en}) => (
                  <div key={en} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F5EDD8] flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-[#6B1A2A]" />
                    </div>
                    <span className="text-[#1C1008] font-medium" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? ar : en}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection animation={lang === "ar" ? "slideLeft" : "slideRight"}>
              <img src="https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=700&q=80" alt="Quality" className="rounded-2xl w-full h-[380px] object-cover shadow-2xl" />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-py burgundy-bg pattern-bg">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <AnimatedSection>
            <SectionTitle title={lang === "ar" ? "رحلتنا عبر السنوات" : "Our Journey Through the Years"} light />
          </AnimatedSection>
          <div className="relative">
            <div className="absolute start-6 top-0 bottom-0 w-0.5 bg-[#C9A96E]/30" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <AnimatedSection key={item.year} delay={i * 120} animation="slideUp">
                  <div className="flex items-start gap-6 ps-16 relative">
                    <div className="absolute start-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#A8884A] flex items-center justify-center text-white font-bold text-xs shadow-lg">
                      {item.year.slice(-2)}
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 flex-1">
                      <div className="text-[#C9A96E] font-bold text-sm mb-1">{item.year}</div>
                      <p className="text-white font-medium" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? item.ar : item.en}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
