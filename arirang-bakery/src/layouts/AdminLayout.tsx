import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Tag, Users, MapPin, Image, Building2, MessageSquare, Settings, LogOut, ChevronRight, ExternalLink } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Logo } from "../components/Logo";
import { useState } from "react";

const navItems = [
  { key: "overview", path: "/admin", icon: LayoutDashboard, label: "نظرة عامة", labelEn: "Overview" },
  { key: "products", path: "/admin/products", icon: Package, label: "المنتجات", labelEn: "Products" },
  { key: "categories", path: "/admin/categories", icon: Tag, label: "الفئات", labelEn: "Categories" },
  { key: "team", path: "/admin/team", icon: Users, label: "الفريق", labelEn: "Team" },
  { key: "branches", path: "/admin/branches", icon: MapPin, label: "الفروع", labelEn: "Branches" },
  { key: "gallery", path: "/admin/gallery", icon: Image, label: "المعرض", labelEn: "Gallery" },
  { key: "corporate", path: "/admin/corporate", icon: Building2, label: "الطلبات المؤسسية", labelEn: "Corporate Requests" },
  { key: "messages", path: "/admin/messages", icon: MessageSquare, label: "الرسائل", labelEn: "Messages" },
  { key: "users", path: "/admin/users", icon: Users, label: "المستخدمين", labelEn: "Users" },
  { key: "settings", path: "/admin/settings", icon: Settings, label: "الإعدادات", labelEn: "Settings" },
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/admin/login"); };

  const Sidebar = ({ mobile = false }) => (
    <div className={`admin-sidebar flex flex-col ${mobile ? "fixed inset-y-0 start-0 z-50 shadow-2xl" : ""}`}>
      <div className="p-5 border-b border-white/10">
        <Logo light size="sm" />
      </div>
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map(({ path, icon: Icon, label, labelEn }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/admin"}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                isActive ? "bg-white/15 text-[#C9A96E] border-s-2 border-[#C9A96E]" : "text-white/80 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon size={18} className="flex-shrink-0" />
            <span style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? label : labelEn}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10 space-y-2">
        <a
          href="/"
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/70 hover:bg-white/10 hover:text-[#C9A96E] transition-colors text-sm font-semibold"
        >
          <ExternalLink size={16} />
          <span style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "تصفح الموقع" : "View Website"}</span>
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-semibold"
        >
          <LogOut size={16} />
          <span style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "تسجيل الخروج" : "Logout"}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#FDFAF5]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <Sidebar mobile />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="glass border-b border-[#C9A96E]/20 px-5 py-3.5 flex items-center justify-between sticky top-0 z-30">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-[#F5EDD8] text-[#6B1A2A]"
            onClick={() => setSidebarOpen(true)}
          >
            <ChevronRight size={20} />
          </button>
          <span className="font-bold text-[#6B1A2A] text-sm" style={{fontFamily:"Cairo,Cormorant Garamond,serif"}}>
            {lang === "ar" ? "لوحة تحكم اريرانج بيكري" : "Arirang Bakery Admin"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#7A6A58] hidden sm:block">{user?.name || "Admin"}</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6B1A2A] to-[#C9A96E] flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.[0]?.toUpperCase() || "A"}
            </div>
          </div>
        </header>
        <main className="flex-1 p-5 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
