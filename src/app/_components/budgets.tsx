
import { Progress } from "~/components/ui/progress";
import { getMyBudgets, getMyExpenseCategories, getMyExpenses, getMyIncomeCategories } from "~/server/queries";
import { DialogBudget } from "./dialog";
export const dynamic = "force-dynamic";

export const fetchCache = 'force-no-store' 


export async function Budgets() {
  const budgets = await getMyBudgets();
  const expenseCategories = await getMyExpenseCategories();
  const expenses = await getMyExpenses();
  const incomeCategories = await getMyIncomeCategories();

  console.log(expenseCategories);
  return (
    <div className="flex flex-col flex-wrap gap-4 justify-center items-center text-6xl font-bold">
      {budgets.map((budget) => (
        <div key={budget.id} className="w-full flex justify-center items-center flex-col">
          <h2 className="text-center pb-2">{budget.name}</h2>

          <h3 className="text-3xl text-center underline pb-4">Incomes</h3>
          <div className="bg-red-900 rounded-lg p-4 flex flex-col gap-4 w-full justify-center items-center">
            {incomeCategories
              .filter((category) => category.budgetid === budget.id)
              .map((category) => {
                // Calculate total income for this category
                const totalIncome = incomeCategories
                  .filter((income) => income.budgetid === category.id)
                  .reduce((sum, income) => sum + parseFloat(income.amount), 0); // Convert amount to number

                return (
                  <div key={category.id} className="pb-2 w-6/12 flex justify-center items-center flex-col">
                    <div className="text-center text-2xl">{category.name} - {totalIncome}</div>
                  </div>
                );
              })}
          </div>
          
          
          <h3 className="text-3xl text-center underline pb-4">Expenses</h3>
          <div className="bg-red-900 rounded-lg p-4 flex flex-col gap-4 w-full justify-center items-center">
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
                  <div key={category.id} className="pb-2 w-6/12 flex justify-center items-center flex-col">
                    <div className="text-center text-2xl pb-2">{category.name} - {category.amount}</div>
                    <Progress value={progressValue} max={100} />
                    
                  </div>
                );
              })}
              <DialogBudget budgetId={budget.id} />
            </div>
        </div>
      ))}
    </div>
  );
}
