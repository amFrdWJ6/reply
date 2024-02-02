import { Dispatch, SetStateAction } from "react";
import StagedTag from "@/components/common/form/StagedTag";

export default function StagedTags({
  stagedTags,
  setStagedTags,
}: {
  stagedTags: string[];
  setStagedTags: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <>
      {stagedTags.length > 0 && (
        <div className="flex flex-col rounded-b bg-primary p-2 text-white">
          <h1 className=" text-2xl text-tertiary">Staged tags:</h1>
          <div className="flex flex-row flex-wrap gap-2">
            {stagedTags.map((tag) => (
              <StagedTag
                key={tag}
                tag={tag}
                onClick={() => {
                  setStagedTags((prev) => [
                    ...prev.filter((stagedTag) => stagedTag !== tag),
                  ]);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
