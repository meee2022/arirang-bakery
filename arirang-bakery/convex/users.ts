import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const register = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string()
  },
  handler: async (ctx, args) => {
    if (!args.email || !args.password || !args.name) {
      throw new Error("جميع الحقول مطلوبة | All fields are required");
    }

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      throw new Error("هذا البريد الإلكتروني مسجل مسبقاً | Email already registered");
    }

    if (args.password.length < 6) {
      throw new Error("كلمة المرور يجب أن تكون 6 أحرف على الأقل | Password must be at least 6 characters");
    }

    const isFirstUser = (await ctx.db.query("users").collect()).length === 0;

    const newUserId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      passwordHash: args.password,
      role: isFirstUser ? "admin" : "editor"
    });

    return { id: newUserId, isFirstUser };
  }
});

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string()
  },
  handler: async (ctx, args) => {
    if (!args.email || !args.password) {
      throw new Error("البريد الإلكتروني وكلمة المرور مطلوبان | Email and password are required");
    }

    const allUsers = await ctx.db.query("users").collect();
    const matches = allUsers.filter(u => u.email.toLowerCase() === args.email.toLowerCase());
    const user = matches.find(u => u.passwordHash === args.password);

    if (!user) {
      throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة | Invalid email or password");
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

export const resetPassword = mutation({
  args: {
    email: v.string(),
    oldPassword: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.newPassword.length < 6) {
      throw new Error("كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    if (!user || user.passwordHash !== args.oldPassword) {
      throw new Error("كلمة المرور الحالية غير صحيحة");
    }
    await ctx.db.patch(user._id, { passwordHash: args.newPassword });
    return { success: true };
  }
});
