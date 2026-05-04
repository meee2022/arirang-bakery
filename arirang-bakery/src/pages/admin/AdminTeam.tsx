import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { Modal } from "../../components/ui/Modal";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import type { Id } from "../../../convex/_generated/dataModel";

const emptyForm = { nameAr:"",nameEn:"",titleAr:"",titleEn:"",bioAr:"",bioEn:"",quoteAr:"",quoteEn:"",experienceAr:"",experienceEn:"",specialtiesAr:"",specialtiesEn:"",achievementsAr:"",achievementsEn:"",socialEmail:"",socialInstagram:"",photo:"",visible:true,order:0 };

function parseBio(bioStr: string) {
  try {
    const data = JSON.parse(bioStr);
    if (data && typeof data === 'object' && data.text !== undefined) return data;
  } catch (e) {}
  return { text: bioStr, quote: "", exp: "", spec: "", ach: "", email: "", ig: "" };
}

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
  const openEdit = (m: any) => { 
    const arData = parseBio(m.bioAr || "");
    const enData = parseBio(m.bioEn || "");
    setEditing(m); 
    setForm({ 
      nameAr:m.nameAr, nameEn:m.nameEn, titleAr:m.titleAr, titleEn:m.titleEn, 
      photo:m.photo, visible:m.visible, order:m.order,
      bioAr: arData.text, bioEn: enData.text,
      quoteAr: arData.quote || "", quoteEn: enData.quote || "",
      experienceAr: arData.exp || "", experienceEn: enData.exp || "",
      specialtiesAr: arData.spec || "", specialtiesEn: enData.spec || "",
      achievementsAr: arData.ach || "", achievementsEn: enData.ach || "",
      socialEmail: enData.email || "", socialInstagram: enData.ig || ""
    }); 
    setModal(true); 
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      const bioArStr = JSON.stringify({ text: form.bioAr, quote: form.quoteAr, exp: form.experienceAr, spec: form.specialtiesAr, ach: form.achievementsAr });
      const bioEnStr = JSON.stringify({ text: form.bioEn, quote: form.quoteEn, exp: form.experienceEn, spec: form.specialtiesEn, ach: form.achievementsEn, email: form.socialEmail, ig: form.socialInstagram });
      
      const payload = {
        nameAr: form.nameAr, nameEn: form.nameEn, titleAr: form.titleAr, titleEn: form.titleEn,
        photo: form.photo, visible: form.visible, order: form.order,
        bioAr: bioArStr, bioEn: bioEnStr
      };

      if (editing) await update({ id: editing._id as Id<"team">, ...payload });
      else await create(payload);
      setModal(false);
    } catch (err) { console.error(err); } finally { setLoading(false); }
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
          
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Arabic Quote / Vision</label><textarea rows={2} className="form-input resize-none italic" value={form.quoteAr} onChange={e=>setForm({...form,quoteAr:e.target.value})} /></div>
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">English Quote / Vision</label><textarea rows={2} className="form-input resize-none italic" dir="ltr" value={form.quoteEn} onChange={e=>setForm({...form,quoteEn:e.target.value})} /></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Arabic Experience</label><textarea rows={2} className="form-input resize-none" value={form.experienceAr} onChange={e=>setForm({...form,experienceAr:e.target.value})} /></div>
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">English Experience</label><textarea rows={2} className="form-input resize-none" dir="ltr" value={form.experienceEn} onChange={e=>setForm({...form,experienceEn:e.target.value})} /></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Arabic Specialties</label><input className="form-input" value={form.specialtiesAr} onChange={e=>setForm({...form,specialtiesAr:e.target.value})} /></div>
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">English Specialties</label><input className="form-input" dir="ltr" value={form.specialtiesEn} onChange={e=>setForm({...form,specialtiesEn:e.target.value})} /></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Arabic Achievements</label><textarea rows={2} className="form-input resize-none" placeholder="Dash-separated list" value={form.achievementsAr} onChange={e=>setForm({...form,achievementsAr:e.target.value})} /></div>
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">English Achievements</label><textarea rows={2} className="form-input resize-none" dir="ltr" placeholder="Dash-separated list" value={form.achievementsEn} onChange={e=>setForm({...form,achievementsEn:e.target.value})} /></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Email Contact</label><input className="form-input" dir="ltr" value={form.socialEmail} onChange={e=>setForm({...form,socialEmail:e.target.value})} /></div>
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Instagram Link</label><input className="form-input" dir="ltr" value={form.socialInstagram} onChange={e=>setForm({...form,socialInstagram:e.target.value})} /></div>
          </div>

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

