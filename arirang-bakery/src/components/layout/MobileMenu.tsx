import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { Logo } from "../Logo";

const navItems = ["home","products","about","team","branches","corporate","gallery","contact"];
const navPaths: Record<string,string> = { home:"/", products:"/products", about:"/about", team:"/team", branches:"/branches", corporate:"/corporate", gallery:"/gallery", contact:"/contact" };

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang, toggleLang } = useLanguage();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 mobile-menu-overlay flex flex-col">
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <Logo light size="sm" />
        <button onClick={onClose} className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
          <X size={22} />
        </button>
      </div>
      <nav className="flex-1 flex flex-col items-center justify-center gap-3 py-8">
        {navItems.map((item, i) => (
          <NavLink
            key={item}
            to={navPaths[item]}
            onClick={onClose}
            className={({ isActive }) =>
              `text-xl font-semibold w-full text-center py-3 transition-all duration-200 animate-slide-up ${isActive ? "text-[#C9A96E]" : "text-white hover:text-[#C9A96E]"}`
            }
            style={{ animationDelay: `${i * 60}ms`, fontFamily: "Cairo,serif" }}
          >
            {t(item)}
          </NavLink>
        ))}
      </nav>
      <div className="p-5 border-t border-white/10 flex items-center justify-center gap-4">
        <NavLink
            to="/admin"
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            {lang === "ar" ? "الإدارة" : "Admin"}
        </NavLink>
        <button
          onClick={toggleLang}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#C9A96E] text-[#C9A96E] font-semibold hover:bg-[#C9A96E]/10 transition-colors"
        >
          {lang === "ar" ? "English" : "العربية"}
        </button>
      </div>
    </div>
  );
}

