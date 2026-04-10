import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({ args: { section: v.string() }, handler: async (ctx, { section }) => await ctx.db.query("homepageContent").filter(q => q.eq(q.field("section"), section)).first() });
export const getAll = query({ args: {}, handler: async (ctx) => await ctx.db.query("homepageContent").collect() });
export const upsert = mutation({
  args: { section: v.string(), contentAr: v.string(), contentEn: v.string(), imageUrl: v.string(), visible: v.boolean() },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("homepageContent").filter(q => q.eq(q.field("section"), args.section)).first();
    if (existing) { await ctx.db.patch(existing._id, args); }
    else { await ctx.db.insert("homepageContent", args); }
  },
});
