import { Metadata } from "next";

import prismadb from "@/lib/prismadb";

import { CategoryForm } from "./components/category-form";

export async function generateMetadata({
  params,
}: {
  params: { categoryId: string };
}): Promise<Metadata> {
  const category = await prismadb.category.findFirst({
    where: { id: params.categoryId },
  });

  if (params.categoryId === "new") {
    return {
      title: "Create new category",
    };
  }

  if (!category) {
    return {
      title: "404 | Not Found ",
    };
  }

  return {
    title: `Update | ${category.name}`,
    description: `Update category ${category.name} page`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) {
  const category = await prismadb.category.findUnique({
    where: { id: params.categoryId },
  });

  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId },
  });

  return (
    <>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <CategoryForm billboards={billboards} initialData={category} />
        </div>
      </div>
    </>
  );
}
