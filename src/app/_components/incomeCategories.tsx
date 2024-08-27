import { getMyIncomeCategories } from "~/server/queries";


type budgetType = {
    id: number;
    userId: string;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    resetDay: string | null;
}

export async function IncomeCategories({budget} : {budget: budgetType}) {

    const incomeCategories = await getMyIncomeCategories();

  return (
    <>
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
    </>
  );
}