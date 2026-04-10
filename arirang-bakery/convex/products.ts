import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const listVisible = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("visible"), true))
      .collect();
  },
});

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("products")
      .filter((q) =>
        q.and(
          q.eq(q.field("visible"), true),
          q.eq(q.field("featured"), true)
        )
      )
      .collect();
  },
});

export const create = mutation({
  args: {
    nameAr: v.string(),
    nameEn: v.string(),
    descAr: v.string(),
    descEn: v.string(),
    category: v.string(),
    imageUrl: v.string(),
    featured: v.boolean(),
    visible: v.boolean(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("products", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("products"),
    nameAr: v.optional(v.string()),
    nameEn: v.optional(v.string()),
    descAr: v.optional(v.string()),
    descEn: v.optional(v.string()),
    category: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    visible: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...fields }) => {
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
