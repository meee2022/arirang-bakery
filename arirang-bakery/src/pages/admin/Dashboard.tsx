import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { Package, Users, MapPin, MessageSquare, Building2, Image, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { lang } = useLanguage();
  const products = useQuery(api.products.list);
  const team = useQuery(api.team.list);
  const branches = useQuery(api.branches.list);
  const messages = useQuery(api.messages.list);
  const corporate = useQuery(api.corporate.list);
  const gallery = useQuery(api.gallery.list);

  const unreadMessages = (messages ?? []).filter(m => !m.read).length;
  const newCorporate = (corporate ?? []).filter(r => r.status === "new").length;

  const stats = [
    { label: lang === "ar" ? "المنتجات" : "Products", value: products?.length ?? 0, icon: Package, path: "/admin/products", color: "from-[#6B1A2A] to-[#8B2A3D]" },
    { label: lang === "ar" ? "أعضاء الفريق" : "Team Members", value: team?.length ?? 0, icon: Users, path: "/admin/team", color: "from-[#C9A96E] to-[#A8884A]" },
    { label: lang === "ar" ? "الفروع" : "Branches", value: branches?.length ?? 0, icon: MapPin, path: "/admin/branches", color: "from-[#4A0F1B] to-[#6B1A2A]" },
    { label: lang === "ar" ? "رسائل غير مقروءة" : "Unread Messages", value: unreadMessages, icon: MessageSquare, path: "/admin/messages", color: "from-[#A8884A] to-[#C9A96E]", highlight: unreadMessages > 0 },
    { label: lang === "ar" ? "طلبات مؤسسية جديدة" : "New Corporate Requests", value: newCorporate, icon: Building2, path: "/admin/corporate", color: "from-[#6B1A2A] to-[#4A0F1B]", highlight: newCorporate > 0 },
    { label: lang === "ar" ? "صور المعرض" : "Gallery Items", value: gallery?.length ?? 0, icon: Image, path: "/admin/gallery", color: "from-[#C9A96E] to-[#6B1A2A]" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1C1008]" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? "نظرة عامة" : "Overview"}</h1>
        <p className="text-[#7A6A58] text-sm mt-1" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "مرحبًا بك في لوحة تحكم اريرانج بيكري" : "Welcome to Arirang Bakery admin dashboard"}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {stats.map(({ label, value, icon: Icon, path, color, highlight }) => (
          <Link key={path} to={path} className="premium-card p-6 flex items-center gap-5 hover:shadow-xl transition-all">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg flex-shrink-0`}>
              <Icon size={24} className="text-white" />
            </div>
            <div>
              <div className={`text-3xl font-bold ${highlight ? "text-[#6B1A2A]" : "text-[#1C1008]"}`}>{value}</div>
              <div className="text-sm text-[#7A6A58] mt-0.5" style={{fontFamily:"Cairo,Inter,serif"}}>{label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="premium-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-[#1C1008]" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? "أحدث الرسائل" : "Recent Messages"}</h2>
          <Link to="/admin/messages" className="text-sm text-[#C9A96E] hover:text-[#6B1A2A] transition-colors" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "عرض الكل" : "View All"}</Link>
        </div>
        {!messages ? (
          <p className="text-[#7A6A58] text-sm">{lang === "ar" ? "جاري التحميل..." : "Loading..."}</p>
        ) : messages.length === 0 ? (
          <div className="flex items-center gap-3 py-6 text-[#7A6A58]">
            <Mail size={20} />
            <p className="text-sm" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "لا توجد رسائل بعد" : "No messages yet"}</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F5EDD8]">
            {[...messages].sort((a,b)=>b.date-a.date).slice(0,5).map(m => (
              <div key={m._id} className="py-3.5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  {!m.read && <span className="w-2 h-2 rounded-full bg-[#6B1A2A] mt-2 flex-shrink-0" />}
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-[#1C1008] truncate" style={{fontFamily:"Cairo,Inter,serif"}}>{m.name}</p>
                    <p className="text-xs text-[#7A6A58] truncate" style={{fontFamily:"Cairo,Inter,serif"}}>{m.subject}</p>
                  </div>
                </div>
                <span className="text-xs text-[#7A6A58] flex-shrink-0">{new Date(m.date).toLocaleDateString(lang === "ar" ? "ar" : "en")}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

