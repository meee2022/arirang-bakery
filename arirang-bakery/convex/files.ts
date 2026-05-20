import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Returns a signed URL for uploading a file directly to Convex Storage
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Given a storageId, returns the public URL for the uploaded file
export const resolveUrl = mutation({
  args: { storageId: v.string() },
  handler: async (ctx, { storageId }) => {
    return await ctx.storage.getUrl(storageId as any);
  },
});
