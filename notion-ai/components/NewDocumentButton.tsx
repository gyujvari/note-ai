"use client";

import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createDocument } from "@/actions";

export default function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleCreateDocument = () => {
    startTransition(async () => {
      const { docId } = await createDocument();
      router.push(`/document/${docId}`);
    });
  };
  return (
    <Button disabled={isPending} onClick={handleCreateDocument}>
      {isPending ? "Creating..." : "New Document"}
    </Button>
  );
}
