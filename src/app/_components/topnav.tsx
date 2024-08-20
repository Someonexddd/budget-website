"use client";

import { SignedIn, SignedOut, SignInButton,UserButton } from "@clerk/nextjs";
import { UploadButton } from "../utils/uploadthing";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";






export function TopNav() {
  const router = useRouter();

  return (
    <nav className="flex w-full items-center justify-between p-4 text-xl font-semibold border-b ">
      <Button variant={"link"} onClick={() => router.push("/")}>Gallery</Button>
      <div className="flex flex-row">
          <SignedOut>
              <SignInButton/>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>        
        </div>
    </nav>
    );
}