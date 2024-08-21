import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { budgets, ExpenseCategories } from "./db/schema";


export async function getMyBudgets() {

  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const budgets = await db.query.budgets.findMany({
    where: (budget, { eq }) => eq(budget.userId, user.userId),
    orderBy: (budget, { desc }) => desc(budget.id),
  });

  return budgets;
}

export async function getMyExpenseCategories() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const expenseCategories = await db.query.ExpenseCategories.findMany({
    where: (expenseCategory, { eq }) => eq(expenseCategory.budgetid, budgets.id),
    orderBy: (expenseCategory, { desc }) => desc(expenseCategory.id),
  });

  return expenseCategories;
} 

export async function getMyExpenses() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const expenses = await db.query.Expenses.findMany({
    where: (expense, { eq }) => eq(expense.expenseCategoryid, ExpenseCategories.id),
    orderBy: (expense, { desc }) => desc(expense.id),
  });

  return expenses;
}