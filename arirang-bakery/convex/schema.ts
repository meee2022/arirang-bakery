import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    nameAr: v.string(),
    nameEn: v.string(),
    descAr: v.string(),
    descEn: v.string(),
    category: v.string(),
    imageUrl: v.string(),
    featured: v.boolean(),
    visible: v.boolean(),
    order: v.number(),
  }),

  users: defineTable({
    email: v.string(),
    passwordHash: v.string(), // We will use a basic pseudo-hash or plain text for simplicity per user requirements
    name: v.string(),
    role: v.string(), // "admin", "editor", "pending"
  }).index("by_email", ["email"]),

  categories: defineTable({
    nameAr: v.string(),
    nameEn: v.string(),
    slug: v.string(),
  }),

  team: defineTable({
    nameAr: v.string(),
    nameEn: v.string(),
    titleAr: v.string(),
    titleEn: v.string(),
    bioAr: v.string(),
    bioEn: v.string(),
    photo: v.string(),
    visible: v.boolean(),
    order: v.number(),
  }),

  branches: defineTable({
    nameAr: v.string(),
    nameEn: v.string(),
    addressAr: v.string(),
    addressEn: v.string(),
    phone: v.string(),
    hours: v.string(),
    mapUrl: v.string(),
    visible: v.boolean(),
  }),

  gallery: defineTable({
    imageUrl: v.string(),
    captionAr: v.string(),
    captionEn: v.string(),
    visible: v.boolean(),
    order: v.number(),
  }),

  corporateRequests: defineTable({
    companyName: v.string(),
    contactName: v.string(),
    phone: v.string(),
    email: v.string(),
    orderType: v.string(),
    quantity: v.string(),
    notes: v.string(),
    status: v.string(),
    date: v.number(),
  }),

  contactMessages: defineTable({
    name: v.string(),
    phone: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    read: v.boolean(),
    date: v.number(),
  }),

  settings: defineTable({
    key: v.string(),
    value: v.any(),
  }),

  homepageContent: defineTable({
    section: v.string(),
    contentAr: v.string(),
    contentEn: v.string(),
    imageUrl: v.string(),
    visible: v.boolean(),
  }),

  testimonials: defineTable({
    nameAr: v.string(),
    nameEn: v.string(),
    textAr: v.string(),
    textEn: v.string(),
    visible: v.boolean(),
  }),
});
