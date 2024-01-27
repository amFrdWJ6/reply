import Image from "next/image";
import Footer from "./reply/Footer";
import { ImageLoader } from "@/lib/utils";

export default async function Reply({
  reply,
}: {
  reply: {
    id: number;
    title: string;
    fileName: string;
    tags: string;
  };
}) {
  const src_path = await ImageLoader(reply.fileName, 300, 75);

  return (
    <figure key={reply.id} className="relative h-auto w-64 break-inside-avoid">
      <figcaption className="bg-primary absolute top-0 w-full overflow-hidden truncate text-nowrap p-1 text-sm">
        {reply.title}
      </figcaption>
      <Image src={src_path} alt="" width={256} height={256} />

      <Footer url={src_path} tags={reply.tags.split(",")} />
    </figure>
  );
}
