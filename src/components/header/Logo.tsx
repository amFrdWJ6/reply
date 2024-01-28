import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex flex-row">
      <Image src={"/logo.png"} alt="Logo for Reply" width={40} height={40} />
      <span className="hidden text-4xl text-secondary md:block">ply</span>
    </div>
  );
}
