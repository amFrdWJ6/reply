import { ReactNode } from "react";

export default function StagedTagsBar({
  children,
  onClick,
  isSearchBarOpen,
}: {
  children: ReactNode;
  onClick: () => void;
  isSearchBarOpen: boolean;
}) {
  return (
    <div
      className={`${isSearchBarOpen ? "rounded-t" : "rounded"} relative flex h-10 w-full flex-row overflow-hidden border border-tertiary bg-primary text-quaternary`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
