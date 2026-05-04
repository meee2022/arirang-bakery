import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Logo } from "../Logo";

const productCategories = [
  { ar: "خبز", en: "Bread" },
  { ar: "توست", en: "Toast" },
  { ar: "معجنات", en: "Pastries" },
  { ar: "كيك", en: "Cakes" },
  { ar: "وجبات خفيفة", en: "Snacks" },
  { ar: "منتجات مميزة", en: "Special Items" },
];

export function Footer() {
  const { t, lang, toggleLang } = useLanguage();
  const year = new Date().getFullYear();

  const contact = useQuery(api.settings.get, { key: "contact" })?.value || {
    phone: "+974 4444 0000",
    email: "info@arirangbakery.com",
    addressAr: "حي الدفنة، شارع الكورنيش، الدوحة، قطر",
    addressEn: "Al Dafna District, Corniche Street, Doha, Qatar",
  };

  const social = useQuery(api.settings.get, { key: "social" })?.value || {
    instagram: "",
    twitter: "",
    facebook: "",
    whatsapp: "",
  };

  return (
    <footer className="burgundy-bg text-white pattern-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1 footer-col">
            <Logo light size="md" />
            <p className="mt-4 text-white/70 text-sm leading-relaxed" style={{fontFamily:"Cairo,Inter,serif"}}>
              {lang === "ar"
                ? "مخبز فاخر في قطر يجمع بين أصالة التراث وجودة المعاصرة في كل منتج طازج."
                : "A premium bakery in Qatar blending authentic heritage and contemporary quality in every fresh product."}
            </p>
            <div className="flex items-center gap-3 mt-5 footer-social">
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="p-2 rounded-lg bg-white/10 hover:bg-[#C9A96E] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
              )}
              {social.twitter && (
                <a href={social.twitter} target="_blank" rel="noopener" aria-label="Twitter" className="p-2 rounded-lg bg-white/10 hover:bg-[#C9A96E] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              )}
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="p-2 rounded-lg bg-white/10 hover:bg-[#C9A96E] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              )}
              {social.whatsapp && (
                <a href={social.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp" className="p-2 rounded-lg bg-white/10 hover:bg-[#C9A96E] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="text-[#C9A96E] font-bold mb-4" style={{fontFamily:"Cairo,serif"}}>{t("quickLinks")}</h4>
            <ul className="space-y-2.5">
              {[["home","/"],["products","/products"],["about","/about"],["team","/team"],["branches","/branches"],["gallery","/gallery"]].map(([key, path]) => (
                <li key={key}>
                  <Link to={path} className="text-white/70 hover:text-[#C9A96E] text-sm transition-colors" style={{fontFamily:"Cairo,Inter,serif"}}>
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products — bilingual */}
          <div className="footer-col">
            <h4 className="text-[#C9A96E] font-bold mb-4" style={{fontFamily:"Cairo,serif"}}>{t("ourProducts")}</h4>
            <ul className="space-y-2.5">
              {productCategories.map(item => (
                <li key={item.en}>
                  <Link to="/products" className="text-white/70 hover:text-[#C9A96E] text-sm transition-colors" style={{fontFamily:"Cairo,Inter,serif"}}>
                    {lang === "ar" ? item.ar : item.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="text-[#C9A96E] font-bold mb-4" style={{fontFamily:"Cairo,serif"}}>{t("contactInfo")}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin size={16} className="mt-0.5 text-[#C9A96E] flex-shrink-0" />
                <span style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? contact.addressAr : contact.addressEn}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/70">
                <Phone size={16} className="text-[#C9A96E] flex-shrink-0" />
                <a href={`tel:${contact.phone}`} className="hover:text-[#C9A96E] transition-colors" dir="ltr">{contact.phone}</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/70">
                <Mail size={16} className="text-[#C9A96E] flex-shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-[#C9A96E] transition-colors">{contact.email}</a>
              </li>
            </ul>
            <button
              onClick={toggleLang}
              className="mt-5 px-4 py-2 rounded-lg border border-[#C9A96E]/40 text-[#C9A96E] text-sm font-semibold hover:bg-[#C9A96E]/10 transition-colors"
            >
              {lang === "ar" ? "English" : "العربية"}
            </button>
          </div>
        </div>

        <div className="gold-divider-full mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <span style={{fontFamily:"Cairo,Inter,serif"}}>
            {lang === "ar"
              ? `© ${year} اريرانج بيكري — الدوحة، قطر. ${t("allRights")}`
              : `© ${year} Arirang Bakery — Doha, Qatar. ${t("allRights")}`}
          </span>
          <Link to="/admin" className="hover:text-[#C9A96E] transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
