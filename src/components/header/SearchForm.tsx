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

export default function SearchForm({
  allTags,
  placeholder,
}: {
  allTags: RTag[];
  placeholder: string;
}) {
  const [_, formAction] = useFormState(handleSearchForm, null);
  const [isSearchBarOpen, setSearchBarOpen] = useState<boolean>(false);
  const searchedTags = useSearchParams().get("tags")?.split(",") || [];
  const [stagedTags, setStagedTags] = useState<string[]>(
    allTags
      .filter((tag) => searchedTags.includes(tag.name))
      .map((tag) => tag.name),
  );
  const [greatFilter, setGreatFilter] = useState<string>("");

  return (
    <form
      action={formAction}
      className="absolute left-1/2 top-0 w-1/2 -translate-x-1/2"
      onSubmit={() => setSearchBarOpen(false)}
    >
      <div
        className="relative flex h-10  w-full flex-row rounded-t border border-black bg-white"
        onClick={() => {
          setSearchBarOpen(!isSearchBarOpen);
        }}
      >
        {stagedTags.length ? (
          stagedTags.map((tag) => (
            <div key={tag} className="flex flex-row items-center p-1">
              <span
                className=" rounded-l bg-slate-500 p-1 text-sm text-white"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {tag}
              </span>
              <button
                className="rounded-r bg-slate-500 p-1 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setStagedTags((prev) => [
                    ...prev.filter((stagedTag) => stagedTag !== tag),
                  ]);
                }}
              >
                <DeleteIcon />
              </button>
            </div>
          ))
        ) : (
          <p className="absolute inset-y-0 start-0 items-center p-2 text-slate-500">
            {placeholder}
          </p>
        )}
        {stagedTags.length ? (
          <div
            className="absolute inset-y-0 end-5 items-center px-2 py-2.5"
            onClick={(e) => {
              e.stopPropagation();
              setSearchBarState(true);
              setStagedTags([]);
            }}
          >
            <DeleteIcon />
          </div>
        ) : null}
        <div className="absolute inset-y-0 end-0 items-center px-2 py-2.5">
          {isSearchBarOpen ? <ArrowsUpIcon /> : <ArrowsDownIcon />}
        </div>
      </div>
      {isSearchBarOpen && (
        <>
          <div className="flex w-full flex-row border-x border-black">
            <input
              type="search"
              name="clientSearch"
              className="w-full p-2"
              placeholder="Search by tags"
              onChange={(e) => setGreatFilter(e.target.value)}
            />
            <input type="hidden" name="tags" value={stagedTags} />
            <button type="submit" className="border border-black bg-white p-2">
              <SearchIcon />
            </button>
          </div>
          <div className="flex h-max w-full flex-row flex-wrap gap-2 rounded-b border border-black bg-white p-2 ">
            {allTags
              .filter((tag) => !stagedTags.includes(tag.name))
              .filter((tag) => tag.name.includes(greatFilter))
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
