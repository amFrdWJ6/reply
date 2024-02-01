"use client";

import Link from "next/link";
import {
  DeleteIcon,
  HamburgerMenu,
  HomeIcon,
  TagIcon,
  UploadIcon,
} from "../icons/svg";
import { useState } from "react";

const links = new Map<JSX.Element, string>([
  [<HomeIcon key={1} />, "/"],
  [<UploadIcon key={2} />, "/upload"],
  [<TagIcon key={3} />, "/tags"],
]);

export default function NavMenu() {
  const [isMenuOpen, setMenuState] = useState<boolean>(false);
  const menu = [...links.entries()].map(([name, url]) => (
    <Link key={url} href={url}>
      {name}
    </Link>
  ));
  return (
    <nav className="relative right-1 top-0 flex flex-row items-center gap-2">
      <div
        className="flex flex-col rounded-md border-2 border-primary md:hidden"
        onClick={() => setMenuState(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <>
            <DeleteIcon color="#ED7D31" size={30} />
            <div className="fixed top-14 z-30 flex flex-col gap-4">{menu}</div>
          </>
        ) : (
          <HamburgerMenu />
        )}
      </div>
      <div className="hidden flex-row gap-2 md:flex">{menu}</div>
    </nav>
  );
}
