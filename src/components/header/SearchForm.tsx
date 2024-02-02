"use client";

import type { RTag } from "@/lib/db/schema";
import { useFormState } from "react-dom";
import { handleSearchForm } from "@/lib/actions";
import { useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Placeholder from "./form/Placeholder";
import TagBar from "./form/TagBar";
import ArrowIcons from "./form/ArrowIcons";
import RemoveStagedTags from "./form/RemoveStagedTags";
import StagingTag from "./form/StagingTag";
import FilterTagsInput from "./form/FilterTagsInput";
import ListedTag from "./form/ListedTag";

export default function SearchForm({
  allTags,
  placeholder,
}: {
  allTags: RTag[];
  placeholder: string;
}) {
  const queriedTags = useSearchParams().get("tags")?.split(",") || [];
  const availableTags = allTags.map((tag) => tag.name);
  const [stagedTags, setStagedTags] = useState<string[]>(
    queriedTags.filter((tag) => availableTags.includes(tag)),
  );
  const [filterTags, setFilterTags] = useState<string>("");
  const [isSearchBarOpen, setSearchBarState] = useState<boolean>(false);
  const [_, formAction] = useFormState(handleSearchForm, null);

  if (usePathname() != "/") {
    return null;
  }

  return (
    <form
      action={formAction}
      className="absolute left-1/2 top-1 z-50 w-full max-w-64 -translate-x-1/2 shadow-lg sm:max-w-md md:max-w-lg"
      onSubmit={() => setSearchBarState(false)}
    >
      <TagBar
        onClick={() => {
          setSearchBarState(!isSearchBarOpen);
          setFilterTags("");
        }}
        isSearchBarOpen={isSearchBarOpen}
      >
        <div className="flex w-[calc(100%-54px)] overflow-hidden overflow-x-auto">
          {stagedTags.length ? (
            stagedTags.map((tag) => (
              <StagingTag
                key={tag}
                tag={tag}
                onClick={(event) => {
                  event.stopPropagation();
                  setSearchBarState(true);
                  setStagedTags((prev) => [
                    ...prev.filter((stagedTag) => stagedTag !== tag),
                  ]);
                }}
              />
            ))
          ) : (
            <Placeholder placeholder={placeholder} />
          )}

          <div className="absolute inset-y-0 end-0 flex flex-row items-center px-2 py-2.5">
            {stagedTags.length > 0 ? (
              <RemoveStagedTags
                onClick={(event) => {
                  event.stopPropagation();
                  setSearchBarState(true);
                  setStagedTags([]);
                }}
              />
            ) : null}
            <ArrowIcons isMenuOpen={isSearchBarOpen} />
          </div>
        </div>
      </TagBar>
      {isSearchBarOpen && (
        <>
          <FilterTagsInput
            stagedTags={stagedTags}
            onChange={(e) => setFilterTags(e.target.value)}
          />
          <div className="flex h-max w-full flex-row flex-wrap gap-2 rounded-b border border-tertiary bg-secondary p-2">
            {allTags
              .filter((tag) => !stagedTags.includes(tag.name))
              .filter((tag) => tag.name.includes(filterTags))
              .map((tag) =>
                tag ? (
                  <ListedTag
                    key={tag.name}
                    tag={tag}
                    onClick={() => {
                      setStagedTags((prev) => [
                        ...new Set([...prev, tag.name]),
                      ]);
                    }}
                  />
                ) : (
                  <p key="pica">Picaaa</p>
                ),
              )}
          </div>
        </>
      )}
    </form>
  );
}
