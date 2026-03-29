import { relations } from "drizzle-orm";
import { pgTable, varchar, uuid, timestamp, text } from "drizzle-orm/pg-core";

// ================= USERS =================
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: varchar("email").notNull().unique(),
  name: text("name"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// ================= PRODUCTS =================
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(), // ✅ fixed typo
  imageUrl: text("image_url").notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// ================= COMMENTS =================
export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

// ================= RELATIONS =================

// User → many products, many comments
export const usersRelations = relations(users, ({ many }) => ({
  products: many(products),
  comments: many(comments),
}));

// Product → one user, many comments
export const productRelations = relations(products, ({ one, many }) => ({
  user: one(users, {
    fields: [products.userId],
    references: [users.id],
  }),
  comments: many(comments),
}));

// Comment → one user, one product
export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [comments.productId],
    references: [products.id],
  }),
}));

// ================= TYPES =================
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;