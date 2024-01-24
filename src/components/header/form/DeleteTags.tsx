import { DeleteIcon } from "@/components/icons/svg";

export default function DeleteTags({
  onClick,
}: {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  return (
    <div
      className="absolute inset-y-0 end-5 items-center px-2 py-2.5"
      onClick={onClick}
    >
      <DeleteIcon />
    </div>
  );
}
