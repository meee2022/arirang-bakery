import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Generating an upload URL for file storage
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Since files in convex are private by default unless fetched via HTTP action,
// We use getUrl to convert a storage ID to an accessible URL string
export const getUrl = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
