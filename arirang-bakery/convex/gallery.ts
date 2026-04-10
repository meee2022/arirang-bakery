import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({ args: {}, handler: async (ctx) => await ctx.db.query("gallery").collect() });
export const listVisible = query({ args: {}, handler: async (ctx) => await ctx.db.query("gallery").filter(q => q.eq(q.field("visible"), true)).collect() });
export const create = mutation({
  args: { imageUrl: v.string(), captionAr: v.string(), captionEn: v.string(), visible: v.boolean(), order: v.number() },
  handler: async (ctx, args) => await ctx.db.insert("gallery", args),
});
export const update = mutation({
  args: { id: v.id("gallery"), imageUrl: v.optional(v.string()), captionAr: v.optional(v.string()), captionEn: v.optional(v.string()), visible: v.optional(v.boolean()), order: v.optional(v.number()) },
  handler: async (ctx, { id, ...fields }) => await ctx.db.patch(id, fields),
});
export const remove = mutation({ args: { id: v.id("gallery") }, handler: async (ctx, { id }) => await ctx.db.delete(id) });
