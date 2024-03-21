"use client";
import { Session } from "next-auth";
import { useState } from "react";
import { DeleteIcon, HamburgerMenuIcon } from "@/components/icons/svg";
import { SignIn, SignOut } from "@/components/common/AuthButtons";
import BaseMenu from "./BaseMenu";

export function HamburgerMenu({ session }: { session: Session | null }) {
  const [isHamburgerMenuOpen, setHamburgerMenuState] = useState<boolean>(false);

  return (
    <div
      className="flex flex-col rounded-md border-2 border-primary md:hidden"
      onClick={() => setHamburgerMenuState(!isHamburgerMenuOpen)}
    >
      {isHamburgerMenuOpen ? (
        <>
          <DeleteIcon color="#ED7D31" size={30} />
          <div className="fixed right-1 top-14 z-30 flex flex-col gap-4 rounded-md bg-tertiary p-2">
            <BaseMenu>{session ? <SignOut /> : <SignIn />}</BaseMenu>
          </div>
        </>
      ) : (
        <HamburgerMenuIcon />
      )}
    </div>
  );
}
