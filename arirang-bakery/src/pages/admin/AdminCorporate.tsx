import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { Trash2 } from "lucide-react";
import type { Id } from "../../../convex/_generated/dataModel";

const statusColors: Record<string,string> = { new: "badge-burgundy", reviewed: "badge-orange", done: "badge-green" };
const statusLabels: Record<string,string> = { new: "جديد / New", reviewed: "مراجعة / Reviewed", done: "مكتمل / Done" };

export default function AdminCorporate() {
  const { lang } = useLanguage();
  const requests = useQuery(api.corporate.list);
  const updateStatus = useMutation(api.corporate.updateStatus);
  const remove = useMutation(api.corporate.remove);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1C1008] mb-7" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? "الطلبات المؤسسية" : "Corporate Requests"}</h1>
      {!requests ? <p className="text-[#7A6A58]">Loading...</p> : requests.length === 0 ? (
        <div className="text-center py-16 text-[#7A6A58]"><p className="text-lg">{lang === "ar" ? "لا توجد طلبات بعد" : "No requests yet"}</p></div>
      ) : (
        <div className="space-y-4">
          {[...requests].sort((a,b)=>b.date-a.date).map(r => (
            <div key={r._id} className="premium-card p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-bold text-[#1C1008]" style={{fontFamily:"Cairo,Inter,serif"}}>{r.companyName}</h3>
                    <span className={`badge ${statusColors[r.status] ?? "badge-gold"}`}>{statusLabels[r.status] ?? r.status}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-[#7A6A58]">
                    <span style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "المسؤول: " : "Contact: "}{r.contactName}</span>
                    <span dir="ltr">{r.phone}</span>
                    <span dir="ltr">{r.email}</span>
                    <span style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "النوع: " : "Type: "}{r.orderType}</span>
                    <span style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? "الكمية: " : "Qty: "}{r.quantity}</span>
                    <span>{new Date(r.date).toLocaleDateString()}</span>
                  </div>
                  {r.notes && <p className="text-sm text-[#7A6A58] mt-2 bg-[#F5EDD8] rounded-lg p-2" style={{fontFamily:"Cairo,Inter,serif"}}>{r.notes}</p>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <select
                    value={r.status}
                    onChange={e=>updateStatus({id:r._id as Id<"corporateRequests">,status:e.target.value})}
                    className="form-input !py-1.5 !px-3 text-xs w-32"
                  >
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="done">Done</option>
                  </select>
                  <button onClick={()=>{if(confirm("Delete?"))remove({id:r._id});}} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"><Trash2 size={15}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

