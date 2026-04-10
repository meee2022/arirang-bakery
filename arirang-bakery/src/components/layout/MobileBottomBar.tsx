import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, MapPin, Image, Phone } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

const tabs = [
  { key: "home",     path: "/",         icon: Home,        labelAr: "الرئيسية",  labelEn: "Home"     },
  { key: "products", path: "/products", icon: ShoppingBag, labelAr: "المنتجات", labelEn: "Products" },
  { key: "gallery",  path: "/gallery",  icon: Image,       labelAr: "المعرض",   labelEn: "Gallery"  },
  { key: "branches", path: "/branches", icon: MapPin,      labelAr: "الفروع",   labelEn: "Branches" },
  { key: "contact",  path: "/contact",  icon: Phone,       labelAr: "تواصل",    labelEn: "Contact"  },
];

export function MobileBottomBar() {
  const { lang } = useLanguage();

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[#C9A96E]/20"
      style={{
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        boxShadow: "0 -4px 24px rgba(107,26,42,0.10)",
      }}
    >
      <div className="flex items-stretch justify-around">
        {tabs.map(({ key, path, icon: Icon, labelAr, labelEn }) => (
          <NavLink
            key={key}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 px-1 py-2.5 flex-1 text-center transition-all duration-200 ${
                isActive
                  ? "text-[#6B1A2A]"
                  : "text-[#7A6A58] hover:text-[#6B1A2A]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-[#6B1A2A] text-white shadow-md"
                      : "bg-transparent text-[#7A6A58]"
                  }`}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                </span>
                <span
                  className={`text-[10px] font-semibold leading-none mt-0.5 ${
                    isActive ? "text-[#6B1A2A]" : "text-[#7A6A58]"
                  }`}
                  style={{ fontFamily: "Cairo,Inter,sans-serif" }}
                >
                  {lang === "ar" ? labelAr : labelEn}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
