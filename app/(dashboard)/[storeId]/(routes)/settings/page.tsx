import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

import { SettingsForm } from "./components/settings-form";

interface SettingsPageProps {
  params: { storeId: string };
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: { storeId: string };
}): Promise<Metadata> {
  const { userId } = auth();

  if (!userId) return { title: "401 | Unauthenticated" };

  const store = await prismadb.store.findFirst({
    where: { id: params.storeId, userId },
  });

  if (!store)
    return {
      title: "404 | Not Found",
    };

  return {
    title: `Settings | ${store.name}`,
    description: `Settings page of ${store.name} store`,
  };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: { id: params.storeId, userId },
  });

  if (!store) redirect("/");

  return (
    <>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <SettingsForm initialData={store} />
        </div>
      </div>
    </>
  );
}
