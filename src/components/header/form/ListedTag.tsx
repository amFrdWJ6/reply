export default function ListedTag({
  tag,
  onClick,
}: {
  tag: { id: number; name: string };
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  return (
    <span
      key={tag.id}
      className="rounded bg-slate-500 p-1 text-sm text-white"
      onClick={onClick}
    >
      {tag.name}
    </span>
  );
}
