import { DeleteIcon } from "@/components/icons/svg";

export default function StagingTag({
  tag,
  onClick,
}: {
  tag: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  return (
    <div key={tag} className="flex flex-row items-center p-1">
      <span
        className="bg-secondary text-quaternary rounded-l p-1 text-sm"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {tag}
      </span>
      <div className="bg-tertiary rounded-r p-1 text-white" onClick={onClick}>
        <DeleteIcon color="#ED7D31" />
      </div>
    </div>
  );
}
