import { relations } from "drizzle-orm";
import { integer, pgTable, varchar, uuid, timestamp, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: varchar("email").notNull().unique(),
  name: text("name"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const products = pgTable("products", {
    id:uuid("id").defaultRandom().primaryKey(),
    title:text("title").notNull(),
    description:text("desctiption").notNull(),
    imageUrl:text("image_url").notNull(),
     userId:text("user_id")
         .notNull()
         .references(()=>users.id,{onDelete:"cascade"}),
    createdAt:timestamp("created_at",{mode:"date"}).notNull().defaultNow(),
    updatedAt:timestamp("updated_at",{mode:"date"}).notNull().defaultNow(),
    
});

export const comments = pgTable("comments",{
    id:uuid("id").defaultRandom().primaryKey(),
    content:text("content").notNull(),
    userId:text("user_id")
        .notNull()
        .references(()=>users.id,{onDelete:"cascade"}),
    productId:uuid("product_id")
        .notNull()
        .references(()=>products.id,{onDelete:"cascade"}),
    createdAt:timestamp("created_at",{mode:"date"}).notNull().defaultNow(),
    
});

export const usersRelations = relations(users,({many})=>({
    products:many(products),
    comments:many(comments),
}));

//a product can only have a single user 

export const productRelations = relations(products,({one,many})=>({
    comments:many(comments),
    user:one(users,{fields:[products.userId],references:[users.id]}),
}));

//a comment belongs to one user and one product


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


export type user = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Product = typeof users.$inferSelect;
export type NewProduct = typeof users.$inferInsert;

export type Comment = typeof users.$inferSelect;
export type NewComment = typeof users.$inferInsert;



