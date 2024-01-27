import { ReactNode } from "react";

export default function TagBar({
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
      className={`relative flex h-10 w-full flex-row overflow-hidden ${isSearchBarOpen ? "rounded-t" : "rounded"} border-tertiary bg-primary text-quaternary border`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
