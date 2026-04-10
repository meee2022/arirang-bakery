import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { AnimatedSection } from "../../components/ui/AnimatedSection";
import { Lightbox } from "../../components/ui/Lightbox";

export default function Gallery() {
  const { t, lang } = useLanguage();
  const gallery = useQuery(api.gallery.listVisible);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dummyGallery = [
    {
      _id: "gallery1",
      imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
      captionEn: "Our State-of-the-art Factory",
      captionAr: "مرافق التصنيع والمصنع"
    },
    {
      _id: "gallery2",
      imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?w=800&q=80",
      captionEn: "Bakery Interior & Displays",
      captionAr: "روعة المعرض من الداخل"
    },
    {
      _id: "gallery3",
      imageUrl: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=800&q=80",
      captionEn: "Arirang Delivery Fleet",
      captionAr: "باصات التوصيل الخاصة"
    },
    {
      _id: "gallery4",
      imageUrl: "https://images.unsplash.com/photo-1627308119036-eb5eb4cf708b?w=800&q=80",
      captionEn: "Packaging and Quality Control",
      captionAr: "التغليف ومراقبة الجودة"
    },
    {
      _id: "gallery5",
      imageUrl: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80",
      captionEn: "Our Dedicated Team at Work",
      captionAr: "فريقنا في العمل"
    }
  ];

  const items = gallery && gallery.length > 0 ? gallery : dummyGallery;

  return (
    <div>
      <section className="pt-32 pb-16 burgundy-bg pattern-bg text-white text-center">
        <AnimatedSection>
          <p className="section-eyebrow mb-3">{lang === "ar" ? "عالم اريرانج" : "The Arirang World"}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{fontFamily:"Cairo,serif"}}>{t("galleryPageTitle")}</h1>
          <div className="gold-divider mx-auto" />
          <p className="text-white/80 mt-4 max-w-xl mx-auto" style={{fontFamily:"Cairo,Inter,serif"}}>{t("galleryPageSub")}</p>
        </AnimatedSection>
      </section>

      <section className="section-py bg-[#FDFAF5]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {!items || items.length === 0 ? (
            <div className="text-center py-20 text-[#7A6A58]">{t("loading")}</div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {items.map((item, i) => (
                <AnimatedSection key={item._id} delay={(i % 4) * 80} animation="fade">
                  <div
                    className="break-inside-avoid relative overflow-hidden rounded-2xl cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-300"
                    onClick={() => setLightboxIndex(i)}
                  >
                    <img
                      src={item.imageUrl}
                      alt={lang === "ar" ? item.captionAr : item.captionEn}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-sm font-medium" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? item.captionAr : item.captionEn}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          index={lightboxIndex}
          lang={lang}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => Math.max(0, (i ?? 0) - 1))}
          onNext={() => setLightboxIndex(i => Math.min(items.length - 1, (i ?? 0) + 1))}
        />
      )}
    </div>
  );
}

