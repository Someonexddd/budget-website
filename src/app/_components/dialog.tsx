"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import * as z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";

interface DialogBudgetProps {
    budgetId: number;
}

const formSchema = z.object({
    name: z.string().min(1),
    amount: z.coerce.number().min(1),
    budgetId: z.number(),
});

// Update the handleSubmit function to include the budgetId
const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("amount", data.amount.toString());
        formData.append("budgetId", data.budgetId.toString()); // Use data.budgetId directly

        const res = await fetch("/api/form", {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            console.log("Form submitted successfully");
        } else {
            console.error("Failed to submit form");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
};

export function DialogBudget({ budgetId }: DialogBudgetProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            amount: 0,
            budgetId: budgetId, // Set default value for budgetId
        },
    });

    return (
        <div className="pt-1">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Add Expense Category</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Expense Category</DialogTitle>
                        <DialogDescription>
                            Add an expense category to your budget. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <FormProvider {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col gap-4">
                                    <FormField control={form.control} name="name" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Name" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="amount" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Amount</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} placeholder="Amount" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    {/* budgetId is not rendered in the form UI */}
                                    <DialogFooter>
                                        <Button variant="default" type="submit" className="w-full">Submit</Button>
                                    </DialogFooter>
                                </form>
                            </FormProvider>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="default" className="w-full">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
