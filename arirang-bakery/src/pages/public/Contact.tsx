import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { AnimatedSection } from "../../components/ui/AnimatedSection";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const { t, lang } = useLanguage();
  const sendMessage = useMutation(api.messages.create);
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const contactSettings = useQuery(api.settings.get, { key: "contact" })?.value;
  const socialSettings = useQuery(api.settings.get, { key: "social" })?.value;

  const contact = contactSettings || {
    phone: "+966 11 234 5678",
    email: "info@arirangbakery.com",
    addressAr: "حي العليا، شارع الملك فهد، الرياض، المملكة العربية السعودية",
    addressEn: "Al-Olaya District, King Fahd Road, Riyadh, Saudi Arabia",
    hours: "7:00 ص - 11:00 م (يومياً)",
  };
  const social = socialSettings || {
    instagram: "", twitter: "", facebook: "", whatsapp: ""
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendMessage(form);
      setSent(true);
      setForm({ name: "", phone: "", email: "", subject: "", message: "" });
    } catch {} finally { setLoading(false); }
  };

  return (
    <div>
      <section className="pt-32 pb-16 burgundy-bg pattern-bg text-white text-center">
        <AnimatedSection>
          <p className="section-eyebrow mb-3">{lang === "ar" ? "نحن هنا لمساعدتك" : "We are here to help"}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{fontFamily:"Cairo,serif"}}>{t("contactTitle")}</h1>
          <div className="gold-divider mx-auto" />
          <p className="text-white/80 mt-4 max-w-xl mx-auto" style={{fontFamily:"Cairo,Inter,serif"}}>{t("contactSub")}</p>
        </AnimatedSection>
      </section>

      <section className="section-py bg-[#FDFAF5]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <AnimatedSection animation="slideRight">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16 bg-[#F5EDD8] rounded-2xl">
                  <div className="text-6xl mb-5 text-[#C9A96E]">✓</div>
                  <p className="text-[#6B1A2A] font-bold text-lg" style={{fontFamily:"Cairo,Inter,serif"}}>{t("messageSent")}</p>
                  <button onClick={() => setSent(false)} className="btn-outline mt-6">{lang === "ar" ? "إرسال رسالة أخرى" : "Send another message"}</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="premium-card p-8 space-y-5">
                  <h3 className="text-xl font-bold text-[#1C1008] mb-2" style={{fontFamily:"Cairo,serif"}}>
                    {lang === "ar" ? "أرسل لنا رسالة" : "Send us a message"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#1C1008] mb-1.5" style={{fontFamily:"Cairo,Inter,serif"}}>{t("name")} *</label>
                      <input required className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1C1008] mb-1.5" style={{fontFamily:"Cairo,Inter,serif"}}>{t("phone")}</label>
                      <input type="tel" dir="ltr" className="form-input" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1C1008] mb-1.5" style={{fontFamily:"Cairo,Inter,serif"}}>{t("email")} *</label>
                    <input required type="email" dir="ltr" className="form-input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1C1008] mb-1.5" style={{fontFamily:"Cairo,Inter,serif"}}>{t("subject")} *</label>
                    <input required className="form-input" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1C1008] mb-1.5" style={{fontFamily:"Cairo,Inter,serif"}}>{t("message")} *</label>
                    <textarea required rows={5} className="form-input resize-none" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                  </div>
                  <button type="submit" className="btn-primary w-full py-3.5" disabled={loading}>
                    {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : null}
                    {loading ? t("sending") : t("send")}
                  </button>
                </form>
              )}
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection animation="slideLeft">
              <div className="space-y-6">
                <div className="premium-card p-6">
                  <h3 className="text-lg font-bold text-[#1C1008] mb-5" style={{fontFamily:"Cairo,serif"}}>{t("contactInfo")}</h3>
                  <div className="space-y-5">
                    {[
                      { icon: MapPin, label: t("address"), value: lang === "ar" ? contact.addressAr : contact.addressEn },
                      { icon: Phone, label: t("phone"), value: contact.phone, dir: "ltr" as const },
                      { icon: Mail, label: t("email"), value: contact.email, dir: "ltr" as const },
                      { icon: Clock, label: t("workingHours"), value: contact.hours || (lang === "ar" ? "7:00 ص - 11:00 م (يومياً)" : "7:00 AM - 11:00 PM (Daily)") },
                    ].map(({ icon: Icon, label, value, dir }) => (
                      <div key={label} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#F5EDD8] flex items-center justify-center flex-shrink-0">
                          <Icon size={18} className="text-[#6B1A2A]" />
                        </div>
                        <div>
                          <p className="text-xs text-[#C9A96E] font-semibold mb-0.5" style={{fontFamily:"Cairo,Inter,serif"}}>{label}</p>
                          <p className="text-sm text-[#1C1008]" dir={dir} style={{fontFamily:"Cairo,Inter,serif"}}>{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="premium-card p-6">
                  <h3 className="text-base font-bold text-[#1C1008] mb-4" style={{fontFamily:"Cairo,serif"}}>{t("followUs")}</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    {social.instagram && (
                      <a href={social.instagram} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#C9A96E]/30 text-[#6B1A2A] hover:bg-[#6B1A2A] hover:text-white hover:border-[#6B1A2A] transition-all text-sm font-medium">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                        Instagram
                      </a>
                    )}
                    {social.twitter && (
                      <a href={social.twitter} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#C9A96E]/30 text-[#6B1A2A] hover:bg-[#6B1A2A] hover:text-white hover:border-[#6B1A2A] transition-all text-sm font-medium">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                        Twitter / X
                      </a>
                    )}
                    {social.facebook && (
                      <a href={social.facebook} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#C9A96E]/30 text-[#6B1A2A] hover:bg-[#6B1A2A] hover:text-white hover:border-[#6B1A2A] transition-all text-sm font-medium">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                        Facebook
                      </a>
                    )}
                    {social.whatsapp && (
                      <a href={social.whatsapp} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#C9A96E]/30 text-[#6B1A2A] hover:bg-[#6B1A2A] hover:text-white hover:border-[#6B1A2A] transition-all text-sm font-medium">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        WhatsApp
                      </a>
                    )}
                    {!social.instagram && !social.twitter && !social.facebook && !social.whatsapp && (
                      <p className="text-sm text-[#7A6A58]" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "أضف روابط التواصل من لوحة التحكم" : "Add social links from the admin panel"}</p>
                    )}
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden h-52 bg-[#F5EDD8] flex items-center justify-center border border-[#C9A96E]/20">
                  <div className="text-center text-[#7A6A58]">
                    <MapPin size={36} className="mx-auto mb-2 text-[#C9A96E]" />
                    <p className="text-sm" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "الخريطة التفاعلية" : "Interactive Map"}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}


