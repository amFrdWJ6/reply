import Logo from "./Logo";
import NavMenu from "./NavMenu";
import SearchForm from "./SearchForm";
import { placeholders } from "@/lib/const";
import { GetAllTags } from "@/lib/db/queries";

export default async function Header() {
  const allTags = await GetAllTags();
  return (
    <header className="flex h-12 w-full flex-row justify-between p-1 md:max-w-4xl lg:max-w-5xl">
      <Logo />
      <SearchForm
        allTags={allTags}
        placeholder={
          placeholders[Math.floor(Math.random() * placeholders.length)]
        }
      />
      <NavMenu />
    </header>
  );
}
