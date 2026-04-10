import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({ args: {}, handler: async (ctx) => await ctx.db.query("testimonials").collect() });
export const listVisible = query({ args: {}, handler: async (ctx) => await ctx.db.query("testimonials").filter(q => q.eq(q.field("visible"), true)).collect() });
export const create = mutation({
  args: { nameAr: v.string(), nameEn: v.string(), textAr: v.string(), textEn: v.string(), visible: v.boolean() },
  handler: async (ctx, args) => await ctx.db.insert("testimonials", args),
});
export const update = mutation({
  args: { id: v.id("testimonials"), nameAr: v.optional(v.string()), nameEn: v.optional(v.string()), textAr: v.optional(v.string()), textEn: v.optional(v.string()), visible: v.optional(v.boolean()) },
  handler: async (ctx, { id, ...fields }) => await ctx.db.patch(id, fields),
});
export const remove = mutation({ args: { id: v.id("testimonials") }, handler: async (ctx, { id }) => await ctx.db.delete(id) });
