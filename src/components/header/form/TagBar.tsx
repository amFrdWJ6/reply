import { ReactNode } from "react";

export default function TagBar({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      className="relative flex h-10  w-full flex-row rounded-t border border-black bg-white"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
