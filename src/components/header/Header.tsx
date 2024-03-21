import { Suspense } from "react";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import SearchForm from "./SearchForm";
import { placeholders } from "@/lib/const";
import { getAllTags } from "@/lib/db/queries";

async function SearchFormSkeleton() {
  return (
    <div className="absolute left-1/2 top-1 z-50 h-10 w-full max-w-64 -translate-x-1/2 animate-pulse rounded bg-gray-200 shadow-lg sm:max-w-md  md:max-w-lg dark:bg-primary"></div>
  );
}

export default async function Header() {
  const allTags = await getAllTags();
  const placeholder =
    placeholders[Math.floor(Math.random() * placeholders.length)];

  return (
    <header className="flex h-12 w-full flex-row justify-between p-1 md:max-w-4xl lg:max-w-5xl">
      <Logo />
      <Suspense fallback={<SearchFormSkeleton />}>
        <SearchForm allTags={allTags} placeholder={placeholder} />
      </Suspense>
      <NavMenu />
    </header>
  );
}
