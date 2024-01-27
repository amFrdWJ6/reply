export default function Placeholder({ placeholder }: { placeholder: string }) {
  return (
    <p className="text-quaternary absolute inset-y-0 start-0 w-[calc(100%-24px)] items-center truncate p-2">
      {placeholder}
    </p>
  );
}
