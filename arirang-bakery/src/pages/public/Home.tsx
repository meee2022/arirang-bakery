import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { AnimatedSection } from "../../components/ui/AnimatedSection";
import { Award, Leaf, Star, Heart, ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";

export default function Home() {
  const { t, lang } = useLanguage();

  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden burgundy-bg">
        {/* Mobile Video Background (visible only on mobile/tablet) */}
        <div className="absolute inset-0 z-0 lg:hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay absolute inset-0 opacity-80" />
        </div>

        {/* Desktop Background (Solid/Pattern) */}
        <div className="hidden lg:block absolute inset-0 z-0">
          <div className="absolute inset-0 pattern-bg opacity-30" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            
            {/* Text Content */}
            <div className="text-center lg:text-start text-white">
              <AnimatedSection animation="fade" delay={100}>
                <p className="section-eyebrow mb-4 text-[#C9A96E]">
                  {lang === 'ar' ? 'مخبز فاخر | Premium Bakery' : 'Premium Bakery'}
                </p>
              </AnimatedSection>
              <AnimatedSection animation="slideUp" delay={200}>
                <h1 className="text-5xl md:text-7xl font-bold mb-2 leading-tight" style={{fontFamily: lang === 'ar' ? "Cairo,serif" : "Cormorant Garamond,serif"}}>
                  {lang === 'ar' ? 'اريرانج بيكري' : 'Arirang Bakery'}
                </h1>
              </AnimatedSection>
              <AnimatedSection animation="slideUp" delay={350}>
                <p className="text-2xl md:text-3xl font-light mb-1 tracking-widest gold-text" style={{fontFamily: "Cormorant Garamond,serif"}}>
                  {lang === 'ar' ? 'Arirang Bakery' : 'Artisan Bakery'}
                </p>
              </AnimatedSection>
              <AnimatedSection animation="slideUp" delay={500}>
                <p className="text-lg md:text-xl text-white/85 mt-6 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed" style={{fontFamily:"Cairo,Inter,serif"}}>
                  {t("heroSub")}
                </p>
              </AnimatedSection>
              <AnimatedSection animation="slideUp" delay={650}>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link to="/products" className="btn-gold text-base px-8 py-3.5 rounded-xl">
                    {t("heroBtn1")}
                  </Link>
                  <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-[#6B1A2A] text-base px-8 py-3.5 rounded-xl">
                    {t("heroBtn2")}
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            {/* Video Content for Desktop */}
            <div className="hidden lg:flex justify-center items-center relative">
               {/* Decorative background glow */}
               <div className="absolute inset-0 bg-[#C9A96E] rounded-full blur-[80px] opacity-20 transform translate-x-4 -translate-y-4"></div>
               <AnimatedSection animation="scaleIn" delay={300}>
                 <div className="relative w-[300px] xl:w-[340px] aspect-[9/16] rounded-[2.5rem] overflow-hidden border border-[#C9A96E]/40 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transform hover:scale-[1.02] transition-transform duration-700 group">
                   <video
                     autoPlay
                     loop
                     muted
                     playsInline
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   >
                     <source src="/hero.mp4" type="video/mp4" />
                   </video>
                 </div>
               </AnimatedSection>
            </div>

          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 animate-bounce z-20">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="section-py bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation={lang === "ar" ? "slideLeft" : "slideRight"}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=700&q=80"
                  alt="Bakery"
                  className="rounded-2xl w-full h-96 object-cover shadow-2xl"
                />
                <div className="absolute -bottom-6 -end-6 bg-gradient-to-br from-[#6B1A2A] to-[#4A0F1B] rounded-2xl p-6 text-white text-center shadow-xl">
                  <div className="text-3xl font-bold gold-text">20+</div>
                  <div className="text-sm text-white/80 mt-1" style={{fontFamily:"Cairo,Inter,serif"}}>
                    {lang === "ar" ? "سنوات خبرة" : "Years Experience"}
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation={lang === "ar" ? "slideRight" : "slideLeft"}>
              <div>
                <SectionTitle
                  eyebrow={lang === "ar" ? "قصتنا" : "Our Story"}
                  titleKey="brandStory"
                  center={false}
                />
                <p className="text-[#7A6A58] leading-relaxed mb-8" style={{fontFamily:"Cairo,Inter,serif"}}>
                  {t("brandStoryText")}
                </p>
                <Link to="/about" className="btn-primary inline-flex items-center gap-2">
                  {t("learnMore")}
                  <Arrow size={18} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-py secondary-bg pattern-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <AnimatedSection>
            <SectionTitle titleKey="whyChooseUs" subtitleKey="whyChooseUsSub" />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, key: "quality", subKey: "qualitySub", color: "from-[#6B1A2A] to-[#8B2A3D]" },
              { icon: Leaf, key: "freshness", subKey: "freshnessSub", color: "from-[#C9A96E] to-[#A8884A]" },
              { icon: Star, key: "heritage", subKey: "heritageSub", color: "from-[#6B1A2A] to-[#4A0F1B]" },
              { icon: Heart, key: "service", subKey: "serviceSub", color: "from-[#A8884A] to-[#C9A96E]" },
            ].map(({ icon: Icon, key, subKey, color }, i) => (
              <AnimatedSection key={key} delay={i * 120} animation="slideUp">
                <div className="premium-card p-7 text-center h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                    <Icon size={26} className="text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-[#1C1008] mb-2" style={{fontFamily:"Cairo,serif"}}>{t(key)}</h3>
                  <p className="text-[#7A6A58] text-sm leading-relaxed" style={{fontFamily:"Cairo,Inter,serif"}}>{t(subKey)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CORPORATE CTA */}
      <section className="burgundy-bg pattern-bg py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <AnimatedSection>
            <p className="section-eyebrow mb-4">{lang === "ar" ? "خدمات مميزة" : "Premium Services"}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{fontFamily:"Cairo,serif"}}>{t("corporateCta")}</h2>
            <div className="gold-divider mx-auto mb-6" />
            <p className="text-white/80 text-lg mb-10 leading-relaxed" style={{fontFamily:"Cairo,Inter,serif"}}>{t("corporateCtaSub")}</p>
            <Link to="/corporate" className="btn-gold text-base px-10 py-4 rounded-xl">
              {t("corporateCtaBtn")}
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="section-py bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <SectionTitle
              eyebrow={lang === "ar" ? "تواصل معنا" : "Get In Touch"}
              title={lang === "ar" ? "هل لديك سؤال أو طلب خاص؟" : "Have a question or special request?"}
              subtitle={lang === "ar" ? "فريقنا جاهز لمساعدتك في أي وقت" : "Our team is ready to assist you at any time"}
            />
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-base px-10 py-4">
              {t("contact")} <Arrow size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

