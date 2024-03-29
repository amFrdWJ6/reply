import Link from "next/link";
import { NextPageIcon, PrevPageIcon } from "../icons/svg";

export default async function ServerPagination({
  urlPath,
  currentPage,
  prevPage = false,
  nextPage = false,
}: {
  urlPath: string;
  currentPage: number;
  prevPage: boolean;
  nextPage: boolean;
}) {
  return (
    <div className="flex flex-row items-center justify-center gap-4 p-2">
      {prevPage ? (
        <Link href={`/${urlPath}/${currentPage - 1}`}>
          <PrevPageIcon />
        </Link>
      ) : (
        <PrevPageIcon color="#4F4A45" />
      )}
      <span>{currentPage}</span>
      {nextPage ? (
        <Link href={`/${urlPath}/${+currentPage + +1}`}>
          <NextPageIcon />
        </Link>
      ) : (
        <NextPageIcon color="#4F4A45" />
      )}
    </div>
  );
}
