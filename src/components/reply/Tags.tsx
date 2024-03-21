export default function Tags({ tags }: { tags: Array<string> }) {
  const listTags = tags.map((tag) => (
    <a
      href={`/?tags=${tag}`}
      key={tag}
      className="bg-secondary p-1 text-xs text-quaternary"
    >
      {tag}
    </a>
  ));

  return (
    <div className="flex flex-row flex-wrap gap-2 bg-tertiary p-2">
      {listTags}
    </div>
  );
}
