import * as z from "zod";
import { db } from "~/server/db";
import { ExpenseCategories } from "~/server/db/schema";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    amount: z.number().min(1, "Amount must be greater than zero"),
    budgetId: z.number(),
});

export async function POST(request: Request) {
    
    try {
        const formData = await request.formData();

        // Safely extract and convert form data
        const name = formData.get('name')?.toString().trim();
        const amountString = formData.get('amount')?.toString().trim();
        const budgetIdString = formData.get('budgetId')?.toString().trim();

        // Ensure that required fields are present
        if (!name || !amountString || !budgetIdString) {
            return new Response("Missing required fields", { status: 400 });
        }

        const amount = parseFloat(amountString);
        const budgetId = parseFloat(budgetIdString);

        // Validate data with Zod schema
        const parsedData = {
            name,
            amount,
            budgetId,
        };
        formSchema.parse(parsedData);
        console.log(parsedData);
        // Insert into database
        await db.insert(ExpenseCategories).values({
            name: parsedData.name,
            amount: parsedData.amount.toString(), // Convert amount to string
            budgetid: parsedData.budgetId,
        });

        // Return success response
        return new Response("Ok", { status: 200 });
    } catch (error) {
        console.error("Error processing form data:", error);

        // Return error response
        return new Response("Error processing form data", { status: 400 });
    }
}
