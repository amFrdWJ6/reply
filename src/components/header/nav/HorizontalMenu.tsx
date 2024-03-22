import { auth } from "@/auth";
import { SignIn, SignOut } from "@/components/common/AuthButtons";
import BaseMenu from "./BaseMenu";

export async function HorizontalMenu() {
  const session = await auth();
  return (
    <div className="hidden flex-row gap-2 lg:flex">
      <BaseMenu>{session ? <SignOut /> : <SignIn />}</BaseMenu>
    </div>
  );
}
