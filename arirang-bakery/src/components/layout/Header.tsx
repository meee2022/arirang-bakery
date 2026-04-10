import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, LogIn } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Logo } from "../Logo";
import { MobileMenu } from "./MobileMenu";

const navItems = [
  { key: "home", path: "/" },
  { key: "products", path: "/products" },
  { key: "about", path: "/about" },
  { key: "team", path: "/team" },
  { key: "branches", path: "/branches" },
  { key: "corporate", path: "/corporate" },
  { key: "gallery", path: "/gallery" },
  { key: "contact", path: "/contact" },
];

export function Header() {
  const { t, lang, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-400 ${
          scrolled ? "glass shadow-lg border-b border-[#C9A96E]/20 py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <NavLink to="/" className="flex-shrink-0">
            <Logo size="sm" light={!scrolled} />
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(({ key, path }) => (
              <NavLink
                key={key}
                to={path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "text-[#6B1A2A] bg-[#F5EDD8]"
                      : scrolled
                      ? "text-[#1C1008] hover:text-[#6B1A2A] hover:bg-[#F5EDD8]"
                      : "text-white hover:text-[#C9A96E] hover:bg-white/10"
                  }`
                }
                style={{fontFamily:"Cairo,Inter,serif"}}
              >
                {t(key)}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            <NavLink
              to="/admin"
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                scrolled
                  ? "text-[#1C1008] hover:bg-[#F5EDD8]"
                  : "text-white hover:bg-white/10"
              }`}
              style={{fontFamily:"Cairo,Inter,serif"}}
            >
              <LogIn size={16} />
              <span className="hidden lg:inline">{lang === "ar" ? "الإدارة" : "Admin"}</span>
            </NavLink>

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all duration-200 ${
                scrolled
                  ? "border-[#C9A96E] text-[#6B1A2A] hover:bg-[#F5EDD8]"
                  : "border-[#C9A96E]/60 text-[#C9A96E] hover:bg-white/10"
              }`}
            >
              {lang === "ar" ? "EN" : "ع"}
            </button>

            {/* Mobile hamburger — also shows lang toggle inline on xs */}
            <button
              onClick={toggleLang}
              className={`sm:hidden p-1.5 rounded-lg text-xs font-bold border transition-colors ${
                scrolled ? "border-[#C9A96E] text-[#6B1A2A]" : "border-[#C9A96E]/60 text-[#C9A96E]"
              }`}
            >
              {lang === "ar" ? "EN" : "ع"}
            </button>
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? "text-[#1C1008] hover:bg-[#F5EDD8]" : "text-white hover:bg-white/10"
              }`}
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
