import IconsExplained from "./IconsExplained";

export default async function LoginRequired({ action }: { action: string }) {
  return (
    <>
      <div className="flex w-full flex-col gap-2 text-xl">
        <p>Hey, memelord! You have to be signed in to {action}.</p>
        <p>Click in menu (top-right) to sign in with your GitHub account.</p>
        <span className="pr-2 text-primary">Be aware!</span>
        <p className="flex flex-row items-center">
          Your actions (adding tag or reply) are recorded and visible to anyone.
          See log by clicking on in menu.
        </p>
      </div>

      <div className="mt-4 flex w-full justify-center">
        <IconsExplained />
      </div>
    </>
  );
}
