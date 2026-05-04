import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { AnimatedSection } from "../../components/ui/AnimatedSection";
import { ArrowLeft, ArrowRight, Award, Mail, Globe } from "lucide-react";

function parseBio(bioStr: string) {
  try {
    const data = JSON.parse(bioStr);
    if (data && typeof data === 'object' && data.text !== undefined) return data;
  } catch (e) {}
  return { text: bioStr, quote: "", exp: "", spec: "", ach: "", email: "", ig: "" };
}

export default function TeamMemberProfile() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const team = useQuery(api.team.listVisible);

  const dummyTeam = [
    {
      _id: "dummy1",
      nameEn: "Joon-ho Kim",
      nameAr: "جون هو كيم",
      titleEn: "Master Baker & Founder",
      titleAr: "خبير المخبوزات والمؤسس",
      bioEn: "With over 30 years of experience in Seoul and Paris, Joon-ho brings a unique blend of traditions.",
      bioAr: "بخبرة تزيد عن ٣٠ عاماً في سيول وباريس، يدمج جون بين التقاليد العريقة والأساليب الحديثة لخلق تجربة فريدة في كل وصفة.",
      photo: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80"
    },
    {
      _id: "dummy2",
      nameEn: "Min-ji Park",
      nameAr: "مين جي بارك",
      titleEn: "Head Pastry Chef",
      titleAr: "رئيسة طهاة المعجنات",
      bioEn: "Specializes in delicate laminations and exquisite flavor profiles inspired by nature.",
      bioAr: "تتخصص في رقائق العجين الرقيقة وتجسيد النكهات المستوحاة من الطبيعة الكورية بأدق تفاصيلها.",
      photo: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80"
    },
    {
      _id: "dummy3",
      nameEn: "Ahmed Al-Farsi",
      nameAr: "أحمد الفارسي",
      titleEn: "Artisanal Bread Specialist",
      titleAr: "أخصائي الخبز الحرفي",
      bioEn: "Passionate about sourdough fermentation and local grain sourcing.",
      bioAr: "شغوف بتخمير العجين الحامض والبحث عن أفضل الحبوب المحلية لتقديم خبز صحي ولذيذ.",
      photo: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80"
    }
  ];

  const sourceData = team && team.length > 0 ? team : dummyTeam;
  const member = sourceData.find(m => m._id === id) as any;

  if (!team && sourceData === dummyTeam) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-32 flex justify-center items-center">
        <span className="w-8 h-8 border-4 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-32 flex flex-col justify-center items-center px-4">
        <h2 className="text-3xl text-[#483420] mb-4" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? "الشخص غير موجود" : "Member Not Found"}</h2>
        <button onClick={() => navigate("/team")} className="btn-primary">
          {lang === "ar" ? "العودة للفريق" : "Back to Team"}
        </button>
      </div>
    );
  }

  const name = lang === "ar" ? member.nameAr : member.nameEn;
  const title = lang === "ar" ? member.titleAr : member.titleEn;

  const arData = parseBio(member.bioAr || "");
  const enData = parseBio(member.bioEn || "");

  const bio = lang === "ar" ? arData.text : enData.text;
  const quote = lang === "ar" ? arData.quote : enData.quote;
  const experience = lang === "ar" ? arData.exp : enData.exp;
  const specialties = lang === "ar" ? arData.spec : enData.spec;
  const achievements = lang === "ar" ? arData.ach : enData.ach;
  const socialEmail = enData.email;
  const socialInstagram = enData.ig;

  const BackIcon = lang === "ar" ? ArrowRight : ArrowLeft;

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24 pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <button 
          onClick={() => navigate("/team")}
          className="flex items-center gap-2 text-[#7A6A58] hover:text-[#C9A96E] transition-colors mb-8 font-semibold text-sm uppercase tracking-wider"
          style={{fontFamily:"Inter, sans-serif"}}
        >
          <BackIcon size={18} />
          {lang === "ar" ? "العودة للفريق" : "Back to Team"}
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#A8884A]/10">
          <div className="flex flex-col md:flex-row">
            
            {/* Image Side */}
            <div className="w-full md:w-2/5 lg:w-1/2 h-[60vh] md:h-auto relative">
              <img 
                src={member.photo} 
                alt={name} 
                className="w-full h-full object-cover grayscale-[10%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:hidden">
                <div>
                  <h1 className="text-4xl text-white mb-2" style={{fontFamily:"Cormorant Garamond, Cairo, serif"}}>{name}</h1>
                  <p className="text-[#C9A96E] uppercase tracking-widest text-sm font-bold">{title}</p>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-3/5 lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
              
              <div className="hidden md:block mb-8">
                <p className="text-[#A8884A] text-sm font-bold uppercase tracking-[0.2em] mb-4">{title}</p>
                <h1 className="text-4xl lg:text-5xl text-[#483420] leading-tight mb-2" style={{fontFamily:"Cormorant Garamond, Cairo, serif", fontWeight: 600}}>
                  {name}
                </h1>
                <div className="w-16 h-0.5 bg-[#C9A96E] mt-6" />
              </div>

              {quote && (
                <AnimatedSection delay={50} animation="slideUp">
                  <div className="mb-10 p-6 bg-[#F5EDD8]/40 border-l-4 border-[#C9A96E] rounded-r-xl">
                    <p className="text-[#483420] text-xl lg:text-2xl leading-relaxed italic" style={{fontFamily:"Cormorant Garamond, Cairo, serif"}}>
                      "{quote}"
                    </p>
                  </div>
                </AnimatedSection>
              )}

              <AnimatedSection delay={100} animation="slideUp">
                <div className="mb-10 text-[#483420]/80 leading-relaxed text-lg" style={{fontFamily:"Inter, Cairo, serif"}}>
                  {bio && bio.length > 5 ? (
                    <p className="whitespace-pre-line">{bio}</p>
                  ) : (
                    <p className="italic text-[#7A6A58]">
                      {lang === "ar" ? "لا توجد تفاصيل إضافية عن هذا العضو حالياً." : "No additional details available for this member yet."}
                    </p>
                  )}
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={200} animation="slideUp">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-[#A8884A]/20">
                  <div className="flex flex-col gap-4">
                    {(experience || specialties) && (
                      <div className="glass burgundy-bg rounded-xl p-5 flex flex-col gap-4">
                        {experience && (
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/10 rounded-lg text-[#C9A96E] shrink-0">
                              <Award size={20} />
                            </div>
                            <div>
                              <h4 className="text-white font-semibold text-sm mb-1" style={{fontFamily:"Cairo, Inter, sans-serif"}}>
                                {lang === "ar" ? "الخبرة والحرفية" : "Expertise & Craft"}
                              </h4>
                              <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line" style={{fontFamily:"Cairo, Inter, sans-serif"}}>
                                {experience}
                              </p>
                            </div>
                          </div>
                        )}
                        {experience && specialties && <div className="h-px bg-white/10 w-full" />}
                        {specialties && (
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/10 rounded-lg text-[#C9A96E] shrink-0">
                              <span className="font-bold font-serif text-lg leading-none">S</span>
                            </div>
                            <div>
                              <h4 className="text-white font-semibold text-sm mb-1" style={{fontFamily:"Cairo, Inter, sans-serif"}}>
                                {lang === "ar" ? "التخصصات" : "Specialties"}
                              </h4>
                              <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line" style={{fontFamily:"Cairo, Inter, sans-serif"}}>
                                {specialties}
                              </p>
                            </div>
                          </div>
                        )}
                        {(experience || specialties) && achievements && <div className="h-px bg-white/10 w-full" />}
                        {achievements && (
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-white/10 rounded-lg text-[#C9A96E] shrink-0">
                              <Award size={20} />
                            </div>
                            <div>
                              <h4 className="text-white font-semibold text-sm mb-1" style={{fontFamily:"Cairo, Inter, sans-serif"}}>
                                {lang === "ar" ? "أبرز الإنجازات" : "Key Achievements"}
                              </h4>
                              <ul className="text-white/80 text-sm leading-relaxed list-disc list-inside" style={{fontFamily:"Cairo, Inter, sans-serif"}}>
                                {achievements.split('-').filter((a: string) => a.trim().length > 0).map((ach: string, i: number) => (
                                  <li key={i} className="mb-1">{ach.trim()}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {(socialEmail || socialInstagram) && (
                  <div className="flex flex-col justify-center gap-4">
                    <h4 className="text-[#483420] font-bold text-sm tracking-widest uppercase" style={{fontFamily:"Cairo, Inter, sans-serif"}}>
                      {lang === "ar" ? "للتواصل" : "Connect"}
                    </h4>
                    <div className="flex gap-3">
                      {socialEmail && (
                        <a href={`mailto:${socialEmail}`} className="w-10 h-10 rounded-full border border-[#A8884A]/30 flex items-center justify-center text-[#7A6A58] hover:bg-[#C9A96E] hover:text-white transition-all">
                          <Mail size={18} />
                        </a>
                      )}
                      {socialInstagram && (
                        <a href={socialInstagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[#A8884A]/30 flex items-center justify-center text-[#7A6A58] hover:bg-[#C9A96E] hover:text-white transition-all">
                          <Globe size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  )}
                </div>
              </AnimatedSection>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
