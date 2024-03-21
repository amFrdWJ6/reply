import Link from "next/link";
import { ReactNode } from "react";
import { HomeIcon, LogIcon, TagIcon, UploadIcon } from "@/components/icons/svg";

export default function BaseMenu({ children }: { children: ReactNode }) {
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
