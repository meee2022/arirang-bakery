import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { ArrowLeft, ArrowRight, Mail, Phone, Star, Briefcase, Award, CheckCircle2, Quote } from "lucide-react";
import { Logo } from "../../components/Logo";

function parseBio(bioStr: string) {
  try {
    const data = JSON.parse(bioStr);
    if (data && typeof data === "object" && data.text !== undefined) return data;
  } catch (e) {}
  return { text: bioStr, quote: "", exp: "", spec: "", ach: "", email: "", ig: "" };
}

export default function TeamMemberProfile() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const team = useQuery(api.team.listVisible);

  // Loading
  if (!team) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-32 flex justify-center items-center">
        <span className="w-10 h-10 border-4 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const member = team.find((m) => m._id === id) as any;

  if (!member) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-32 flex flex-col justify-center items-center px-4 gap-4">
        <p className="text-5xl">🍞</p>
        <h2 className="text-2xl text-[#483420] font-bold" style={{ fontFamily: "Cairo,serif" }}>
          {lang === "ar" ? "الشخص غير موجود" : "Member Not Found"}
        </h2>
        <button onClick={() => navigate("/team")} className="btn-primary mt-2">
          {lang === "ar" ? "العودة للفريق" : "Back to Team"}
        </button>
      </div>
    );
  }

  const isRtl = lang === "ar";
  const arData = parseBio(member.bioAr || "");
  const enData = parseBio(member.bioEn || "");

  const name       = isRtl ? member.nameAr  : member.nameEn;
  const title      = isRtl ? member.titleAr : member.titleEn;
  const bio        = isRtl ? arData.text    : enData.text;
  const quote      = isRtl ? arData.quote   : enData.quote;
  const experience = isRtl ? arData.exp     : enData.exp;
  const specialties= isRtl ? arData.spec    : enData.spec;
  const achievements = isRtl ? arData.ach   : enData.ach;
  const socialEmail = enData.email || arData.email;
  const phone       = enData.phone || arData.phone;

  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  const achievementList = achievements
    ? achievements.split("-").map((a: string) => a.trim()).filter(Boolean)
    : [];

  const specialtiesList = specialties
    ? specialties.split(/[-،,]/).map((s: string) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-24 pt-24 md:pt-32" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Back Button */}
        <button
          onClick={() => navigate("/team")}
          className="flex items-center gap-2 text-[#7A6A58] hover:text-[#C9A96E] transition-colors mb-8 font-semibold text-sm uppercase tracking-wider"
          style={{ fontFamily: "Cairo,Inter,sans-serif" }}
        >
          <BackIcon size={16} />
          {isRtl ? "العودة للفريق" : "Back to Team"}
        </button>

        {/* ═══ CV CARD ═══ */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#A8884A]/15 print:shadow-none">

          {/* ── Header Banner ── */}
          <div className="burgundy-bg pattern-bg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4A0F1B]/60 to-transparent" />
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6 px-8 md:px-14 pt-10 pb-0">

              {/* Photo */}
              <div className="shrink-0 -mb-14 md:-mb-16 z-20">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-[#C9A96E]/60 shadow-2xl">
                  {member.photo ? (
                    <img src={member.photo} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#F5EDD8] flex items-center justify-center text-4xl">👤</div>
                  )}
                </div>
              </div>

              {/* Name + Title */}
              <div className="pb-6 text-center md:text-start flex-1">
                <p className="text-[#C9A96E] text-xs font-bold tracking-[0.2em] uppercase mb-1">
                  {isRtl ? "اريرانج بيكري" : "Arirang Bakery"}
                </p>
                <h1 className="text-3xl md:text-4xl text-white font-bold leading-tight mb-1"
                    style={{ fontFamily: "Cairo,Cormorant Garamond,serif" }}>
                  {name}
                </h1>
                <p className="text-[#C9A96E] font-semibold text-sm tracking-wider uppercase"
                   style={{ fontFamily: "Cairo,Inter,sans-serif" }}>
                  {title}
                </p>
              </div>

              {/* Logo */}
              <div className="hidden md:block pb-6 opacity-70">
                <Logo light size="sm" />
              </div>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="px-8 md:px-14 pt-20 pb-10 space-y-10">

            {/* Quote */}
            {quote && (
              <div className="bg-[#F5EDD8]/50 border-r-4 border-[#C9A96E] rounded-xl px-6 py-5 flex gap-4 items-start">
                <Quote size={22} className="text-[#C9A96E] shrink-0 mt-1" />
                <p className="text-[#483420] text-lg leading-relaxed italic"
                   style={{ fontFamily: "Cairo,Cormorant Garamond,serif" }}>
                  {quote}
                </p>
              </div>
            )}

            {/* Two-column layout on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Left column — main content */}
              <div className="md:col-span-2 space-y-8">

                {/* About */}
                {bio && bio.length > 3 && (
                  <section>
                    <SectionTitle icon={<Star size={16}/>} label={isRtl ? "نبذة شخصية" : "About"} />
                    <p className="text-[#5A4A3A] leading-8 text-base whitespace-pre-line"
                       style={{ fontFamily: "Cairo,Inter,sans-serif" }}>
                      {bio}
                    </p>
                  </section>
                )}

                {/* Experience */}
                {experience && (
                  <section>
                    <SectionTitle icon={<Briefcase size={16}/>} label={isRtl ? "الخبرة والمسيرة المهنية" : "Experience"} />
                    <p className="text-[#5A4A3A] leading-8 text-base whitespace-pre-line"
                       style={{ fontFamily: "Cairo,Inter,sans-serif" }}>
                      {experience}
                    </p>
                  </section>
                )}

                {/* Achievements */}
                {achievementList.length > 0 && (
                  <section>
                    <SectionTitle icon={<Award size={16}/>} label={isRtl ? "أبرز الإنجازات" : "Key Achievements"} />
                    <ul className="space-y-2">
                      {achievementList.map((ach: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={16} className="text-[#C9A96E] mt-1 shrink-0" />
                          <span className="text-[#5A4A3A] text-base leading-7"
                                style={{ fontFamily: "Cairo,Inter,sans-serif" }}>
                            {ach}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              {/* Right column — sidebar */}
              <div className="space-y-6">

                {/* Specialties */}
                {specialtiesList.length > 0 && (
                  <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#A8884A]/15">
                    <h4 className="text-[#6B1A2A] font-bold text-xs uppercase tracking-widest mb-4"
                        style={{ fontFamily: "Cairo,Inter,sans-serif" }}>
                      {isRtl ? "التخصصات" : "Specialties"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {specialtiesList.map((s: string, i: number) => (
                        <span key={i}
                              className="px-3 py-1 rounded-full text-xs font-semibold bg-[#C9A96E]/15 text-[#A8884A] border border-[#C9A96E]/25"
                              style={{ fontFamily: "Cairo,Inter,sans-serif" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact */}
                {(socialEmail || phone) && (
                  <div className="burgundy-bg rounded-2xl p-5">
                    <h4 className="text-[#C9A96E] font-bold text-xs uppercase tracking-widest mb-4"
                        style={{ fontFamily: "Cairo,Inter,sans-serif" }}>
                      {isRtl ? "للتواصل" : "Contact"}
                    </h4>
                    <div className="space-y-3">
                      {socialEmail && (
                        <a href={`mailto:${socialEmail}`}
                           className="flex items-center gap-3 text-white/80 hover:text-[#C9A96E] transition-colors text-sm"
                           style={{ fontFamily: "Inter,sans-serif" }}>
                          <Mail size={15} className="shrink-0" />
                          <span dir="ltr" className="truncate">{socialEmail}</span>
                        </a>
                      )}
                      {phone && (
                        <a href={`tel:${phone}`}
                           className="flex items-center gap-3 text-white/80 hover:text-[#C9A96E] transition-colors text-sm"
                           style={{ fontFamily: "Inter,sans-serif" }}>
                          <Phone size={15} className="shrink-0" />
                          <span dir="ltr">{phone}</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Company card */}
                <div className="bg-[#F5EDD8] rounded-2xl p-5 text-center border border-[#C9A96E]/20">
                  <div className="flex justify-center mb-2">
                    <Logo size="sm" />
                  </div>
                  <p className="text-[#7A6A58] text-xs mt-2" style={{ fontFamily: "Cairo,Inter,sans-serif" }}>
                    {isRtl ? "اريرانج بيكري — الدوحة، قطر" : "Arirang Bakery — Doha, Qatar"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="border-t border-[#F5EDD8] px-8 md:px-14 py-4 flex items-center justify-between">
            <p className="text-xs text-[#C9A96E]/70" style={{ fontFamily: "Inter,Cairo,sans-serif" }}>
              arirangbakery.com
            </p>
            <button
              onClick={() => navigate("/team")}
              className="flex items-center gap-1.5 text-xs text-[#7A6A58] hover:text-[#6B1A2A] transition-colors font-semibold"
              style={{ fontFamily: "Cairo,Inter,sans-serif" }}
            >
              <BackIcon size={13} />
              {isRtl ? "كل الفريق" : "All Team"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── Helper ── */
function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="p-1.5 rounded-lg bg-[#C9A96E]/15 text-[#C9A96E]">{icon}</span>
      <h3 className="text-[#6B1A2A] font-bold text-sm uppercase tracking-widest"
          style={{ fontFamily: "Cairo,Inter,sans-serif" }}>
        {label}
      </h3>
      <div className="flex-1 h-px bg-[#C9A96E]/20" />
    </div>
  );
}
