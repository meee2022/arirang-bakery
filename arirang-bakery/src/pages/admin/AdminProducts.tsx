import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { Modal } from "../../components/ui/Modal";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react";
import type { Id } from "../../../convex/_generated/dataModel";

const emptyForm = { nameAr: "", nameEn: "", descAr: "", descEn: "", category: "", imageUrl: "", featured: false, visible: true, order: 0 };

export default function AdminProducts() {
  const { lang } = useLanguage();
  const products = useQuery(api.products.list);
  const categories = useQuery(api.categories.list);
  const create = useMutation(api.products.create);
  const update = useMutation(api.products.update);
  const remove = useMutation(api.products.remove);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  const getUrl = useMutation(api.storage.getUrl);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await result.json();
      const imageUrl = await getUrl({ storageId });
      if (imageUrl) setForm({ ...form, imageUrl });
    } catch (err) {
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (p: any) => { setEditing(p); setForm({ nameAr: p.nameAr, nameEn: p.nameEn, descAr: p.descAr, descEn: p.descEn, category: p.category, imageUrl: p.imageUrl, featured: p.featured, visible: p.visible, order: p.order }); setModal(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) await update({ id: editing._id as Id<"products">, ...form });
      else await create(form);
      setModal(false);
    } catch {} finally { setLoading(false); }
  };

  const handleDelete = async (id: Id<"products">) => {
    if (confirm(lang === "ar" ? "هل أنت متأكد من الحذف؟" : "Are you sure you want to delete?"))
      await remove({ id });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-2xl font-bold text-[#1C1008]" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? "إدارة المنتجات" : "Manage Products"}</h1>
        <button onClick={openCreate} className="btn-primary gap-2"><Plus size={18} />{lang === "ar" ? "إضافة منتج" : "Add Product"}</button>
      </div>

      <div className="premium-card overflow-hidden admin-table-wrap">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F5EDD8]">
              <tr>
                <th className="p-4 text-start text-[#6B1A2A] font-bold" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "الصورة" : "Image"}</th>
                <th className="p-4 text-start text-[#6B1A2A] font-bold" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "الاسم" : "Name"}</th>
                <th className="p-4 text-start text-[#6B1A2A] font-bold" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "الفئة" : "Category"}</th>
                <th className="p-4 text-center text-[#6B1A2A] font-bold" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "مميز" : "Featured"}</th>
                <th className="p-4 text-center text-[#6B1A2A] font-bold" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "مرئي" : "Visible"}</th>
                <th className="p-4 text-center text-[#6B1A2A] font-bold" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "إجراءات" : "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5EDD8]">
              {(products ?? []).map(p => (
                <tr key={p._id} className="hover:bg-[#FDFAF5] transition-colors">
                  <td className="p-4"><img src={p.imageUrl} alt="" className="w-12 h-12 rounded-xl object-cover" /></td>
                  <td className="p-4">
                    <p className="font-semibold text-[#1C1008]" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? p.nameAr : p.nameEn}</p>
                    <p className="text-xs text-[#7A6A58]">{lang === "ar" ? p.nameEn : p.nameAr}</p>
                  </td>
                  <td className="p-4"><span className="badge badge-gold">{p.category}</span></td>
                  <td className="p-4 text-center">
                    <button onClick={() => update({ id: p._id, featured: !p.featured })} className={`p-1.5 rounded-lg transition-colors ${p.featured ? "text-[#C9A96E] bg-[#C9A96E]/10" : "text-[#7A6A58] hover:text-[#C9A96E]"}`}>
                      <Star size={16} className={p.featured ? "fill-current" : ""} />
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <button onClick={() => update({ id: p._id, visible: !p.visible })} className={`p-1.5 rounded-lg transition-colors ${p.visible ? "text-green-600 bg-green-50" : "text-[#7A6A58] bg-gray-50"}`}>
                      {p.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-[#6B1A2A] hover:bg-[#F5EDD8] transition-colors"><Pencil size={15} /></button>
                      <button onClick={() => handleDelete(p._id)} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? (lang === "ar" ? "تعديل المنتج" : "Edit Product") : (lang === "ar" ? "إضافة منتج" : "Add Product")} maxWidth="max-w-2xl">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 form-grid-mobile">
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">{lang === "ar" ? "الاسم بالعربية" : "Arabic Name"} *</label><input required className="form-input" value={form.nameAr} onChange={e => setForm({...form, nameAr: e.target.value})} /></div>
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">{lang === "ar" ? "الاسم بالإنجليزية" : "English Name"} *</label><input required className="form-input" dir="ltr" value={form.nameEn} onChange={e => setForm({...form, nameEn: e.target.value})} /></div>
          </div>
          <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">{lang === "ar" ? "الوصف بالعربية" : "Arabic Description"}</label><textarea rows={2} className="form-input resize-none" value={form.descAr} onChange={e => setForm({...form, descAr: e.target.value})} /></div>
          <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">{lang === "ar" ? "الوصف بالإنجليزية" : "English Description"}</label><textarea rows={2} className="form-input resize-none" dir="ltr" value={form.descEn} onChange={e => setForm({...form, descEn: e.target.value})} /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 form-grid-mobile">
            <div>
              <label className="block text-xs font-semibold text-[#7A6A58] mb-1">{lang === "ar" ? "الفئة" : "Category"} *</label>
              <select required className="form-input" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                <option value="">{lang === "ar" ? "اختر فئة" : "Select category"}</option>
                {(categories ?? []).map(c => <option key={c._id} value={c.slug}>{lang === "ar" ? c.nameAr : c.nameEn}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#7A6A58] mb-1">{lang === "ar" ? "الصورة" : "Image"}</label>
              <div className="flex items-center gap-3">
                {form.imageUrl && <img src={form.imageUrl} className="w-10 h-10 rounded-lg object-cover" />}
                <div className="flex-1">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="form-input text-xs" />
                  {uploading && <span className="text-xs text-[#A8884A] mt-1 inline-block">{lang === "ar" ? "جاري الرفع..." : "Uploading..."}</span>}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="w-4 h-4 accent-[#6B1A2A]" />
              <span className="text-sm text-[#1C1008]" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "مميز" : "Featured"}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.visible} onChange={e => setForm({...form, visible: e.target.checked})} className="w-4 h-4 accent-[#6B1A2A]" />
              <span className="text-sm text-[#1C1008]" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "مرئي" : "Visible"}</span>
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1" disabled={loading}>{loading ? "..." : (lang === "ar" ? "حفظ" : "Save")}</button>
            <button type="button" onClick={() => setModal(false)} className="btn-outline flex-1">{lang === "ar" ? "إلغاء" : "Cancel"}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

