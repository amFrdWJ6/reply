export default function Placeholder({ msg }: { msg: string }) {
  return (
    <p className="absolute inset-y-0 start-0 w-[calc(100%-24px)] items-center truncate p-2 text-quaternary">
      {msg}
    </p>
  );
}
