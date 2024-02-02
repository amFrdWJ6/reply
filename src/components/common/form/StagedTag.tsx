import { DeleteIcon } from "@/components/icons/svg";

export default function StagedTag({
  tag,
  onClick,
}: {
  tag: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  return (
    <div key={tag} className="flex flex-row items-center p-1">
      <span
        className="rounded-l border-y border-l border-primary bg-secondary p-1 text-sm text-quaternary"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {tag}
      </span>
      <div
        className="rounded-r border-y border-r border-primary bg-tertiary p-1 text-white"
        onClick={onClick}
      >
        <DeleteIcon color="#ED7D31" />
      </div>
    </div>
  );
}
