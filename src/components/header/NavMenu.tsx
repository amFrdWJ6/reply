"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import {
  DeleteIcon,
  HamburgerMenu,
  HomeIcon,
  LogIcon,
  TagIcon,
  UploadIcon,
} from "../icons/svg";
import { SignIn, SignOut } from "../common/AuthButtons";
import { Session } from "next-auth";

function Menu({ children }: { children: ReactNode }) {
  return (
    <>
      <Link href={`/`}>
        <HomeIcon />
      </Link>
      <Link href={`/upload`}>
        <UploadIcon />
      </Link>
      <Link href={`/tags`}>
        <TagIcon />
      </Link>
      <Link href={`/log`}>
        <LogIcon />
      </Link>
      {children}
    </>
  );
}

export default function NavMenu({ session }: { session: Session | null }) {
  const [isHamburgerMenuOpen, setHamburgerMenuState] = useState<boolean>(false);

  return (
    <nav className="relative right-1 top-0 flex flex-row items-center gap-2">
      <div
        className="flex flex-col rounded-md border-2 border-primary md:hidden"
        onClick={() => setHamburgerMenuState(!isHamburgerMenuOpen)}
      >
        {isHamburgerMenuOpen ? (
          <>
            <DeleteIcon color="#ED7D31" size={30} />
            <div className="fixed right-1 top-14 z-30 flex flex-col gap-4 rounded-md bg-tertiary p-2">
              <Menu>{session ? <SignOut /> : <SignIn />}</Menu>
            </div>
          </>
        ) : (
          <HamburgerMenu />
        )}
      </div>

      <div className="hidden flex-row gap-2 md:flex">
        <Menu>{session ? <SignOut /> : <SignIn />}</Menu>
      </div>
    </nav>
  );
}
