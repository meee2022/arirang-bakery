import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { Modal } from "../../components/ui/Modal";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import type { Id } from "../../../convex/_generated/dataModel";

const emptyForm = { nameAr:"",nameEn:"",titleAr:"",titleEn:"",bioAr:"",bioEn:"",photo:"",visible:true,order:0 };

export default function AdminTeam() {
  const { lang } = useLanguage();
  const team = useQuery(api.team.list);
  const create = useMutation(api.team.create);
  const update = useMutation(api.team.update);
  const remove = useMutation(api.team.remove);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (m: any) => { setEditing(m); setForm({ nameAr:m.nameAr,nameEn:m.nameEn,titleAr:m.titleAr,titleEn:m.titleEn,bioAr:m.bioAr,bioEn:m.bioEn,photo:m.photo,visible:m.visible,order:m.order }); setModal(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      if (editing) await update({ id: editing._id as Id<"team">, ...form });
      else await create(form);
      setModal(false);
    } catch {} finally { setLoading(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-2xl font-bold text-[#1C1008]" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? "إدارة الفريق" : "Manage Team"}</h1>
        <button onClick={openCreate} className="btn-primary gap-2"><Plus size={18} />{lang === "ar" ? "إضافة عضو" : "Add Member"}</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {(team ?? []).map(m => (
          <div key={m._id} className="premium-card p-5 text-center">
            <img src={m.photo} alt={m.nameAr} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-[#F5EDD8]" />
            <p className="font-bold text-[#1C1008]" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? m.nameAr : m.nameEn}</p>
            <p className="text-xs text-[#C9A96E] mb-3">{lang === "ar" ? m.titleAr : m.titleEn}</p>
            <div className="flex items-center justify-center gap-2">
              <button onClick={() => update({ id: m._id, visible: !m.visible })} className={`p-1.5 rounded-lg ${m.visible ? "text-green-600 bg-green-50" : "text-[#7A6A58] bg-gray-50"}`}>{m.visible ? <Eye size={15}/> : <EyeOff size={15}/>}</button>
              <button onClick={() => openEdit(m)} className="p-1.5 rounded-lg text-[#6B1A2A] hover:bg-[#F5EDD8]"><Pencil size={15}/></button>
              <button onClick={() => { if(confirm("Delete?")) remove({id:m._id}); }} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"><Trash2 size={15}/></button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "تعديل العضو / Edit Member" : "إضافة عضو / Add Member"} maxWidth="max-w-2xl">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Arabic Name *</label><input required className="form-input" value={form.nameAr} onChange={e=>setForm({...form,nameAr:e.target.value})} /></div>
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">English Name *</label><input required className="form-input" dir="ltr" value={form.nameEn} onChange={e=>setForm({...form,nameEn:e.target.value})} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Arabic Title</label><input className="form-input" value={form.titleAr} onChange={e=>setForm({...form,titleAr:e.target.value})} /></div>
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">English Title</label><input className="form-input" dir="ltr" value={form.titleEn} onChange={e=>setForm({...form,titleEn:e.target.value})} /></div>
          </div>
          <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Arabic Bio</label><textarea rows={2} className="form-input resize-none" value={form.bioAr} onChange={e=>setForm({...form,bioAr:e.target.value})} /></div>
          <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">English Bio</label><textarea rows={2} className="form-input resize-none" dir="ltr" value={form.bioEn} onChange={e=>setForm({...form,bioEn:e.target.value})} /></div>
          <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Photo URL</label><input className="form-input" dir="ltr" value={form.photo} onChange={e=>setForm({...form,photo:e.target.value})} /></div>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.visible} onChange={e=>setForm({...form,visible:e.target.checked})} className="w-4 h-4 accent-[#6B1A2A]" /><span className="text-sm">Visible / مرئي</span></label>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1" disabled={loading}>{loading?"...":"Save"}</button>
            <button type="button" onClick={()=>setModal(false)} className="btn-outline flex-1">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

