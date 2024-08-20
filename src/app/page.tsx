import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Progress } from "~/components/ui/progress";


async function Budgets() {
  return(
    <div className="flex flex-wrap gap-4 justify-center items-center text-4xl font-bold">
      Test
      <Progress value={50}/>
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="p-4">
      <SignedOut>
        <div className="h-full w-full text-2xl text-center">Please sign in above</div>
      </SignedOut>
      <SignedIn>
        <Budgets />
      </SignedIn>
    </main>
  );
}
