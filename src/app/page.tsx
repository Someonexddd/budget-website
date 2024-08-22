import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { Budgets } from "./_components/budgets";

export const dynamic = "force-dynamic";

export const fetchCache = 'force-no-store' 


export default function HomePage() {

  return (
    <main className="p-6">
      <SignedOut>
        <div className="h-full w-full text-2xl text-center">Please sign in above</div>
      </SignedOut>
      <SignedIn>
        <Budgets />

        
      </SignedIn>
    </main>
  );
}
