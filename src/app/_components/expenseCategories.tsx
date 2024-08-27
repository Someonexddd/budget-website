import { getMyExpenseCategories, getMyExpenses } from "~/server/queries";
import { Progress } from "~/components/ui/progress";
import { DialogBudget } from "./dialog";
export const dynamic = "force-dynamic";


type budgetType = {
    id: number;
    userId: string;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    resetDay: string | null;
}

export async function ExpenseCategories({budget}: {budget: budgetType}) {

    const expenseCategories = await getMyExpenseCategories();
    const expenses = await getMyExpenses();

  return (
    <>
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
      </>
  );
}