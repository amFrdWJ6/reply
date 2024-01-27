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
      className="bg-primary text-quaternary rounded p-1 text-sm"
      onClick={onClick}
    >
      {tag.name}
    </span>
  );
}
