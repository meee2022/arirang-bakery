import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { Modal } from "../../components/ui/Modal";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import type { Id } from "../../../convex/_generated/dataModel";

const emptyForm = { imageUrl:"",captionAr:"",captionEn:"",visible:true,order:0 };

export default function AdminGallery() {
  const { lang } = useLanguage();
  const gallery = useQuery(api.gallery.list);
  const create = useMutation(api.gallery.create);
  const update = useMutation(api.gallery.update);
  const remove = useMutation(api.gallery.remove);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (g: any) => { setEditing(g); setForm({imageUrl:g.imageUrl,captionAr:g.captionAr,captionEn:g.captionEn,visible:g.visible,order:g.order}); setModal(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      if (editing) await update({id:editing._id as Id<"gallery">,...form});
      else await create(form);
      setModal(false);
    } catch {} finally { setLoading(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-2xl font-bold text-[#1C1008]" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? "إدارة المعرض" : "Manage Gallery"}</h1>
        <button onClick={openCreate} className="btn-primary gap-2"><Plus size={18}/>{lang === "ar" ? "إضافة صورة" : "Add Image"}</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {(gallery ?? []).map(g => (
          <div key={g._id} className="premium-card overflow-hidden group">
            <div className="relative h-36">
              <img src={g.imageUrl} alt="" className="w-full h-full object-cover"/>
              {!g.visible && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><EyeOff size={20} className="text-white"/></div>}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={()=>update({id:g._id,visible:!g.visible})} className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-white/40">{g.visible?<EyeOff size={14}/>:<Eye size={14}/>}</button>
                <button onClick={()=>openEdit(g)} className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-white/40"><Pencil size={14}/></button>
                <button onClick={()=>{if(confirm("Delete?"))remove({id:g._id});}} className="p-1.5 rounded-lg bg-red-500/80 text-white hover:bg-red-500"><Trash2 size={14}/></button>
              </div>
            </div>
            <div className="p-2.5">
              <p className="text-xs text-[#7A6A58] truncate">{lang === "ar" ? g.captionAr : g.captionEn}</p>
            </div>
          </div>
        ))}
      </div>
      <Modal open={modal} onClose={()=>setModal(false)} title={editing?"Edit Image / تعديل صورة":"Add Image / إضافة صورة"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Image URL *</label><input required className="form-input" dir="ltr" value={form.imageUrl} onChange={e=>setForm({...form,imageUrl:e.target.value})}/></div>
          {form.imageUrl && <img src={form.imageUrl} alt="" className="w-full h-40 object-cover rounded-xl" onError={()=>{}}/>}
          <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Arabic Caption</label><input className="form-input" value={form.captionAr} onChange={e=>setForm({...form,captionAr:e.target.value})}/></div>
          <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">English Caption</label><input className="form-input" dir="ltr" value={form.captionEn} onChange={e=>setForm({...form,captionEn:e.target.value})}/></div>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.visible} onChange={e=>setForm({...form,visible:e.target.checked})} className="w-4 h-4 accent-[#6B1A2A]"/><span className="text-sm">Visible / مرئي</span></label>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1" disabled={loading}>{loading?"...":"Save"}</button>
            <button type="button" onClick={()=>setModal(false)} className="btn-outline flex-1">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

