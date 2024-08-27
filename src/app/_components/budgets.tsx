
import { getMyBudgets } from "~/server/queries";
import { ExpenseCategories } from "./expenseCategories";
import { IncomeCategories } from "./incomeCategories";

export const dynamic = "force-dynamic";

export async function Budgets() {
  const budgets = await getMyBudgets();

  return (
    <div className="flex flex-col flex-wrap gap-4 justify-center items-center text-6xl font-bold">
      {budgets.map((budget) => (
        <div key={budget.id} className="w-full flex justify-center items-center flex-col">
          <h2 className="text-center pb-2">{budget.name}</h2>

          <IncomeCategories budget={budget} />

          <ExpenseCategories budget={budget} />
          

        </div>
      ))}
    </div>
  );
}
