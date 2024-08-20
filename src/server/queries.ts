import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";


export async function getMyBudgets() {

  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const budgets = await db.query.budgets.findMany({
    where: (budget, { eq }) => eq(budget.userId, user.userId),
    orderBy: (budget, { desc }) => desc(budget.id),
  });

  return budgets;
}   