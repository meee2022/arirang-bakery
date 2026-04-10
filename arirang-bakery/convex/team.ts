import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("team").collect();
  },
});

export const listVisible = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("team")
      .filter((q) => q.eq(q.field("visible"), true))
      .collect();
  },
});

export const create = mutation({
  args: {
    nameAr: v.string(),
    nameEn: v.string(),
    titleAr: v.string(),
    titleEn: v.string(),
    bioAr: v.string(),
    bioEn: v.string(),
    photo: v.string(),
    visible: v.boolean(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("team", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("team"),
    nameAr: v.optional(v.string()),
    nameEn: v.optional(v.string()),
    titleAr: v.optional(v.string()),
    titleEn: v.optional(v.string()),
    bioAr: v.optional(v.string()),
    bioEn: v.optional(v.string()),
    photo: v.optional(v.string()),
    visible: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...fields }) => {
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("team") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
