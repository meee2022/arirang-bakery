import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { AnimatedSection } from "../../components/ui/AnimatedSection";
import { Phone, Clock, MapPin, ExternalLink } from "lucide-react";

export default function Branches() {
  const { t, lang } = useLanguage();
  const branches = useQuery(api.branches.listVisible);

  const factoryBranch = {
    _id: "factory-main",
    nameAr: "المصنع الرئيسي والمخبز",
    nameEn: "Main Factory & Bakery",
    addressAr: "الدوحة، قطر",
    addressEn: "Doha, Qatar",
    phone: "+974 4444 0000",
    hours: "7:00 AM - 10:00 PM",
    mapUrl: "https://maps.google.com/?q=25.2854,51.5310"
  };

  const displayBranches = branches !== undefined ? [factoryBranch, ...branches] : undefined;

  return (
    <div>
      <section className="pt-32 pb-16 burgundy-bg pattern-bg text-white text-center">
        <AnimatedSection>
          <p className="section-eyebrow mb-3">{lang === "ar" ? "نخدمك في أكثر من مكان" : "Serving you in multiple locations"}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{fontFamily:"Cairo,serif"}}>{t("branchesTitle")}</h1>
          <div className="gold-divider mx-auto" />
          <p className="text-white/80 mt-4 max-w-xl mx-auto" style={{fontFamily:"Cairo,Inter,serif"}}>{t("branchesSub")}</p>
        </AnimatedSection>
      </section>

      <section className="section-py bg-[#FDFAF5]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {displayBranches === undefined ? (
            <div className="text-center py-20 text-[#7A6A58]">{t("loading")}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayBranches.map((b, i) => (
                <AnimatedSection key={b._id} delay={i * 120} animation="slideUp">
                  <div className="premium-card overflow-hidden h-full">
                    <div className="burgundy-bg p-6 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                          <MapPin size={20} className="text-[#C9A96E]" />
                        </div>
                        <span className="badge badge-gold text-xs">{lang === "ar" ? "فرع نشط" : "Active"}</span>
                      </div>
                      <h3 className="font-bold text-xl mt-3" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? b.nameAr : b.nameEn}</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin size={16} className="text-[#C9A96E] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-[#7A6A58]" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? b.addressAr : b.addressEn}</span>
                      </div>
                      {b.phone && (
                        <div className="flex items-center gap-3">
                          <Phone size={16} className="text-[#C9A96E] flex-shrink-0" />
                          <a href={`tel:${b.phone}`} className="text-sm text-[#7A6A58] hover:text-[#6B1A2A] transition-colors" dir="ltr">{b.phone}</a>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <Clock size={16} className="text-[#C9A96E] flex-shrink-0" />
                        <span className="text-sm text-[#7A6A58]" style={{fontFamily:"Cairo,Inter,serif"}}>{b.hours}</span>
                      </div>
                      {b.mapUrl && (
                        <a href={b.mapUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-semibold text-[#6B1A2A] hover:text-[#C9A96E] transition-colors mt-2">
                          <ExternalLink size={14} />
                          {t("getDirections")}
                        </a>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}

          {/* Interactive Map — Doha, Qatar */}
          <AnimatedSection className="mt-14">
            <div className="rounded-2xl overflow-hidden border border-[#C9A96E]/20 shadow-xl h-[400px] bg-[#F5EDD8] relative">
              <iframe
                title="Arirang Bakery — Doha, Qatar"
                src="https://maps.google.com/maps?q=25.2854,51.5310&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
