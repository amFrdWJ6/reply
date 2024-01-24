import { ArrowsDownIcon, ArrowsUpIcon } from "@/components/icons/svg";

export default function ArrowIcons({ isMenuOpen }: { isMenuOpen: boolean }) {
  return (
    <div className="absolute inset-y-0 end-0 items-center px-2 py-2.5">
      {isMenuOpen ? <ArrowsUpIcon /> : <ArrowsDownIcon />}
    </div>
  );
}
