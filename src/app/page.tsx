import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";


async function Budgets() {
  return(
    <div className="flex flex-wra gap-4">
      Test
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-2xl text-center">Please sign in above</div>
      </SignedOut>
      <SignedIn>
        <Budgets />
      </SignedIn>
    </main>
  );
}
