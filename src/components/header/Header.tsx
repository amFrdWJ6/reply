import { Suspense } from "react";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import SearchForm from "./SearchForm";
import { placeholders } from "@/lib/const";
import { GetAllTags } from "@/lib/db/queries";
import { auth } from "@/auth";

async function HeaderSkeleton() {
  return (
    <>
      <div></div>
      <nav></nav>
    </>
  );
}

export default async function Header() {
  const session = await auth();
  const allTags = await GetAllTags();
  const placeholder =
    placeholders[Math.floor(Math.random() * placeholders.length)];

  return (
    <header className="flex h-12 w-full flex-row justify-between p-1 md:max-w-4xl lg:max-w-5xl">
      <Logo />
      <Suspense fallback={<HeaderSkeleton />}>
        <SearchForm allTags={allTags} placeholder={placeholder} />
        <NavMenu session={session} />
      </Suspense>
    </header>
  );
}
