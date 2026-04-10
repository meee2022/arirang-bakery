import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxItem { imageUrl: string; captionAr: string; captionEn: string; }

interface LightboxProps {
  items: LightboxItem[];
  index: number;
  lang: "ar" | "en";
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({ items, index, lang, onClose, onPrev, onNext }: LightboxProps) {
  const item = items[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") lang === "ar" ? onNext() : onPrev();
      if (e.key === "ArrowRight") lang === "ar" ? onPrev() : onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lang, onClose, onNext, onPrev]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 end-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10">
        <X size={24} />
      </button>
      <button onClick={e => { e.stopPropagation(); onPrev(); }} className="absolute start-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10">
        <ChevronLeft size={28} className={lang === "ar" ? "rotate-180" : ""} />
      </button>
      <div className="max-w-4xl max-h-[85vh] mx-12 animate-scale-in" onClick={e => e.stopPropagation()}>
        <img src={item.imageUrl} alt={lang === "ar" ? item.captionAr : item.captionEn} className="max-w-full max-h-[75vh] object-contain rounded-xl" />
        {(item.captionAr || item.captionEn) && (
          <p className="text-center text-white/80 mt-3 text-sm">{lang === "ar" ? item.captionAr : item.captionEn}</p>
        )}
        <p className="text-center text-white/50 text-xs mt-1">{index + 1} / {items.length}</p>
      </div>
      <button onClick={e => { e.stopPropagation(); onNext(); }} className="absolute end-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10">
        <ChevronRight size={28} className={lang === "ar" ? "rotate-180" : ""} />
      </button>
    </div>
  );
}
