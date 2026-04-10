import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "gold" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: ReactNode;
}

export function Button({ variant = "primary", size = "md", loading, children, className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-content gap-2 font-semibold rounded-xl transition-all duration-300 cursor-pointer border-0 disabled:opacity-60 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-gradient-to-r from-[#6B1A2A] to-[#8B2A3D] text-white hover:from-[#4A0F1B] hover:to-[#6B1A2A] shadow-md hover:shadow-xl hover:-translate-y-0.5",
    outline: "border-2 border-[#6B1A2A] text-[#6B1A2A] hover:bg-[#6B1A2A] hover:text-white",
    gold: "bg-gradient-to-r from-[#C9A96E] to-[#A8884A] text-white hover:from-[#A8884A] hover:to-[#8A6D38] shadow-md hover:shadow-xl hover:-translate-y-0.5",
    ghost: "text-[#6B1A2A] hover:bg-[#F5EDD8]",
  };
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-base", lg: "px-8 py-3.5 text-lg" };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : null}
      {children}
    </button>
  );
}

