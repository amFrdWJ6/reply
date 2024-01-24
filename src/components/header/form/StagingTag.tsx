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
        className=" rounded-l bg-slate-500 p-1 text-sm text-white"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {tag}
      </span>
      <div className="rounded-r bg-slate-500 p-1 text-white" onClick={onClick}>
        <DeleteIcon />
      </div>
    </div>
  );
}
