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
    <div className="flex w-full flex-row border-x border-black">
      <input
        type="search"
        name="clientSearch"
        className="w-full p-2"
        placeholder="Search by tags"
        onChange={onChange}
      />
      <input type="hidden" name="tags" value={stagedTags} />
      <button type="submit" className="border border-black bg-white p-2">
        <SearchIcon />
      </button>
    </div>
  );
}
