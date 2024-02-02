import { ArrowsDownIcon, ArrowsUpIcon } from "@/components/icons/svg";

export default function ArrowIcons({
  isMenuOpen,
  size,
  color,
}: {
  isMenuOpen: boolean;
  size?: number;
  color?: string;
}) {
  return (
    <div>
      {isMenuOpen ? (
        <ArrowsUpIcon size={size} color={color} title="hide tags" />
      ) : (
        <ArrowsDownIcon size={size} color={color} title="show tags" />
      )}
    </div>
  );
}
