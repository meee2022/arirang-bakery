import { useRef, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade" | "slideUp" | "slideLeft" | "slideRight" | "scaleIn";
}

export function AnimatedSection({ children, className = "", delay = 0, animation = "slideUp" }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const animMap = {
    fade: { hidden: "opacity-0", visible: "opacity-100" },
    slideUp: { hidden: "opacity-0 translate-y-8", visible: "opacity-100 translate-y-0" },
    slideLeft: { hidden: "opacity-0 translate-x-8", visible: "opacity-100 translate-x-0" },
    slideRight: { hidden: "opacity-0 -translate-x-8", visible: "opacity-100 translate-x-0" },
    scaleIn: { hidden: "opacity-0 scale-95", visible: "opacity-100 scale-100" },
  };
  const anim = animMap[animation];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? anim.visible : anim.hidden} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

