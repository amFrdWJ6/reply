export default function Placeholder({ placeholder }: { placeholder: string }) {
  return (
    <p className="absolute inset-y-0 start-0 items-center p-2 text-slate-500">
      {placeholder}
    </p>
  );
}
