import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({ args: { key: v.string() }, handler: async (ctx, { key }) => await ctx.db.query("settings").filter(q => q.eq(q.field("key"), key)).first() });
export const getAll = query({ args: {}, handler: async (ctx) => await ctx.db.query("settings").collect() });
export const upsert = mutation({
  args: { key: v.string(), value: v.any() },
  handler: async (ctx, { key, value }) => {
    const existing = await ctx.db.query("settings").filter(q => q.eq(q.field("key"), key)).first();
    if (existing) { await ctx.db.patch(existing._id, { value }); }
    else { await ctx.db.insert("settings", { key, value }); }
  },
});
