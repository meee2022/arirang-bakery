import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: { name: v.string(), phone: v.string(), email: v.string(), subject: v.string(), message: v.string() },
  handler: async (ctx, args) => await ctx.db.insert("contactMessages", { ...args, read: false, date: Date.now() }),
});
export const list = query({ args: {}, handler: async (ctx) => await ctx.db.query("contactMessages").collect() });
export const markRead = mutation({ args: { id: v.id("contactMessages") }, handler: async (ctx, { id }) => await ctx.db.patch(id, { read: true }) });
export const remove = mutation({ args: { id: v.id("contactMessages") }, handler: async (ctx, { id }) => await ctx.db.delete(id) });
