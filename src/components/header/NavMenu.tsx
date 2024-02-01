"use client";

import Link from "next/link";
import { useState } from "react";
import {
  DeleteIcon,
  HamburgerMenu,
  HomeIcon,
  TagIcon,
  UploadIcon,
} from "../icons/svg";

function Menu() {
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
    </>
  );
}

export default function NavMenu() {
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
            <div className="fixed top-14 z-30 flex flex-col gap-4">
              <Menu />
            </div>
          </>
        ) : (
          <HamburgerMenu />
        )}
      </div>

      <div className="hidden flex-row gap-2 md:flex">
        <Menu />
      </div>
    </nav>
  );
}
