"use client";

import { MouseEventHandler, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NextPageIcon, PrevPageIcon } from "../icons/svg";

const getPage = (page: string | null): number => {
  return page != null && /^[0-9]*$/.test(page) ? parseInt(page) : 0;
};

export default function ClientPagination({ more }: { more: boolean }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [page, setPage] = useState<number>(() => {
    return getPage(searchParams.get("page"));
  });

  const handleRoutingPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    setPage(newPage);
    params.set("page", newPage.toString());

    if (searchParams.get("tags")) {
      params.set("tags", searchParams.get("tags")!);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-row items-center justify-center gap-4 p-2">
      {page > 0 ? (
        <button onClick={() => handleRoutingPage(page - 1)}>
          <PrevPageIcon />
        </button>
      ) : (
        <PrevPageIcon color="#4F4A45" />
      )}
      <span>{page}</span>
      {page === 0 && more ? (
        <button onClick={() => handleRoutingPage(page + 1)}>
          <NextPageIcon />
        </button>
      ) : (
        <NextPageIcon color="#4F4A45" />
      )}
    </div>
  );
}
