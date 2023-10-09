import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { MainNav } from "@/components/main-nav";
import { StoreSwicher } from "@/components/store-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import prismadb from "@/lib/prismadb";

export async function Navbar() {
  const { userId } = auth();

  if (!userId) {
    redirect("sign-in");
  }

  const stores = await prismadb.store.findMany({ where: { userId } });

  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-4 gap-8">
          <StoreSwicher items={stores} />
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </>
  );
}
