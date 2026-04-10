import { useLanguage } from "../../contexts/LanguageContext";

interface SectionTitleProps {
  eyebrow?: string;
  titleKey?: string;
  subtitleKey?: string;
  title?: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}

export function SectionTitle({ eyebrow, titleKey, subtitleKey, title, subtitle, light = false, center = true }: SectionTitleProps) {
  const { t } = useLanguage();
  const resolvedTitle = title ?? (titleKey ? t(titleKey) : "");
  const resolvedSub = subtitle ?? (subtitleKey ? t(subtitleKey) : "");
  const textClass = light ? "text-white" : "text-[#1C1008]";
  const subClass = light ? "text-[#F5EDD8]/80" : "text-[#7A6A58]";
  const alignClass = center ? "text-center items-center" : "text-start items-start";
  return (
    <div className={`flex flex-col gap-2 mb-10 ${alignClass}`}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className={`text-3xl md:text-4xl font-bold leading-tight ${textClass}`} style={{fontFamily:"Cairo,Cormorant Garamond,serif"}}>{resolvedTitle}</h2>
      <div className={`gold-divider ${center ? "" : "!mx-0"}`} />
      {resolvedSub && <p className={`text-base md:text-lg max-w-2xl leading-relaxed ${subClass}`}>{resolvedSub}</p>}
    </div>
  );
}
