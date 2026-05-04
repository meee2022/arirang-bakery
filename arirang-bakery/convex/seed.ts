import { mutation } from "./_generated/server";

export const seedAll = mutation({
  args: {},
  handler: async (ctx) => {
    for (const table of ["categories", "products", "team", "branches", "gallery", "testimonials"] as const) {
      const items = await ctx.db.query(table).collect();
      for (const t of items) await ctx.db.delete(t._id);
    }

    for (const c of [
      { nameAr: "خبز", nameEn: "Bread", slug: "bread" },
      { nameAr: "توست", nameEn: "Toast", slug: "toast" },
      { nameAr: "معجنات", nameEn: "Pastries", slug: "pastries" },
      { nameAr: "كيك", nameEn: "Cakes", slug: "cakes" },
      { nameAr: "وجبات خفيفة", nameEn: "Snacks", slug: "snacks" },
      { nameAr: "منتجات مميزة", nameEn: "Special Items", slug: "special" },
    ]) await ctx.db.insert("categories", c);

    for (const p of [
      { nameAr: "خبز العجينة المخمرة", nameEn: "Sourdough Bread", descAr: "خبز طازج بعجينة مخمرة تقليدية بنكهة غنية وقشرة مقرمشة ذهبية", descEn: "Fresh sourdough bread with traditional fermentation, rich flavor and golden crispy crust", category: "bread", imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80", featured: true, visible: true, order: 1 },
      { nameAr: "توست القمح الكامل", nameEn: "Whole Wheat Toast", descAr: "توست صحي بالقمح الكامل غني بالألياف والعناصر الغذائية الطبيعية", descEn: "Healthy whole wheat toast rich in fiber and natural nutrients", category: "toast", imageUrl: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&q=80", featured: true, visible: true, order: 2 },
      { nameAr: "كرواسون الزبدة الفرنسي", nameEn: "French Butter Croissant", descAr: "كرواسون فرنسي بالزبدة الطازجة، طبقات هشة وذوق أصيل", descEn: "French butter croissant with fresh butter, flaky layers and authentic taste", category: "pastries", imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80", featured: true, visible: true, order: 3 },
      { nameAr: "كيك الشيكولاتة الفاخر", nameEn: "Luxury Chocolate Cake", descAr: "كيك شيكولاتة فاخر بكريمة الشوكولاتة الداكنة وطبقات متعددة شهية", descEn: "Luxury chocolate cake with dark chocolate cream and multiple delicious layers", category: "cakes", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80", featured: true, visible: true, order: 4 },
      { nameAr: "مينيز الجبن", nameEn: "Cheese Minis", descAr: "وجبات صغيرة مقرمشة محشوة بالجبن الطري وأعشاب عطرية طازجة", descEn: "Crispy mini bites filled with soft cheese and fresh aromatic herbs", category: "snacks", imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80", featured: false, visible: true, order: 5 },
      { nameAr: "خبز التمر الفاخر", nameEn: "Premium Date Bread", descAr: "خبز مميز محشو بحشوة التمر العربي الأصيل بلمسة شرقية فاخرة", descEn: "Special bread filled with authentic Arabian dates with a premium oriental touch", category: "special", imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80", featured: true, visible: true, order: 6 },
      { nameAr: "باغيت الخبز الفرنسي", nameEn: "French Baguette", descAr: "باغيت فرنسي أصيل بقشرة ذهبية مقرمشة وداخل طري لذيذ", descEn: "Authentic French baguette with golden crispy crust and soft delicious inside", category: "bread", imageUrl: "https://images.unsplash.com/photo-1619535860434-cf9b72d0f88a?w=600&q=80", featured: false, visible: true, order: 7 },
      { nameAr: "تورتة الفراولة", nameEn: "Strawberry Torte", descAr: "تورتة فراولة طازجة مع كريمة خفيفة وإسفنجة لطيفة", descEn: "Fresh strawberry torte with light cream and soft sponge cake", category: "cakes", imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80", featured: false, visible: true, order: 8 },
    ]) await ctx.db.insert("products", p as any);

    for (const m of [
      { nameAr: "أحمد الشمري", nameEn: "Ahmad Al-Shammari", titleAr: "الرئيس التنفيذي والمؤسس", titleEn: "CEO & Founder", bioAr: "مؤسس اريرانج بيكري بخبرة أكثر من 20 عامًا في صناعة المخابز والأغذية الفاخرة في منطقة الخليج", bioEn: "Founder of Arirang Bakery with over 20 years in premium bakery and food industry across the Gulf region", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", visible: true, order: 1 },
      { nameAr: "فاطمة العلي", nameEn: "Fatima Al-Ali", titleAr: "رئيسة قسم المنتجات", titleEn: "Head of Products", bioAr: "خبيرة في فنون المعجنات والحلويات الفاخرة، درست في أفضل المعاهد الأوروبية", bioEn: "Expert in fine pastry and luxury confectionery, trained at top European institutes", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", visible: true, order: 2 },
      { nameAr: "محمد القحطاني", nameEn: "Mohammed Al-Qahtani", titleAr: "مدير العمليات", titleEn: "Operations Manager", bioAr: "يشرف على سير العمليات اليومية ويضمن أعلى معايير الجودة في جميع الفروع", bioEn: "Oversees daily operations and ensures the highest quality standards across all branches", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", visible: true, order: 3 },
      { nameAr: "نورا السعيد", nameEn: "Noura Al-Saeed", titleAr: "مديرة التسويق", titleEn: "Marketing Director", bioAr: "متخصصة في بناء الهوية البصرية والتواصل مع العملاء بأسلوب إبداعي راقٍ", bioEn: "Specialist in brand identity and creative premium customer communication", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80", visible: true, order: 4 },
    ]) await ctx.db.insert("team", m);

    for (const b of [
      { nameAr: "المصنع الرئيسي والمخبز", nameEn: "Main Factory & Bakery", addressAr: "الدوحة، قطر", addressEn: "Doha, Qatar", phone: "+974 4444 0000", hours: "7:00 AM - 10:00 PM", mapUrl: "https://maps.google.com/?q=25.2854,51.5310", visible: true },
      { nameAr: "فرع الدوحة الرئيسي", nameEn: "Doha Main Branch", addressAr: "حي الدفنة، شارع الكورنيش، الدوحة", addressEn: "Al Dafna District, Corniche Street, Doha", phone: "+974 4444 1111", hours: "7:00 ص - 11:00 م", mapUrl: "https://maps.google.com/?q=25.2867,51.5333", visible: true },
      { nameAr: "فرع الوكرة", nameEn: "Al Wakra Branch", addressAr: "شارع الأمير محمد، الوكرة، قطر", addressEn: "Prince Mohammed Street, Al Wakra, Qatar", phone: "+974 4444 2222", hours: "7:00 ص - 11:00 م", mapUrl: "https://maps.google.com/?q=25.1657,51.6007", visible: true },
    ]) await ctx.db.insert("branches", b);

    for (const t of [
      { nameAr: "سارة المنصور", nameEn: "Sarah Al-Mansour", textAr: "مخبز اريرانج من أفضل ما تذوقته، جودة استثنائية وخدمة راقية. أنصح به بشدة لكل مناسبة.", textEn: "Arirang Bakery is among the finest I've tasted. Exceptional quality and premium service. Highly recommended for every occasion.", visible: true },
      { nameAr: "عبدالله الراشد", nameEn: "Abdullah Al-Rashid", textAr: "طلبنا منهم لحفل زفافنا وكان كل شيء مثاليًا. الاهتمام بالتفاصيل والطعم الرائع تجاوزا توقعاتنا.", textEn: "We ordered for our wedding and everything was perfect. The attention to detail and amazing taste exceeded our expectations.", visible: true },
      { nameAr: "نورا الحمدان", nameEn: "Noura Al-Hamdan", textAr: "منتجاتهم طازجة يوميًا وطعمها لا يوصف. فرحانة جدًا بوجود فرع قريب مني.", textEn: "Their products are fresh daily and the taste is indescribable. Very happy to have a branch close to me.", visible: true },
    ]) await ctx.db.insert("testimonials", t);

    for (const g of [
      { imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80", captionAr: "مرافق التصنيع والمصنع", captionEn: "Our State-of-the-art Factory", visible: true, order: 1 },
      { imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?w=800&q=80", captionAr: "روعة المعرض من الداخل", captionEn: "Bakery Interior & Displays", visible: true, order: 2 },
      { imageUrl: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=800&q=80", captionAr: "باصات التوصيل الخاصة", captionEn: "Arirang Delivery Fleet", visible: true, order: 3 },
      { imageUrl: "https://images.unsplash.com/photo-1627308119036-eb5eb4cf708b?w=800&q=80", captionAr: "التغليف ومراقبة الجودة", captionEn: "Packaging and Quality Control", visible: true, order: 4 },
      { imageUrl: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80", captionAr: "فريقنا في العمل", captionEn: "Our Dedicated Team at Work", visible: true, order: 5 },
    ]) await ctx.db.insert("gallery", g);

    const settings = await ctx.db.query("settings").collect();
    if (settings.length === 0) {
      await ctx.db.insert("settings", { key: "contact", value: { phone: "+974 4444 0000", email: "info@arirangbakery.com", addressAr: "حي الدفنة، شارع الكورنيش، الدوحة، قطر", addressEn: "Al Dafna District, Corniche Street, Doha, Qatar", hours: "7:00 ص - 11:00 م | 7:00 AM - 11:00 PM" } });
      await ctx.db.insert("settings", { key: "social", value: { instagram: "https://instagram.com/arirangbakery", twitter: "https://twitter.com/arirangbakery", facebook: "https://facebook.com/arirangbakery", whatsapp: "https://wa.me/97444440000" } });
    }

    return { success: true };
  },
});
