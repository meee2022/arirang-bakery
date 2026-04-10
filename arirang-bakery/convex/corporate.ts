import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: { companyName: v.string(), contactName: v.string(), phone: v.string(), email: v.string(), orderType: v.string(), quantity: v.string(), notes: v.string() },
  handler: async (ctx, args) => await ctx.db.insert("corporateRequests", { ...args, status: "new", date: Date.now() }),
});
export const list = query({ args: {}, handler: async (ctx) => await ctx.db.query("corporateRequests").collect() });
export const updateStatus = mutation({
  args: { id: v.id("corporateRequests"), status: v.string() },
  handler: async (ctx, { id, status }) => await ctx.db.patch(id, { status }),
});
export const remove = mutation({ args: { id: v.id("corporateRequests") }, handler: async (ctx, { id }) => await ctx.db.delete(id) });
