import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}): Promise<Metadata> {
  const product = await prismadb.product.findFirst({
    where: { id: params.productId },
  });

  if (params.productId === "new") {
    return {
      title: "Create new product",
    };
  }

  if (!product) {
    return {
      title: "404 | Not Found ",
    };
  }

  return {
    title: `Update | ${product.name}`,
    description: `Update product ${product.name} page`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { productId: string; storeId: string };
}) {
  const product = await prismadb.product.findUnique({
    where: { id: params.productId },
    include: { images: true },
  });

  const categories = await prismadb.category.findMany({
    where: { storeId: params.storeId },
  });

  const sizes = await prismadb.size.findMany({
    where: { storeId: params.storeId },
  });

  const colors = await prismadb.color.findMany({
    where: { storeId: params.storeId },
  });

  return (
    <>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductForm
            initialData={product}
            categories={categories}
            colors={colors}
            sizes={sizes}
          />
        </div>
      </div>
    </>
  );
}
