export default function Tags({
  stagedTags,
  availableTags,
  listStagedTags,
}: {
  stagedTags: string[];
  availableTags: JSX.Element[];
  listStagedTags: JSX.Element[];
}) {
  return (
    <div className="w-full shadow-xl">
      <div className="flex flex-col gap-2 rounded-t-xl border-b border-primary bg-tertiary p-4">
        <h1 className="text-2xl text-primary">Staged tags:</h1>
        <div className="flex flex-row flex-wrap gap-3">
          {stagedTags.length != 0 ? (
            listStagedTags
          ) : (
            <span className="text-quaternary">
              New reply require at least one tag!
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-b-xl bg-secondary p-4">
        <h1 className="text-2xl text-quaternary">All tags:</h1>
        <p className="flex flex-row flex-wrap gap-3">{availableTags}</p>
      </div>

      <input type="hidden" name="tags" value={stagedTags} />
    </div>
  );
}
