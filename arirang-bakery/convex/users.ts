import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Simple authentication logic suitable for internal administration board

export const register = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string()
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      throw new Error("User with this email already exists.");
    }

    // Role is "pending" by default so anonymous people cannot just sign up and become admins
    // Unless it's the very first user, then they become "admin"
    const isFirstUser = (await ctx.db.query("users").collect()).length === 0;

    const newUserId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      passwordHash: args.password, // For simple internal dashboard, store directly (or you can integrate a library)
      role: isFirstUser ? "admin" : "pending"
    });

    return newUserId;
  }
});

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string()
  },
  handler: async (ctx, args) => {
    // Check old hardcoded admin just in case
    if (args.email === "admin" && args.password === "arirang2024") {
      return { _id: "legacy", name: "Super Admin", role: "admin" };
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user || user.passwordHash !== args.password) {
      throw new Error("Invalid email or password");
    }

    if (user.role === "pending") {
      throw new Error("Your account is pending approval from an administrator.");
    }

    return {
      _id: user._id,
      name: user.name,
      role: user.role,
      email: user.email
    };
  }
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  }
});

export const updateRole = mutation({
  args: {
    userId: v.id("users"),
    role: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, { role: args.role });
  }
});

export const remove = mutation({
  args: {
    userId: v.id("users")
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.userId);
  }
});
