import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { AnimatedSection } from "../../components/ui/AnimatedSection";

export default function Team() {
  const { t } = useLanguage();
  const team = useQuery(api.team.listVisible);

  const dummyTeam = [
    {
      _id: "dummy1",
      nameEn: "Joon-ho Kim",
      nameAr: "جون هو كيم",
      titleEn: "Master Baker & Founder",
      titleAr: "خبير المخبوزات والمؤسس",
      bioEn: "With over 30 years of experience in Seoul and Paris, Joon-ho brings a unique blend of traditions.",
      photo: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80"
    },
    {
      _id: "dummy2",
      nameEn: "Min-ji Park",
      nameAr: "مين جي بارك",
      titleEn: "Head Pastry Chef",
      titleAr: "رئيسة طهاة المعجنات",
      bioEn: "Specializes in delicate laminations and exquisite flavor profiles inspired by nature.",
      photo: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80"
    },
    {
      _id: "dummy3",
      nameEn: "Ahmed Al-Farsi",
      nameAr: "أحمد الفارسي",
      titleEn: "Artisanal Bread Specialist",
      titleAr: "أخصائي الخبز الحرفي",
      bioEn: "Passionate about sourdough fermentation and local grain sourcing.",
      photo: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80"
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
                <p className="text-[#C9A96E] text-xs font-bold tracking-[0.2em] uppercase mb-4">Our Heritage & Craft</p>
                <h1 className="text-5xl md:text-6xl text-white mb-4 leading-tight" style={{fontFamily: "Cormorant Garamond, serif", fontWeight: 400}}>
                  The Artisans <br />
                  <span className="italic text-white/70 font-light">Behind the Hearth</span>
                </h1>
                <p className="text-white/80 max-w-md text-sm md:text-base leading-relaxed" style={{fontFamily: "Inter, sans-serif"}}>
                  Meet the masters of dough, heat, and heritage. Our team combines decades of Korean tradition with contemporary artisanal techniques.
                </p>
              </div>
              <div className="text-right w-full md:w-1/2 flex flex-col items-end" dir="rtl">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight" style={{fontFamily: "Cairo, serif"}}>فريق العمل</h2>
                <p className="text-white/80 text-sm md:text-base" style={{fontFamily: "Cairo, serif"}}>
                  نخبة من الخبراء في فنون المخبوزات
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16">
        {/* Main Grid */}
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
                    
                    {/* Image Area */}
                    <div className="w-full bg-[#F4F2EB] h-[340px] overflow-hidden relative">
                      <img 
                        src={m.photo} 
                        alt={m.nameEn} 
                        className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 hover:scale-105 transition-all duration-500"
                      />
                    </div>
                    
                    {/* Content Area */}
                    <div className="w-full p-8 flex flex-col flex-grow relative text-center">
                      <h3 className="text-2xl text-[#483420] mb-2" style={{fontFamily: "Cormorant Garamond, serif", fontWeight: 600}}>{m.nameEn}</h3>
                      <p className="text-[17px] text-[#483420] mb-5" dir="rtl" style={{fontFamily: "Cairo, serif", fontWeight: 600}}>{m.nameAr}</p>
                      
                      <p className="text-[#A8884A] text-[0.7rem] font-bold uppercase tracking-[0.2em] mb-4">{m.titleEn}</p>
                      
                      <p className="text-[#7A6A58] text-[15px] leading-relaxed italic" style={{fontFamily: "Cormorant Garamond, serif"}}>"{m.bioEn}"</p>
                    </div>
                  </div>
                </AnimatedSection>
            ))}
          </div>
        )}

        {/* Philosophy Quote Section */}
        <AnimatedSection delay={300} animation="slideUp">
          <div className="mt-16 bg-white py-16 px-8 md:px-16 text-center max-w-4xl mx-auto rounded shadow-sm border border-[#A8884A]/20">
            <div className="text-[#A8884A]/30 text-6xl leading-none mb-4 font-serif">"</div>
            <p className="text-2xl md:text-3xl text-[#483420] leading-relaxed mb-8" style={{fontFamily: "Cormorant Garamond, serif", fontWeight: 500}}>
              "Craft is not a destination, but a state of being. Every member of Arirang Bakery is chosen for their soul as much as their skill."
            </p>
            <div className="gold-divider mx-auto my-6" style={{width: '40px'}} />
            <p className="text-[#A8884A] uppercase tracking-[0.2em] text-[0.7rem] font-bold">
              The Arirang Philosophy
            </p>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}


