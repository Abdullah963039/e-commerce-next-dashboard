import { format } from "date-fns";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

import { ColorClient } from "./components/client";
import { ColorColumn } from "./components/columns";

//? Metadata
export async function generateMetadata({
  params,
}: {
  params: { storeId: string };
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
    title: `${store.name} | Colors`,
    description: `Colors of '${store.name}`,
  };
}

export default async function ColorsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const colors = await prismadb.color.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  const formattedColors: ColorColumn[] = colors.map((colors) => ({
    id: colors.id,
    name: colors.name,
    value: colors.value,
    createdAt: format(colors.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
}
