import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { Modal } from "../../components/ui/Modal";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Id } from "../../../convex/_generated/dataModel";

const emptyForm = { nameAr: "", nameEn: "", slug: "" };

export default function AdminCategories() {
  const { lang } = useLanguage();
  const categories = useQuery(api.categories.list);
  const create = useMutation(api.categories.create);
  const update = useMutation(api.categories.update);
  const remove = useMutation(api.categories.remove);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (c: any) => { setEditing(c); setForm({ nameAr: c.nameAr, nameEn: c.nameEn, slug: c.slug }); setModal(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      if (editing) await update({ id: editing._id as Id<"categories">, ...form });
      else await create(form);
      setModal(false);
    } catch {} finally { setLoading(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-2xl font-bold text-[#1C1008]" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? "إدارة الفئات" : "Manage Categories"}</h1>
        <button onClick={openCreate} className="btn-primary gap-2"><Plus size={18} />{lang === "ar" ? "إضافة فئة" : "Add Category"}</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(categories ?? []).map(c => (
          <div key={c._id} className="premium-card p-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-[#1C1008]" style={{fontFamily:"Cairo,serif"}}>{c.nameAr}</p>
              <p className="text-sm text-[#7A6A58]">{c.nameEn}</p>
              <span className="badge badge-gold mt-1">{c.slug}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg text-[#6B1A2A] hover:bg-[#F5EDD8]"><Pencil size={15} /></button>
              <button onClick={() => { if(confirm("Delete?")) remove({ id: c._id }); }} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? (lang === "ar" ? "تعديل الفئة" : "Edit Category") : (lang === "ar" ? "إضافة فئة" : "Add Category")}>
        <form onSubmit={handleSave} className="space-y-4">
          <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Arabic Name *</label><input required className="form-input" value={form.nameAr} onChange={e => setForm({...form, nameAr: e.target.value})} /></div>
          <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">English Name *</label><input required className="form-input" dir="ltr" value={form.nameEn} onChange={e => setForm({...form, nameEn: e.target.value})} /></div>
          <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Slug *</label><input required className="form-input" dir="ltr" value={form.slug} onChange={e => setForm({...form, slug: e.target.value.toLowerCase().replace(/\s+/g,"-")})} /></div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1" disabled={loading}>{loading ? "..." : (lang === "ar" ? "حفظ" : "Save")}</button>
            <button type="button" onClick={() => setModal(false)} className="btn-outline flex-1">{lang === "ar" ? "إلغاء" : "Cancel"}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

