import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { AnimatedSection } from "../../components/ui/AnimatedSection";

export default function Team() {
  const { t, lang } = useLanguage();
  const team = useQuery(api.team.listVisible);

  const dummyTeam = [
    {
      _id: "dummy1",
      nameEn: "Ahmad Al-Shammari",
      nameAr: "أحمد الشمري",
      titleEn: "CEO & Founder",
      titleAr: "الرئيس التنفيذي والمؤسس",
      bioEn: "Founder of Arirang Bakery with over 20 years in premium bakery and food industry across the Gulf region.",
      bioAr: "مؤسس اريرانج بيكري بخبرة تتجاوز 20 عامًا في صناعة المخابز والأغذية الفاخرة في منطقة الخليج.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
    },
    {
      _id: "dummy2",
      nameEn: "Fatima Al-Ali",
      nameAr: "فاطمة العلي",
      titleEn: "Head of Products",
      titleAr: "رئيسة قسم المنتجات",
      bioEn: "Expert in fine pastry and luxury confectionery, trained at top European institutes.",
      bioAr: "خبيرة في فنون المعجنات والحلويات الفاخرة، درست في أفضل المعاهد الأوروبية.",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"
    },
    {
      _id: "dummy3",
      nameEn: "Mohammed Al-Qahtani",
      nameAr: "محمد القحطاني",
      titleEn: "Operations Manager",
      titleAr: "مدير العمليات",
      bioEn: "Oversees daily operations and ensures the highest quality standards across all branches.",
      bioAr: "يشرف على سير العمليات اليومية ويضمن أعلى معايير الجودة في جميع الفروع.",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80"
    }
  ];

  const displayTeam = team && team.length > 0 ? team : dummyTeam;

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24">
      {/* Header Section */}
      <div className="burgundy-bg pattern-bg pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-8">
              <div className="text-left w-full md:w-1/2">
                <p className="text-[#C9A96E] text-xs font-bold tracking-[0.2em] uppercase mb-4">
                  {lang === "ar" ? "تراثنا وحرفتنا" : "Our Heritage & Craft"}
                </p>
                <h1 className="text-5xl md:text-6xl text-white mb-4 leading-tight" style={{fontFamily: "Cormorant Garamond, serif", fontWeight: 400}}>
                  {lang === "ar" ? "الحرفيون" : "The Artisans"} <br />
                  <span className="italic text-white/70 font-light">
                    {lang === "ar" ? "خلف الموقد" : "Behind the Hearth"}
                  </span>
                </h1>
                <p className="text-white/80 max-w-md text-sm md:text-base leading-relaxed" style={{fontFamily: lang === "ar" ? "Cairo, serif" : "Inter, sans-serif"}}>
                  {lang === "ar"
                    ? "فريق من أمهر الخبراء في فنون المخبوزات الفاخرة، يجمعون بين التراث الأصيل والتقنيات الحديثة."
                    : "A team of skilled experts in premium baking, combining authentic heritage with modern techniques."}
                </p>
              </div>
              <div className="text-right w-full md:w-1/2 flex flex-col items-end" dir="rtl">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight" style={{fontFamily: "Cairo, serif"}}>
                  فريق العمل
                </h2>
                <p className="text-white/80 text-sm md:text-base" style={{fontFamily: "Cairo, serif"}}>
                  نخبة من الخبراء في فنون المخبوزات
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16">
        {!displayTeam ? (
          <div className="text-center py-20 text-[#7A6A58]">{t("loading")}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTeam.map((m, i) => (
              <AnimatedSection
                key={m._id}
                delay={(i % 4) * 100}
                animation="slideUp"
                className="col-span-1 w-full h-full"
              >
                <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-full border border-[#A8884A]/20 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
                  <div className="w-full bg-[#F4F2EB] h-[300px] overflow-hidden relative">
                    <img
                      src={m.photo}
                      alt={lang === "ar" ? m.nameAr : m.nameEn}
                      className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="w-full p-7 flex flex-col flex-grow text-center">
                    <h3 className="text-xl text-[#483420] mb-1" style={{fontFamily: "Cormorant Garamond, serif", fontWeight: 600}}>
                      {m.nameEn}
                    </h3>
                    <p className="text-base text-[#483420] mb-1" dir="rtl" style={{fontFamily: "Cairo, serif", fontWeight: 600}}>
                      {m.nameAr}
                    </p>
                    <p className="text-[#A8884A] text-[0.7rem] font-bold uppercase tracking-[0.15em] mb-4">
                      {lang === "ar" ? m.titleAr : m.titleEn}
                    </p>
                    <p className="text-[#7A6A58] text-sm leading-relaxed" style={{fontFamily: lang === "ar" ? "Cairo, serif" : "Cormorant Garamond, serif"}}>
                      {lang === "ar" ? `"${m.bioAr}"` : `"${m.bioEn}"`}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}

        {/* Philosophy Quote */}
        <AnimatedSection delay={300} animation="slideUp">
          <div className="mt-16 bg-white py-14 px-8 md:px-16 text-center max-w-4xl mx-auto rounded shadow-sm border border-[#A8884A]/20">
            <div className="text-[#A8884A]/30 text-6xl leading-none mb-4 font-serif">"</div>
            <p className="text-xl md:text-2xl text-[#483420] leading-relaxed mb-4" style={{fontFamily: "Cairo, serif", fontWeight: 500}}>
              {lang === "ar"
                ? "الحرف ليست وجهة، بل حالة وجود. كل عضو في فريق اريرانج بيكري مختار بشغفه بقدر مهارته."
                : "Craft is not a destination, but a state of being. Every member of Arirang Bakery is chosen for their passion as much as their skill."}
            </p>
            <div className="gold-divider mx-auto my-5" style={{width: "40px"}} />
            <p className="text-[#A8884A] uppercase tracking-[0.2em] text-[0.7rem] font-bold">
              {lang === "ar" ? "فلسفة اريرانج" : "The Arirang Philosophy"}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
