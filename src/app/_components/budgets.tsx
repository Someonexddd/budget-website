import { Progress } from "~/components/ui/progress";
import { getMyBudgets, getMyExpenseCategories, getMyExpenses } from "~/server/queries";



export async function Budgets() {
  const budgets = await getMyBudgets();
  const expenseCategories = await getMyExpenseCategories();
  const expenses = await getMyExpenses();

  return (
    <div className="flex flex-col flex-wrap gap-4 justify-center items-center text-4xl font-bold">
      {budgets.map((budget) => (
        <div key={budget.id} className="w-full">
          <h2>{budget.name}</h2>

          {expenseCategories
            .filter((category) => category.budgetid === budget.id)
            .map((category) => {
              // Calculate total expenses for this category
              const totalExpenses = expenses
                .filter((expense) => expense.expenseCategoryid === category.id)
                .reduce((sum, expense) => sum + parseFloat(expense.amount), 0); // Convert amount to number

              // Calculate progress as a percentage
              const progressValue = (totalExpenses / parseFloat(category.amount)) * 100;

              return (
                <div key={category.id} className="mb-2">
                  <div>{category.name}</div>
                  <Progress value={progressValue} max={100} />
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
}
