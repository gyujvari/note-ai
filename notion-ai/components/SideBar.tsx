"use client";

import React, { useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import NewDocumentButton from "./NewDocumentButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { adminDb } from "@/firebase-admin";
import { useUser } from "@clerk/nextjs";
import {
  DocumentData,
  collectionGroup,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

export default function SideBar() {
  const { user }: any = useUser();
  const [groupedData, setGroupedData] = React.useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });
  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString()) // Fix here
      )
  );
  useEffect(() => {
    if (!data) return;

    const groups = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const room = curr.data() as RoomDocument;
        if (room.role === "owner") {
          acc.owner.push({ id: curr.id, ...room });
        } else {
          acc.editor.push({ id: curr.id, ...room });
        }
        return acc;
      },
      {
        owner: [],
        editor: [],
      }
    );
    setGroupedData(groups);
  }, [data]);

  const menuOptions = (
    <>
      <NewDocumentButton />
      {groupedData.owner.length === 0 ? (
        <h2 className="text-center">No Documents</h2>
      ) : (
        <div className="flex flex-col gap-2">
          <h2 className="text-center">Documents</h2>
          {groupedData.owner.map((room) => (
            <div
              key={room.roomId}
              className="flex flex-col gap-2 p-2 border rounded-lg"
            >
              <h3>{room.roomId}</h3>
            </div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className="p-2 md:p-5 bg-gray-100 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-50 rounded-lg" size={40} />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div></div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
}
