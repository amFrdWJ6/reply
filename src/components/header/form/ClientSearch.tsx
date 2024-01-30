import { SearchIcon } from "@/components/icons/svg";
import React from "react";

export default function ClientSearch({
  stagedTags,
  onChange,
}: {
  stagedTags: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex w-full flex-row border-x  border-tertiary">
      <input
        type="search"
        name="clientSearch"
        className="w-full bg-quaternary p-2 focus:outline-none focus:ring-0"
        placeholder="Search by tags"
        onChange={onChange}
      />
      <input type="hidden" name="tags" value={stagedTags} />
      <button type="submit" className="bg-primary p-2">
        <SearchIcon />
      </button>
    </div>
  );
}
