export default function Figure({ tags }: { tags: Array<string> }) {
  const listTags = tags.map((tag) => (
    <a
      href={`/?tags=${tag}`}
      key={tag}
      className="bg-secondary text-quaternary p-1  text-xs"
    >
      {tag}
    </a>
  ));

  return (
    <div className="bg-tertiary flex flex-row flex-wrap gap-2 p-2">
      {listTags}
    </div>
  );
}
