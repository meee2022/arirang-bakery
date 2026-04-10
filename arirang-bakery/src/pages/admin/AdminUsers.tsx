import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import { Shield, ShieldAlert, ShieldCheck, Trash2 } from "lucide-react";
import type { Id } from "../../../convex/_generated/dataModel";

export default function AdminUsers() {
  const { lang } = useLanguage();
  const { user: currentUser } = useAuth();
  const users = useQuery(api.users.list);
  const updateRole = useMutation(api.users.updateRole);
  const remove = useMutation(api.users.remove);

  const handleRoleChange = async (userId: Id<"users">, newRole: string) => {
    if (confirm(lang === "ar" ? "تأكيد تغيير الصلاحية؟" : "Confirm role change?")) {
      await updateRole({ userId, role: newRole });
    }
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

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-2xl font-bold text-[#1C1008]" style={{fontFamily:"Cairo,serif"}}>
          {lang === "ar" ? "إدارة المستخدمين والصلاحيات" : "Manage Users & Roles"}
        </h1>
      </div>

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F5EDD8]">
              <tr>
                <th className="p-4 text-start text-[#6B1A2A] font-bold" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "الاسم" : "Name"}</th>
                <th className="p-4 text-start text-[#6B1A2A] font-bold" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "البريد الإلكتروني" : "Email"}</th>
                <th className="p-4 text-center text-[#6B1A2A] font-bold" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "الصلاحية" : "Role"}</th>
                <th className="p-4 text-center text-[#6B1A2A] font-bold" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "تغيير الصلاحية" : "Change Role"}</th>
                <th className="p-4 text-center text-[#6B1A2A] font-bold" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "إجراء" : "Action"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5EDD8]">
              {(users ?? []).map((u) => (
                <tr key={u._id} className="hover:bg-[#FDFAF5] transition-colors">
                  <td className="p-4 font-semibold text-[#1C1008]" style={{fontFamily:"Cairo,serif"}}>{u.name}</td>
                  <td className="p-4 text-[#7A6A58]">{u.email}</td>
                  <td className="p-4 text-center">
                    {u.role === "admin" ? (
                      <span className="badge badge-gold gap-1"><ShieldCheck size={14}/> {lang === "ar" ? "مدير" : "Admin"}</span>
                    ) : u.role === "editor" ? (
                      <span className="badge bg-blue-50 text-blue-700 gap-1"><Shield size={14}/> {lang === "ar" ? "محرر" : "Editor"}</span>
                    ) : (
                      <span className="badge bg-red-50 text-red-700 gap-1"><ShieldAlert size={14}/> {lang === "ar" ? "قيد الانتظار" : "Pending"}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <select
                      className="form-input text-xs py-1"
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      disabled={currentUser._id === u._id}
                    >
                      <option value="admin">{lang === "ar" ? "مدير عام" : "Admin"}</option>
                      <option value="editor">{lang === "ar" ? "محرر محتوى" : "Editor"}</option>
                      <option value="pending">{lang === "ar" ? "إيقاف / قيد الانتظار" : "Pending"}</option>
                    </select>
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
    </div>
  );
}
