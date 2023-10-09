import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { billboardId: string };
}): Promise<Metadata> {
  const billboard = await prismadb.billboard.findFirst({
    where: { id: params.billboardId },
  });

  if (params.billboardId === "new") {
    return {
      title: "Create new billboard",
    };
  }

  if (!billboard) {
    return {
      title: "404 | Not Found ",
    };
  }

  return {
    title: `Update | ${billboard.label}`,
    description: `Update billboard ${billboard.label} page`,
  };
}

export default async function BillboardPage({
  params,
}: {
  params: { billboardId: string };
}) {
  const billboard = await prismadb.billboard.findUnique({
    where: { id: params.billboardId },
  });

  return (
    <>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillboardForm initialData={billboard} />
        </div>
      </div>
    </>
  );
}
