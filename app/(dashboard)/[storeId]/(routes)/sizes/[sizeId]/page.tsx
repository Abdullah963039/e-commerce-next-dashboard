import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/size-form";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { sizeId: string };
}): Promise<Metadata> {
  const size = await prismadb.size.findFirst({
    where: { id: params.sizeId },
  });

  if (params.sizeId === "new") {
    return {
      title: "Create new size",
    };
  }

  if (!size) {
    return {
      title: "404 | Not Found ",
    };
  }

  return {
    title: size.name,
    description: `${size.name} dashboard`,
  };
}

export default async function SizePage({
  params,
}: {
  params: { sizeId: string };
}) {
  const size = await prismadb.size.findUnique({
    where: { id: params.sizeId },
  });

  return (
    <>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <SizeForm initialData={size} />
        </div>
      </div>
    </>
  );
}
