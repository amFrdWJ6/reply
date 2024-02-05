import Pagination from "@/components/common/Pagination";
import { GetLogs } from "@/lib/db/queries";
import { ImageLoader } from "@/lib/utils";

export default async function Log({ params }: { params: { page: number } }) {
  const logs = await GetLogs(params.page);
  const nextPageLogs = await GetLogs(+params.page + +1);

  const listOfLogs = logs.map((log) => {
    return (
      <p key={log.id}>
        <span className="pr-2 text-secondary">{log.when}</span>

        <a href={`https://github.com/${log.who}`} className="text-primary">
          {log.who}
        </a>

        <span className="px-2">{log.action}</span>

        {log.tag ? (
          <a
            href={`http://localhost:3000/?tags=${log.tag}`}
            className="text-primary"
          >
            {log.tag}
          </a>
        ) : (
          <a href={ImageLoader(log.file!)} className="text-primary">
            {log.file}
          </a>
        )}
      </p>
    );
  });

  return (
    <div className="flex w-full flex-col">
      <h1 className="text-xl text-primary">Logs</h1>
      {listOfLogs}
      <Pagination
        urlPath="log"
        currentPage={params.page}
        prevPage={params.page > 0}
        nextPage={nextPageLogs.length > 0}
      />
    </div>
  );
}
