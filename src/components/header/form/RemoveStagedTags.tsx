import { DeleteIcon } from "@/components/icons/svg";

export default function RemoveStagedTags({
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
