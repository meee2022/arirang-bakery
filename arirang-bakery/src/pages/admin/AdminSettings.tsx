import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";

export default function AdminSettings() {
  const { lang } = useLanguage();
  const contactSetting = useQuery(api.settings.get, { key: "contact" });
  const socialSetting = useQuery(api.settings.get, { key: "social" });
  const upsert = useMutation(api.settings.upsert);
  const seedAll = useMutation(api.seed.seedAll);

  const [contact, setContact] = useState({ phone: "", email: "", addressAr: "", addressEn: "", hours: "" });
  const [social, setSocial] = useState({ instagram: "", twitter: "", facebook: "", whatsapp: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => { if (contactSetting?.value) setContact(contactSetting.value); }, [contactSetting]);
  useEffect(() => { if (socialSetting?.value) setSocial(socialSetting.value); }, [socialSetting]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      await upsert({ key: "contact", value: contact });
      await upsert({ key: "social", value: social });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {} finally { setSaving(false); }
  };

  const handleSeed = async () => {
    setSeeding(true);
    try { await seedAll({}); alert(lang === "ar" ? "تم تحميل البيانات الأولية بنجاح!" : "Seed data loaded successfully!"); }
    catch (err) { alert("Error: " + err); }
    finally { setSeeding(false); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1C1008] mb-7" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? "إعدادات الموقع" : "Site Settings"}</h1>

      {/* Seed Data Button */}
      <div className="premium-card p-6 mb-6 bg-[#F5EDD8] border-[#C9A96E]/30">
        <h2 className="font-bold text-[#1C1008] mb-2" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? "تحميل البيانات الأولية" : "Load Initial Data"}</h2>
        <p className="text-sm text-[#7A6A58] mb-4" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "اضغط هذا الزر مرة واحدة فقط لتحميل البيانات التجريبية في قاعدة البيانات." : "Press this button only once to load sample data into the database."}</p>
        <button onClick={handleSeed} className="btn-gold" disabled={seeding}>
          {seeding ? "Loading..." : (lang === "ar" ? "تحميل البيانات" : "Load Seed Data")}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Info */}
        <div className="premium-card p-6">
          <h2 className="font-bold text-[#1C1008] mb-5" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? "معلومات التواصل" : "Contact Information"}</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Phone</label><input className="form-input" dir="ltr" value={contact.phone} onChange={e=>setContact({...contact,phone:e.target.value})}/></div>
              <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Email</label><input type="email" className="form-input" dir="ltr" value={contact.email} onChange={e=>setContact({...contact,email:e.target.value})}/></div>
            </div>
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Arabic Address</label><input className="form-input" value={contact.addressAr} onChange={e=>setContact({...contact,addressAr:e.target.value})}/></div>
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">English Address</label><input className="form-input" dir="ltr" value={contact.addressEn} onChange={e=>setContact({...contact,addressEn:e.target.value})}/></div>
            <div><label className="block text-xs font-semibold text-[#7A6A58] mb-1">Working Hours</label><input className="form-input" value={contact.hours} onChange={e=>setContact({...contact,hours:e.target.value})}/></div>
          </div>
        </div>

        {/* Social Links */}
        <div className="premium-card p-6">
          <h2 className="font-bold text-[#1C1008] mb-5" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? "روابط التواصل الاجتماعي" : "Social Media Links"}</h2>
          <div className="space-y-4">
            {[["Instagram","instagram"],["Twitter","twitter"],["Facebook","facebook"],["WhatsApp","whatsapp"]].map(([label, key]) => (
              <div key={key}><label className="block text-xs font-semibold text-[#7A6A58] mb-1">{label}</label><input className="form-input" dir="ltr" value={(social as any)[key]} onChange={e=>setSocial({...social,[key]:e.target.value})}/></div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button type="submit" className="btn-primary px-8" disabled={saving}>
            {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> : null}
            {saving ? "..." : (lang === "ar" ? "حفظ الإعدادات" : "Save Settings")}
          </button>
          {saved && <span className="text-green-600 font-semibold text-sm">{lang === "ar" ? "تم الحفظ بنجاح ✓" : "Saved successfully ✓"}</span>}
        </div>
      </form>
    </div>
  );
}

