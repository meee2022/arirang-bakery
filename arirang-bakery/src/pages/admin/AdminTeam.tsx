import { useState, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { Modal } from "../../components/ui/Modal";
import { Plus, Pencil, Trash2, Eye, EyeOff, Upload, X, ImageIcon } from "lucide-react";
import type { Id } from "../../../convex/_generated/dataModel";

const emptyForm = { nameAr:"",nameEn:"",titleAr:"",titleEn:"",bioAr:"",bioEn:"",quoteAr:"",quoteEn:"",experienceAr:"",experienceEn:"",specialtiesAr:"",specialtiesEn:"",achievementsAr:"",achievementsEn:"",socialEmail:"",phone:"",photo:"",visible:true,order:0 };

function parseBio(bioStr: string) {
  try {
    const data = JSON.parse(bioStr);
    if (data && typeof data === 'object' && data.text !== undefined) return data;
  } catch (e) {}
  return { text: bioStr, quote: "", exp: "", spec: "", ach: "", email: "", phone: "" };
}

export default function AdminTeam() {
  const { lang } = useLanguage();
  const team = useQuery(api.team.list);
  const create = useMutation(api.team.create);
  const update = useMutation(api.team.update);
  const remove = useMutation(api.team.remove);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const resolveUrl = useMutation(api.files.resolveUrl);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openCreate = () => {
    setEditing(null); setForm(emptyForm);
    setPhotoFile(null); setPhotoPreview("");
    setModal(true);
  };
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
      socialEmail: enData.email || arData.email || "",
      phone: enData.phone || arData.phone || ""
    });
    setPhotoFile(null); setPhotoPreview(m.photo || "");
    setModal(true);
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      let photoUrl = form.photo;

      // Upload new image if selected
      if (photoFile) {
        setUploadProgress(true);
        const uploadUrl = await generateUploadUrl();
        const res = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": photoFile.type },
          body: photoFile,
        });
        const { storageId } = await res.json();
        const resolved = await resolveUrl({ storageId });
        photoUrl = resolved ?? "";
        setUploadProgress(false);
      }

      const bioArStr = JSON.stringify({ text: form.bioAr, quote: form.quoteAr, exp: form.experienceAr, spec: form.specialtiesAr, ach: form.achievementsAr, email: form.socialEmail, phone: form.phone });
      const bioEnStr = JSON.stringify({ text: form.bioEn, quote: form.quoteEn, exp: form.experienceEn, spec: form.specialtiesEn, ach: form.achievementsEn, email: form.socialEmail, phone: form.phone });

      const payload = {
        nameAr: form.nameAr, nameEn: form.nameEn, titleAr: form.titleAr, titleEn: form.titleEn,
        photo: photoUrl, visible: form.visible, order: form.order,
        bioAr: bioArStr, bioEn: bioEnStr
      };

      if (editing) await update({ id: editing._id as Id<"team">, ...payload });
      else await create(payload);
      setModal(false);
    } catch (err) { console.error(err); setUploadProgress(false); } finally { setLoading(false); }
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
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">البريد الإلكتروني / Email</label><input className="form-input" dir="ltr" type="email" placeholder="example@email.com" value={form.socialEmail} onChange={e=>setForm({...form,socialEmail:e.target.value})} /></div>
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">رقم الهاتف / Phone</label><input className="form-input" dir="ltr" type="tel" placeholder="+974 5000 0000" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-xs font-semibold text-[#7A6A58] mb-2">
              {lang === "ar" ? "صورة العضو" : "Member Photo"}
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); }}
            />
            {photoPreview ? (
              <div className="flex items-center gap-4">
                <img
                  src={photoPreview}
                  alt="preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#F5EDD8]"
                />
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-[#F5EDD8] text-[#6B1A2A] rounded-lg hover:bg-[#e8dcc8] transition-colors"
                  >
                    <Upload size={13} />
                    {lang === "ar" ? "تغيير الصورة" : "Change Photo"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPhotoFile(null); setPhotoPreview(""); setForm({...form, photo:""}); }}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <X size={13} />
                    {lang === "ar" ? "حذف الصورة" : "Remove"}
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                className="border-2 border-dashed border-[#C9A96E] rounded-xl p-6 text-center cursor-pointer hover:bg-[#FDFAF5] transition-colors"
              >
                <ImageIcon size={28} className="mx-auto mb-2 text-[#C9A96E]" />
                <p className="text-sm font-semibold text-[#7A6A58]" style={{fontFamily:"Cairo,Inter,serif"}}>
                  {lang === "ar" ? "اضغط لرفع صورة أو اسحبها هنا" : "Click to upload or drag & drop"}
                </p>
                <p className="text-xs text-[#C9A96E] mt-1">PNG, JPG, WEBP</p>
              </div>
            )}
            {uploadProgress && (
              <p className="text-xs text-[#C9A96E] mt-2 flex items-center gap-1">
                <span className="w-3 h-3 border border-[#C9A96E] border-t-transparent rounded-full animate-spin inline-block" />
                {lang === "ar" ? "جاري رفع الصورة..." : "Uploading..."}
              </p>
            )}
          </div>
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

