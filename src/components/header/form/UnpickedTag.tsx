export default function UnpickedTag({
  tag,
  onClick,
}: {
  tag: { id: number; name: string };
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  return (
    <span
      key={tag.id}
      className="rounded bg-primary p-1 text-sm text-quaternary"
      onClick={onClick}
    >
      {tag.name}
    </span>
  );
}
