"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import React from "react";

export default function Header() {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between p-5">
      {user && <h1 className="text-2xl">{user.firstName}'s space</h1>}
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
