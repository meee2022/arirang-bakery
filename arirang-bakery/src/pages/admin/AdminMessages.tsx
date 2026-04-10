import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { Trash2, MailOpen, Mail } from "lucide-react";
import type { Id } from "../../../convex/_generated/dataModel";

export default function AdminMessages() {
  const { lang } = useLanguage();
  const messages = useQuery(api.messages.list);
  const markRead = useMutation(api.messages.markRead);
  const remove = useMutation(api.messages.remove);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1C1008] mb-7" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? "رسائل التواصل" : "Contact Messages"}</h1>
      {!messages ? <p className="text-[#7A6A58]">Loading...</p> : messages.length === 0 ? (
        <div className="text-center py-16 text-[#7A6A58]">
          <Mail size={40} className="mx-auto mb-3 text-[#C9A96E]" />
          <p className="text-lg">{lang === "ar" ? "لا توجد رسائل بعد" : "No messages yet"}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {[...messages].sort((a,b)=>b.date-a.date).map(m => (
            <div key={m._id} className={`premium-card p-5 ${!m.read ? "border-s-4 border-[#6B1A2A]" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-bold text-[#1C1008] text-sm" style={{fontFamily:"Cairo,Inter,serif"}}>{m.name}</h3>
                    {!m.read && <span className="badge badge-burgundy text-xs">{lang === "ar" ? "غير مقروء" : "Unread"}</span>}
                    <span className="text-xs text-[#7A6A58]">{new Date(m.date).toLocaleString(lang === "ar" ? "ar" : "en")}</span>
                  </div>
                  <div className="text-xs text-[#7A6A58] mb-2 space-x-3 rtl:space-x-reverse" dir="ltr">{m.email} · {m.phone}</div>
                  <p className="text-sm font-semibold text-[#6B1A2A] mb-1" style={{fontFamily:"Cairo,Inter,serif"}}>{m.subject}</p>
                  <p className="text-sm text-[#7A6A58] leading-relaxed" style={{fontFamily:"Cairo,Inter,serif"}}>{m.message}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!m.read && (
                    <button onClick={()=>markRead({id:m._id as Id<"contactMessages">})} className="p-1.5 rounded-lg text-[#6B1A2A] hover:bg-[#F5EDD8] transition-colors" title="Mark as read">
                      <MailOpen size={15}/>
                    </button>
                  )}
                  <button onClick={()=>{if(confirm("Delete?"))remove({id:m._id});}} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={15}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

