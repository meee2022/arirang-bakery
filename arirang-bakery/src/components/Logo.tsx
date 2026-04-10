export function Logo({ size = "md", light = false }: { size?: "sm" | "md" | "lg"; light?: boolean }) {
  const sizes = {
    sm: { img: 36, ar: "text-sm",  en: "text-xs"  },
    md: { img: 48, ar: "text-xl",  en: "text-xs"  },
    lg: { img: 60, ar: "text-2xl", en: "text-sm"  },
  };
  const s = sizes[size];
  const textColor = light ? "text-white" : "text-[#6B1A2A]";
  const subColor  = "text-[#C9A96E]";

  return (
    <div className="flex items-center gap-3">
      <img
        src="/logo.jpeg"
        alt="Arirang Bakery Logo"
        style={{ width: s.img, height: s.img }}
        className="flex-shrink-0 rounded-xl object-contain shadow-md bg-white"
      />
      <div className="flex flex-col leading-none">
        <span className={`font-bold ${s.ar} ${textColor}`} style={{fontFamily:"Cairo,serif"}}>اريرانج بيكري</span>
        <span className={`font-light tracking-widest ${s.en} ${subColor}`} style={{fontFamily:"Cormorant Garamond,serif"}}>ARIRANG BAKERY</span>
      </div>
    </div>
  );
}

