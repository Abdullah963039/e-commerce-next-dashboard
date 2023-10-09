import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { CategoriesClient } from "./components/client";
import { CategoryColumn } from "./components/columns";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs";

export async function generateMetadata({
  params,
}: {
  params: { storeId: string; categoryId: string };
}): Promise<Metadata> {
  const { userId } = auth();

  if (!userId) {
    return {
      title: "401 | Unauthenticated",
    };
  }

  const store = await prismadb.store.findFirst({
    where: { id: params.storeId, userId },
  });

  if (!store) {
    return {
      title: "404 | Not Found ",
    };
  }

  return {
    title: `${store.name} | Categories`,
    description: `Category  of '${store.name}`,
  };
}

export default async function CategoriesPage({
  params,
}: {
  params: { storeId: string };
}) {
  const categories = await prismadb.category.findMany({
    where: { storeId: params.storeId },
    include: { billboard: true },
    orderBy: { createdAt: "desc" },
  });

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
}
