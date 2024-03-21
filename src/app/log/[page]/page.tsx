import { redirect } from "next/navigation";
import Pagination from "@/components/common/Pagination";
import { getLogs } from "@/lib/db/queries";
import { ImageLoader } from "@/lib/utils";

const When = ({ when }: { when: string }) => (
  <span className="pr-2 text-secondary">{when}</span>
);

const Who = ({ who }: { who: string }) => (
  <a href={`https://github.com/${who}`} className="text-primary">
    {who}
  </a>
);

const What = ({ what }: { what: string }) => (
  <span className="px-2">{what}</span>
);

const Tag = ({ tag }: { tag: string }) => (
  <a
    href={`${process.env.AUTH_URL ?? "http://localhost:3000"}/?tags=${tag}`}
    className="text-primary"
  >
    {tag}
  </a>
);

const File = ({ file }: { file: string }) => (
  <a href={ImageLoader(file)} className="text-primary">
    {file}
  </a>
);

export default async function Log({ params }: { params: { page: number } }) {
  if (!(+params.page >= 0)) {
    redirect("/log/0");
  }

  const logs = await getLogs(+params.page);
  const nextPageLogs = await getLogs(+params.page + +1);

  const whoDidWhatList = logs.map((log) => {
    return (
      <div key={log.id}>
        <When when={log.when} />
        <Who who={log.who} />
        <What what={log.action} />

        {log.tag ? (
          <Tag tag={log.tag} />
        ) : log.file ? (
          <File file={log.file} />
        ) : (
          <p>nor Tag or File provided</p>
        )}
      </div>
    );
  });

  return (
    <div className="flex w-full flex-col">
      <h1 className="text-xl text-primary">Logs</h1>
      {whoDidWhatList}
      <Pagination
        urlPath="log"
        currentPage={params.page}
        prevPage={params.page > 0}
        nextPage={nextPageLogs.length > 0}
      />
    </div>
  );
}
