import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { Modal } from "../../components/ui/Modal";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import type { Id } from "../../../convex/_generated/dataModel";

const emptyForm = { nameAr:"",nameEn:"",addressAr:"",addressEn:"",phone:"",hours:"",mapUrl:"",visible:true };

export default function AdminBranches() {
  const { lang } = useLanguage();
  const branches = useQuery(api.branches.list);
  const create = useMutation(api.branches.create);
  const update = useMutation(api.branches.update);
  const remove = useMutation(api.branches.remove);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModal(true); };
  const openEdit = (b: any) => { setEditing(b); setForm({nameAr:b.nameAr,nameEn:b.nameEn,addressAr:b.addressAr,addressEn:b.addressEn,phone:b.phone,hours:b.hours,mapUrl:b.mapUrl,visible:b.visible}); setModal(true); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      if (editing) await update({ id: editing._id as Id<"branches">, ...form });
      else await create(form);
      setModal(false);
    } catch {} finally { setLoading(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <h1 className="text-2xl font-bold text-[#1C1008]" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? "إدارة الفروع" : "Manage Branches"}</h1>
        <button onClick={openCreate} className="btn-primary gap-2"><Plus size={18}/>{lang === "ar" ? "إضافة فرع" : "Add Branch"}</button>
      </div>
      <div className="space-y-4">
        {(branches ?? []).map(b => (
          <div key={b._id} className="premium-card p-5 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#1C1008]" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? b.nameAr : b.nameEn}</p>
              <p className="text-sm text-[#7A6A58] mt-0.5">{lang === "ar" ? b.addressAr : b.addressEn}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-[#7A6A58]">
                <span dir="ltr">{b.phone}</span>
                <span>{b.hours}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={()=>update({id:b._id,visible:!b.visible})} className={`p-1.5 rounded-lg ${b.visible?"text-green-600 bg-green-50":"text-[#7A6A58] bg-gray-50"}`}>{b.visible?<Eye size={15}/>:<EyeOff size={15}/>}</button>
              <button onClick={()=>openEdit(b)} className="p-1.5 rounded-lg text-[#6B1A2A] hover:bg-[#F5EDD8]"><Pencil size={15}/></button>
              <button onClick={()=>{if(confirm("Delete?"))remove({id:b._id});}} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"><Trash2 size={15}/></button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={modal} onClose={()=>setModal(false)} title={editing?"Edit Branch":"Add Branch"} maxWidth="max-w-2xl">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Arabic Name *</label><input required className="form-input" value={form.nameAr} onChange={e=>setForm({...form,nameAr:e.target.value})}/></div>
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">English Name *</label><input required className="form-input" dir="ltr" value={form.nameEn} onChange={e=>setForm({...form,nameEn:e.target.value})}/></div>
          </div>
          <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Arabic Address</label><input className="form-input" value={form.addressAr} onChange={e=>setForm({...form,addressAr:e.target.value})}/></div>
          <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">English Address</label><input className="form-input" dir="ltr" value={form.addressEn} onChange={e=>setForm({...form,addressEn:e.target.value})}/></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Phone</label><input className="form-input" dir="ltr" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Hours</label><input className="form-input" value={form.hours} onChange={e=>setForm({...form,hours:e.target.value})}/></div>
          </div>
          <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Map URL</label><input className="form-input" dir="ltr" value={form.mapUrl} onChange={e=>setForm({...form,mapUrl:e.target.value})}/></div>
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

