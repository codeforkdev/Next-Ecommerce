import {
  text,
  serial,
  mysqlTable,
  varchar,
  char,
  decimal,
  timestamp,
  int,
} from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
  id: serial("id"),
  name: text("name"),
  email: text("email"),
});

export const product = mysqlTable("product", {
  id: char("id", { length: 21 }).notNull().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  count: int("count").notNull().default(0),
});

export const productImages = mysqlTable("product_images", {
  id: char("id", { length: 21 }).notNull().primaryKey(),
  productId: char("product_id", { length: 21 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
});

export const productReviews = mysqlTable("product_reviews", {
  id: char("id", { length: 21 }).notNull().primaryKey(),
  productId: char("product_id", { length: 21 }).notNull(),
  userId: char("user_id", { length: 21 }).notNull(),
  stars: int("starts").notNull().default(0),
});
