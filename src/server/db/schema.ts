import { sql } from "drizzle-orm";
import {
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  numeric,
} from "drizzle-orm/pg-core";

// Table creator with schema prefix (if needed)
export const createTable = pgTableCreator((name) => `t3-budget_${name}`);

// Budgets table
export const budgets = createTable("budgets", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date()
  ),
});


export const ExpenseCategories = createTable("ExpenseCategories", {
  id: serial("id").primaryKey(),
  budgetid: serial("budget_id")
  .references(() => budgets.id)
  .notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  amount: numeric("amount").notNull(),
});

export const Expenses = createTable("Expenses", {
  id: serial("id").primaryKey(),
  expenseCategoryid: serial("expense_category_id")
  .references(() => ExpenseCategories.id)
  .notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  amount: numeric("amount").notNull(),
});
