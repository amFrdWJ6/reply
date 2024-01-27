import { DeleteIcon } from "@/components/icons/svg";

export default function DeleteTags({
  onClick,
}: {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  return (
    <div onClick={onClick}>
      <DeleteIcon />
    </div>
  );
}
