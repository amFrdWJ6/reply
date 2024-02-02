import Image from "next/image";
import Footer from "./reply/Footer";
import { ImageLoader } from "@/lib/utils";

type TReply = {
  id: number;
  title: string;
  fileName: string;
  tags: string;
};

export default async function Reply({ reply }: { reply: TReply }) {
  const src_path = await ImageLoader(reply.fileName);

  return (
    <figure key={reply.id} className="relative h-auto w-64 break-inside-avoid">
      <figcaption className="absolute top-0 w-full overflow-hidden truncate text-nowrap bg-primary p-1 text-sm">
        {reply.title}
      </figcaption>
      <Image src={src_path} alt="" width={256} height={256} />
      <Footer url={src_path} tags={reply.tags.split(",")} />
    </figure>
  );
}
