import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import { Shield, ShieldCheck, Trash2, UserCheck } from "lucide-react";
import type { Id } from "../../../convex/_generated/dataModel";

export default function AdminUsers() {
  const { lang } = useLanguage();
  const { user: currentUser } = useAuth();
  const users = useQuery(api.users.list);
  const updateRole = useMutation(api.users.updateRole);
  const remove = useMutation(api.users.remove);

  const handleRoleChange = async (userId: Id<"users">, newRole: string) => {
    await updateRole({ userId, role: newRole });
  };

  const handleApprove = async (userId: Id<"users">) => {
    await updateRole({ userId, role: "editor" });
  };

  const handleDelete = async (userId: Id<"users">) => {
    if (confirm(lang === "ar" ? "هل أنت متأكد من حذف هذا المستخدم؟" : "Are you sure you want to delete this user?")) {
      await remove({ userId });
    }
  };

  if (currentUser?.role !== "admin" && currentUser?.role !== "legacy") {
    return (
      <div className="text-center py-20 text-[#6B1A2A]">
        {lang === "ar" ? "ليس لديك صلاحية لعرض هذه الصفحة." : "You do not have permission to view this page."}
      </div>
    );
  }

  const pendingUsers = (users ?? []).filter(u => u.role === "pending");

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-2xl font-bold text-[#1C1008]" style={{fontFamily:"Cairo,serif"}}>
          {lang === "ar" ? "إدارة المستخدمين والصلاحيات" : "Manage Users & Roles"}
        </h1>
      </div>

      {/* Pending approval banner */}
      {pendingUsers.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="font-bold text-amber-800" style={{fontFamily:"Cairo,Inter,serif"}}>
              {lang === "ar"
                ? `${pendingUsers.length} حساب يحتاج موافقة`
                : `${pendingUsers.length} account(s) pending approval`}
            </p>
            <p className="text-amber-700 text-xs mt-0.5" style={{fontFamily:"Cairo,Inter,serif"}}>
              {lang === "ar"
                ? "اضغط قبول لمنح صلاحية المحرر فوراً"
                : "Click Approve to grant editor access immediately"}
            </p>
          </div>
          <button
            onClick={() => pendingUsers.forEach(u => handleApprove(u._id))}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors whitespace-nowrap"
            style={{fontFamily:"Cairo,Inter,serif"}}
          >
            <UserCheck size={16} />
            {lang === "ar" ? "قبول الكل" : "Approve All"}
          </button>
        </div>
      )}

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F5EDD8]">
              <tr>
                <th className="p-4 text-start text-[#6B1A2A] font-bold" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "الاسم" : "Name"}</th>
                <th className="p-4 text-start text-[#6B1A2A] font-bold" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "البريد الإلكتروني" : "Email"}</th>
                <th className="p-4 text-center text-[#6B1A2A] font-bold" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "الصلاحية" : "Role"}</th>
                <th className="p-4 text-center text-[#6B1A2A] font-bold" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "تغيير" : "Change"}</th>
                <th className="p-4 text-center text-[#6B1A2A] font-bold" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "إجراء" : "Action"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5EDD8]">
              {(users ?? []).map((u) => (
                <tr key={u._id} className={`hover:bg-[#FDFAF5] transition-colors ${u.role === "pending" ? "bg-amber-50/50" : ""}`}>
                  <td className="p-4 font-semibold text-[#1C1008]" style={{fontFamily:"Cairo,serif"}}>{u.name}</td>
                  <td className="p-4 text-[#7A6A58]" dir="ltr">{u.email}</td>
                  <td className="p-4 text-center">
                    {u.role === "admin" ? (
                      <span className="badge badge-gold gap-1"><ShieldCheck size={14}/> {lang === "ar" ? "مدير" : "Admin"}</span>
                    ) : u.role === "editor" ? (
                      <span className="badge bg-blue-50 text-blue-700 gap-1"><Shield size={14}/> {lang === "ar" ? "محرر" : "Editor"}</span>
                    ) : (
                      <button
                        onClick={() => handleApprove(u._id)}
                        className="flex items-center gap-1.5 mx-auto px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold hover:bg-amber-200 transition-colors"
                        style={{fontFamily:"Cairo,Inter,serif"}}
                      >
                        <UserCheck size={13}/>
                        {lang === "ar" ? "قبول" : "Approve"}
                      </button>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {u.role !== "pending" ? (
                      <select
                        className="form-input text-xs py-1 max-w-[140px]"
                        value={u.role}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        disabled={currentUser._id === u._id}
                        style={{fontFamily:"Cairo,Inter,serif"}}
                      >
                        <option value="admin">{lang === "ar" ? "مدير عام" : "Admin"}</option>
                        <option value="editor">{lang === "ar" ? "محرر محتوى" : "Editor"}</option>
                      </select>
                    ) : (
                      <span className="text-xs text-amber-600" style={{fontFamily:"Cairo,Inter,serif"}}>
                        {lang === "ar" ? "اضغط قبول أولاً" : "Approve first"}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {currentUser._id !== u._id && (
                      <button onClick={() => handleDelete(u._id)} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users?.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-[#7A6A58]">
                    {lang === "ar" ? "لا يوجد مستخدمين مسجلين." : "No registered users."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-[#7A6A58]" style={{fontFamily:"Cairo,Inter,serif"}}>
        {lang === "ar"
          ? "ملاحظة: أي مستخدم جديد يسجل الآن يدخل تلقائياً كمحرر بدون الحاجة للموافقة."
          : "Note: New registrations are now automatically granted editor access without approval."}
      </p>
    </div>
  );
}
