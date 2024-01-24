"use client";

import type { RTag } from "@/lib/db/schema";
import {
  ArrowsDownIcon,
  ArrowsUpIcon,
  DeleteIcon,
  SearchIcon,
} from "../icons/svg";
import { useFormState } from "react-dom";
import { handleSearchForm } from "@/lib/actions";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Placeholder from "./form/Placeholder";
import TagBar from "./form/TagBar";
import ArrowIcons from "./form/ArrowIcons";
import DeleteTags from "./form/DeleteTags";
import StagingTag from "./form/StagingTag";

export default function SearchForm({
  allTags,
  placeholder,
}: {
  allTags: RTag[];
  placeholder: string;
}) {
  const tagsFromURL = useSearchParams().get("tags")?.split(",") || [];
  const [stagedTags, setStagedTags] = useState<string[]>(
    allTags
      .filter((tag) => tagsFromURL.includes(tag.name))
      .map((tag) => tag.name),
  );
  const [clientFilterTags, setClientFilterTags] = useState<string>("");
  const [isSearchBarOpen, setSearchBarState] = useState<boolean>(false);
  const [_, formAction] = useFormState(handleSearchForm, null);

  return (
    <form
      action={formAction}
      className="absolute left-1/2 top-0 w-1/2 -translate-x-1/2"
      onSubmit={() => setSearchBarState(false)}
    >
      <TagBar
        onClick={() => {
          setSearchBarState(!isSearchBarOpen);
          setClientFilterTags("");
        }}
      >
        <>
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

          {stagedTags.length ? (
            <DeleteTags
              onClick={(event) => {
                event.stopPropagation();
                setSearchBarState(true);
                setStagedTags([]);
              }}
            />
          ) : null}
          <ArrowIcons isMenuOpen={isSearchBarOpen} />
        </>
      </TagBar>
      {isSearchBarOpen && (
        <>
          <div className="flex w-full flex-row border-x border-black">
            <input
              type="search"
              name="clientSearch"
              className="w-full p-2"
              placeholder="Search by tags"
              onChange={(e) => setClientFilterTags(e.target.value)}
            />
            <input type="hidden" name="tags" value={stagedTags} />
            <button type="submit" className="border border-black bg-white p-2">
              <SearchIcon />
            </button>
          </div>
          <div className="flex h-max w-full flex-row flex-wrap gap-2 rounded-b border border-black bg-white p-2 ">
            {allTags
              .filter((tag) => !stagedTags.includes(tag.name))
              .filter((tag) => tag.name.includes(clientFilterTags))
              .map((tag) =>
                tag ? (
                  <span
                    key={tag.id}
                    className="rounded bg-slate-500 p-1 text-sm text-white"
                    onClick={() => {
                      setStagedTags((prev) => [
                        ...new Set([...prev, tag.name]),
                      ]);
                    }}
                  >
                    {tag.name}
                  </span>
                ) : (
                  <p key="no-more-tags">no more tags</p>
                ),
              )}
          </div>
        </>
      )}
    </form>
  );
}
