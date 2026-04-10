import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { AnimatedSection } from "../../components/ui/AnimatedSection";
import { Building2, Users, Utensils, GraduationCap, Heart, Package } from "lucide-react";

const services = [
  { icon: Building2, ar: "شركات ومكاتب", en: "Companies & Offices" },
  { icon: Users, ar: "فعاليات وحفلات", en: "Events & Parties" },
  { icon: GraduationCap, ar: "مدارس وجامعات", en: "Schools & Universities" },
  { icon: Utensils, ar: "فنادق وضيافة", en: "Hotels & Hospitality" },
  { icon: Heart, ar: "أفراح ومناسبات", en: "Weddings & Celebrations" },
  { icon: Package, ar: "توزيعات وهدايا", en: "Distributions & Gifts" },
];

export default function Corporate() {
  const { t, lang } = useLanguage();
  const createRequest = useMutation(api.corporate.create);
  const [form, setForm] = useState({ companyName: "", contactName: "", phone: "", email: "", orderType: "", quantity: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createRequest(form);
      setSent(true);
      setForm({ companyName: "", contactName: "", phone: "", email: "", orderType: "", quantity: "", notes: "" });
    } catch {} finally { setLoading(false); }
  };

  return (
    <div>
      <section className="pt-32 pb-16 burgundy-bg pattern-bg text-white text-center">
        <AnimatedSection>
          <p className="section-eyebrow mb-3">{lang === "ar" ? "خدمات متميزة" : "Premium Services"}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{fontFamily:"Cairo,serif"}}>{t("corporateTitle")}</h1>
          <div className="gold-divider mx-auto" />
          <p className="text-white/80 mt-4 max-w-xl mx-auto" style={{fontFamily:"Cairo,Inter,serif"}}>{t("corporateSub")}</p>
        </AnimatedSection>
      </section>

      {/* Services */}
      <section className="section-py secondary-bg pattern-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <AnimatedSection>
            <SectionTitle title={lang === "ar" ? "من نخدم؟" : "Who We Serve?"} />
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map(({ icon: Icon, ar, en }, i) => (
              <AnimatedSection key={en} delay={i * 80} animation="slideUp">
                <div className="premium-card p-5 text-center h-full">
                  <div className="w-12 h-12 rounded-2xl burgundy-bg mx-auto mb-3 flex items-center justify-center shadow-lg">
                    <Icon size={22} className="text-[#C9A96E]" />
                  </div>
                  <p className="text-sm font-semibold text-[#1C1008]" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? ar : en}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-py bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <AnimatedSection>
            <SectionTitle title={lang === "ar" ? "قدِّم طلبك المؤسسي" : "Submit Your Corporate Request"} subtitle={lang === "ar" ? "سنتواصل معك في أقرب وقت ممكن" : "We will contact you as soon as possible"} />
          </AnimatedSection>
          <AnimatedSection animation="slideUp">
            {sent ? (
              <div className="text-center py-12 bg-[#F5EDD8] rounded-2xl">
                <div className="text-5xl mb-4">✓</div>
                <p className="text-[#6B1A2A] font-bold text-lg" style={{fontFamily:"Cairo,Inter,serif"}}>{t("requestSent")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="premium-card p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#1C1008] mb-1.5" style={{fontFamily:"Cairo,Inter,serif"}}>{t("companyName")} *</label>
                    <input required className="form-input" value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1C1008] mb-1.5" style={{fontFamily:"Cairo,Inter,serif"}}>{t("contactName")} *</label>
                    <input required className="form-input" value={form.contactName} onChange={e => setForm({...form, contactName: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#1C1008] mb-1.5" style={{fontFamily:"Cairo,Inter,serif"}}>{t("phone")} *</label>
                    <input required type="tel" className="form-input" dir="ltr" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1C1008] mb-1.5" style={{fontFamily:"Cairo,Inter,serif"}}>{t("email")} *</label>
                    <input required type="email" className="form-input" dir="ltr" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#1C1008] mb-1.5" style={{fontFamily:"Cairo,Inter,serif"}}>{t("orderType")} *</label>
                    <select required className="form-input" value={form.orderType} onChange={e => setForm({...form, orderType: e.target.value})}>
                      <option value="">{t("orderTypes")}</option>
                      <option value="hospitality">{lang === "ar" ? "ضيافة" : "Hospitality"}</option>
                      <option value="events">{lang === "ar" ? "فعاليات" : "Events"}</option>
                      <option value="schools">{lang === "ar" ? "مدارس" : "Schools"}</option>
                      <option value="companies">{lang === "ar" ? "شركات" : "Companies"}</option>
                      <option value="weddings">{lang === "ar" ? "أفراح" : "Weddings"}</option>
                      <option value="other">{lang === "ar" ? "أخرى" : "Other"}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1C1008] mb-1.5" style={{fontFamily:"Cairo,Inter,serif"}}>{t("quantity")}</label>
                    <input className="form-input" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1C1008] mb-1.5" style={{fontFamily:"Cairo,Inter,serif"}}>{t("notes")}</label>
                  <textarea rows={4} className="form-input resize-none" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
                </div>
                <button type="submit" className="btn-primary w-full py-3.5" disabled={loading}>
                  {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : null}
                  {loading ? t("sending") : t("submit")}
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

