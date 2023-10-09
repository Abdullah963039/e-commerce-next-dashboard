import prismadb from "@/lib/prismadb";
import { ColorForm } from "./components/color-form";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { colorId: string };
}): Promise<Metadata> {
  const color = await prismadb.color.findFirst({
    where: { id: params.colorId },
  });

  if (params.colorId === "new") {
    return {
      title: "Create new color",
    };
  }

  if (!color) {
    return {
      title: "404 | Not Found ",
    };
  }

  return {
    title: color.name,
    description: `${color.name} dashboard`,
  };
}

export default async function SizePage({
  params,
}: {
  params: { colorId: string };
}) {
  const color = await prismadb.color.findUnique({
    where: { id: params.colorId },
  });

  return (
    <>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ColorForm initialData={color} />
        </div>
      </div>
    </>
  );
}
