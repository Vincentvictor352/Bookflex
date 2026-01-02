import {
  uuid,
  pgTable,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

// Users table
export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  points: integer("points").notNull().default(0),
  country: text(),
  role: varchar({ length: 50 }).default("user"),
  otp: text(),
  expiretime: timestamp("expiretime"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// User sessions table
export const userSession = pgTable("user_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  accessToken: text().notNull().unique(),
  refreshToken: text().notNull().unique(),
  ip_address: text("ip_address"),
  lastSeen: timestamp("last_seen").defaultNow(),
});

// Books table
export const booksTable = pgTable("books", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text().notNull(),
  author: text().notNull(),
  filePath: text().notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  filePublicId: text().notNull(),
  coverphoto: text().notNull(),
  coverPublicId: text().notNull(),
  pageCount: integer("page_count"),
  createdAt: timestamp("created_at").defaultNow(),
});
