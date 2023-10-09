"use client";

import { useEffect } from "react";

import { useModalStore } from "@/hook/use-store-modal";

export default function SetupPage() {
  const isOpen = useModalStore((state) => state.isOpen);
  const onOpen = useModalStore((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <>
      <div className="p-4">Root Page</div>
    </>
  );
}
