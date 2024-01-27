import { ArrowsDownIcon, ArrowsUpIcon } from "@/components/icons/svg";

export default function ArrowIcons({ isMenuOpen }: { isMenuOpen: boolean }) {
  return <div>{isMenuOpen ? <ArrowsUpIcon /> : <ArrowsDownIcon />}</div>;
}
