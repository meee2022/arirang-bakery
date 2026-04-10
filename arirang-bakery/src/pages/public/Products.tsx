import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useLanguage } from "../../contexts/LanguageContext";
import { SectionTitle } from "../../components/ui/SectionTitle";
import { AnimatedSection } from "../../components/ui/AnimatedSection";
import { Modal } from "../../components/ui/Modal";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Products() {
  const { t, lang } = useLanguage();
  const products = useQuery(api.products.listVisible);
  const categories = useQuery(api.categories.list);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const filtered = (products ?? []).filter(p => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = !search || (lang === "ar" ? p.nameAr : p.nameEn).toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const sensoryCards = [
    {
      img: "/products/stone_oven_bakery_1775825869863.png",
      titleEn: "Stone & Fire",
      titleAr: "الحجر والنار",
      descEn: "Baking at 250°C for the perfect crust.",
      descAr: "الخبز عند ٢٥٠ درجة مئوية للقشرة المثالية."
    },
    {
      img: "/products/golden_croissant_1775825886342.png",
      titleEn: "Golden Layers",
      titleAr: "طبقات ذهبية",
      descEn: "Hand-laminated with premium French butter.",
      descAr: "مورقة يدوياً بزبدة فرنسية فاخرة."
    },
    {
      img: "/products/sourdough_bread_1775825900507.png",
      titleEn: "The Morning Bloom",
      titleAr: "تفتح الصباح",
      descEn: "Natural levain, fermented for 24 hours.",
      descAr: "خميرة طبيعية، مخمرة لمدة ٢٤ ساعة."
    },
    {
      img: "/products/artisanal_patisserie_1775825919339.png",
      titleEn: "Artisanal Pâtisserie",
      titleAr: "حلويات حرفية",
      descEn: "Seasonal fruits on a silk-smooth custard.",
      descAr: "فواكه موسمية على كاسترد حريري ناعم."
    },
    {
      img: "/products/baker_illustration_1775825933553.png",
      titleEn: "The Touch",
      titleAr: "اللمسة",
      descEn: "Every loaf is shaped by human hands.",
      descAr: "كل رغيف يتم تشكيله بالأيدي البشرية."
    },
    {
      img: "/products/bakery_interior_1775825948607.png",
      titleEn: "The Atelier",
      titleAr: "المشغل",
      descEn: "Where tradition meets modern precision.",
      descAr: "حيث يلتقي التقليد بالدقة الحديثة."
    }
  ];

  return (
    <div className="bg-[#FDFAF5]">
      
      {/* Sensory Narrative Section */}
      <section className="pt-40 pb-20 burgundy-bg pattern-bg relative overflow-hidden text-white">
        {/* Subtle overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#FDFAF5] to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-sm hero-title-responsive" style={{fontFamily:"Cormorant Garamond, serif", fontWeight: 400}}>
                Our Sensory Narrative
              </h1>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#C9A96E] mb-8 drop-shadow-sm" style={{fontFamily:"Cairo, serif"}}>
                رواية حواسنا
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-2 text-lg" style={{fontFamily:"Inter, sans-serif"}}>
                Explore the artisanal craft behind every loaf and pastry. A visual journey through our heritage, flour, and fire.
              </p>
              <p className="text-white/90 max-w-2xl mx-auto text-lg" style={{fontFamily:"Cairo, serif"}}>
                اكتشف الحرفة اليدوية وراء كل رغيف ومعجنات. رحلة بصرية عبر تراثنا والدقيق والنار.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sensoryCards.map((card, i) => (
              <AnimatedSection key={i} delay={i * 100} animation="slideUp">
                <div className="bg-[#1C1008]/80 backdrop-blur-md rounded shadow-xl border border-[#C9A96E]/20 overflow-hidden text-center h-full flex flex-col group">
                  <div className="h-64 overflow-hidden relative border-b border-[#C9A96E]/20">
                    <img src={card.img} alt={card.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                  </div>
                  <div className="p-8 flex flex-col flex-1 justify-center">
                    <h3 className="text-xl text-white mb-3">
                      <span style={{fontFamily:"Cormorant Garamond, serif", fontWeight: 600}}>{card.titleEn}</span>
                      <span className="mx-2 text-[#C9A96E]">/</span>
                      <span style={{fontFamily:"Cairo, serif", fontWeight: 600}}>{card.titleAr}</span>
                    </h3>
                    <p className="text-white/70 text-sm mb-1" style={{fontFamily:"Inter, sans-serif"}}>{card.descEn}</p>
                    <p className="text-white/70 text-sm" style={{fontFamily:"Cairo, serif"}}>{card.descAr}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Experience the Heritage Sections */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <AnimatedSection>
            <div className="bg-[#F4F2EB] rounded-2xl p-12 text-center border border-[#C9A96E]/20">
              <h2 className="text-3xl md:text-4xl text-[#483420] mb-4">
                <span style={{fontFamily:"Cairo, serif", fontWeight: 600}}>عش التجربة</span>
                <span className="mx-3 text-[#A8884A]">/</span>
                <span style={{fontFamily:"Cormorant Garamond, serif", fontWeight: 600}}>Experience the Heritage</span>
              </h2>
              <p className="text-[#7A6A58] mb-8" style={{fontFamily:"Inter, sans-serif"}}>
                Join us in our atelier to witness the craft first-hand or bring the warmth home.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link to="/contact" className="bg-[#F4F2EB] border border-[#d6d0c4] text-[#483420] rounded px-8 py-3 w-full sm:w-auto font-medium hover:bg-white transition-colors" style={{fontFamily:"Cairo,Inter,serif"}}>
                  Our Store / متجرنا
                </Link>
                <Link to="/products" className="bg-[#5c4033] text-white rounded px-8 py-3 w-full sm:w-auto font-medium hover:bg-[#483420] transition-colors" style={{fontFamily:"Cairo,Inter,serif"}} onClick={() => window.scrollTo(0, 1500)}>
                  Order Online / اطلب عبر الإنترنت
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Product Catalog Grid (Original function) */}
      <section className="py-16 border-t border-[#C9A96E]/20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionTitle 
              eyebrow={lang === "ar" ? "تصفح القائمة" : "Browse Menu"} 
              title={lang === "ar" ? "قائمة المنتجات" : "Products Menu"}
          />
          
          {/* Search */}
          <AnimatedSection>
            <div className="relative max-w-md mx-auto mb-8">
              <Search size={18} className="absolute top-1/2 -translate-y-1/2 start-4 text-[#7A6A58]" />
              <input
                type="text"
                placeholder={t("search")}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="form-input ps-11 pe-10"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute top-1/2 -translate-y-1/2 end-4 text-[#7A6A58] hover:text-[#6B1A2A]">
                  <X size={16} />
                </button>
              )}
            </div>
          </AnimatedSection>

          {/* Category Filters */}
          <AnimatedSection>
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 justify-center flex-wrap">
              <button
                onClick={() => setActiveCategory("all")}
                className={`filter-btn px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${activeCategory === "all" ? "bg-[#6B1A2A] text-white shadow-md" : "bg-white text-[#7A6A58] hover:bg-[#F5EDD8] border border-[#C9A96E]/30"}`}
                style={{fontFamily:"Cairo,Inter,serif"}}
              >
                {t("all")}
              </button>
              {(categories ?? []).map(cat => (
                <button
                  key={cat._id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`filter-btn px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${activeCategory === cat.slug ? "bg-[#6B1A2A] text-white shadow-md" : "bg-white text-[#7A6A58] hover:bg-[#F5EDD8] border border-[#C9A96E]/30"}`}
                  style={{fontFamily:"Cairo,Inter,serif"}}
                >
                  {lang === "ar" ? cat.nameAr : cat.nameEn}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Products Grid */}
          {!products ? (
            <div className="text-center py-20 text-[#7A6A58]">{t("loading")}</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-[#C9A96E]/20" style={{fontFamily:"Cairo,Inter,serif"}}>
              <p className="text-[#C9A96E] font-bold text-lg mb-2">{lang === "ar" ? "لا توجد منتجات مطابقة" : "No matching products found"}</p>
              <p className="text-[#7A6A58] text-sm">{lang === "ar" ? "جرب البحث بكلمات مختلفة أو تصفح الأقسام الأخرى." : "Try searching differently or browse other categories."}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p, i) => (
                <AnimatedSection key={p._id} delay={(i % 4) * 80} animation="slideUp">
                  <div className="premium-card overflow-hidden flex flex-col h-full cursor-pointer" onClick={() => setSelectedProduct(p)}>
                    <div className="relative overflow-hidden h-48">
                      <img src={p.imageUrl} alt={lang === "ar" ? p.nameAr : p.nameEn} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                      {p.featured && <span className="absolute top-3 start-3 badge badge-gold">{t("featured")}</span>}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-xs text-[#C9A96E] font-semibold mb-1 uppercase tracking-wider">{p.category}</p>
                      <h3 className="font-bold text-base text-[#1C1008] mb-1" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? p.nameAr : p.nameEn}</h3>
                      <p className="text-xs text-[#7A6A58] mb-2" style={{fontFamily:"Cormorant Garamond,serif"}}>{lang === "ar" ? p.nameEn : p.nameAr}</p>
                      <p className="text-[#7A6A58] text-sm line-clamp-2 flex-1" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? p.descAr : p.descEn}</p>
                      <button className="btn-primary mt-4 py-2 text-sm rounded-lg w-full">{t("orderNow")}</button>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <Modal open={!!selectedProduct} onClose={() => setSelectedProduct(null)} maxWidth="max-w-2xl"
        title={selectedProduct ? (lang === "ar" ? selectedProduct.nameAr : selectedProduct.nameEn) : ""}>
        {selectedProduct && (
          <div>
            <img src={selectedProduct.imageUrl} alt={lang === "ar" ? selectedProduct.nameAr : selectedProduct.nameEn} className="w-full h-64 object-cover rounded-xl mb-5" />
            <div className="flex items-center gap-3 mb-3">
              <span className="badge badge-gold">{selectedProduct.category}</span>
              {selectedProduct.featured && <span className="badge badge-burgundy">{t("featured")}</span>}
            </div>
            <h2 className="text-2xl font-bold text-[#1C1008] mb-1" style={{fontFamily:"Cairo,serif"}}>{lang === "ar" ? selectedProduct.nameAr : selectedProduct.nameEn}</h2>
            <p className="text-[#C9A96E] text-sm mb-4" style={{fontFamily:"Cormorant Garamond,serif"}}>{lang === "ar" ? selectedProduct.nameEn : selectedProduct.nameAr}</p>
            <p className="text-[#7A6A58] leading-relaxed" style={{fontFamily:"Cairo,Inter,serif"}}>{lang === "ar" ? selectedProduct.descAr : selectedProduct.descEn}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
