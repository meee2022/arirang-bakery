import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({ args: {}, handler: async (ctx) => await ctx.db.query("branches").collect() });
export const listVisible = query({ args: {}, handler: async (ctx) => await ctx.db.query("branches").filter(q => q.eq(q.field("visible"), true)).collect() });
export const create = mutation({
  args: { nameAr: v.string(), nameEn: v.string(), addressAr: v.string(), addressEn: v.string(), phone: v.string(), hours: v.string(), mapUrl: v.string(), visible: v.boolean() },
  handler: async (ctx, args) => await ctx.db.insert("branches", args),
});
export const update = mutation({
  args: { id: v.id("branches"), nameAr: v.optional(v.string()), nameEn: v.optional(v.string()), addressAr: v.optional(v.string()), addressEn: v.optional(v.string()), phone: v.optional(v.string()), hours: v.optional(v.string()), mapUrl: v.optional(v.string()), visible: v.optional(v.boolean()) },
  handler: async (ctx, { id, ...fields }) => await ctx.db.patch(id, fields),
});
export const remove = mutation({ args: { id: v.id("branches") }, handler: async (ctx, { id }) => await ctx.db.delete(id) });
