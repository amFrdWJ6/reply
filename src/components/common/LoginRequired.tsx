import { LogIcon, LoginIcon } from "../icons/svg";

export default async function LoginRequired({ action }: { action: string }) {
  return (
    <div className="flex w-full flex-col gap-2 text-xl">
      <p>Hey, memelord! You have to be signed in to {action}.</p>
      <p className="flex flex-row items-center gap-2 text-xl">
        Click <LoginIcon /> in menu (top-right) to sign in with your GitHub
        account.
      </p>
      <p className="flex flex-row items-center">
        <span className="pr-2 text-primary">Be aware!</span> Your actions
        (adding tag or reply) are recorded and visible to anyone. See log by
        clicking on <LogIcon /> in menu.
      </p>
    </div>
  );
}
