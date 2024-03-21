import { auth } from "@/auth";
import { HamburgerMenu } from "./nav/HamburgerMenu";
import { HorizontalMenu } from "./nav/HorizontalMenu";

export default async function NavMenu() {
  const session = await auth();

  return (
    <nav className="relative right-1 top-0 flex flex-row items-center gap-2">
      <HamburgerMenu session={session} />
      <HorizontalMenu />
    </nav>
  );
}
