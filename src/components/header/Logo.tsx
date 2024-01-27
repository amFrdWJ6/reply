import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex flex-row">
      <Image src={"/logo.png"} alt="Logo for Reply" width={40} height={40} />
      <span className="text-secondary hidden text-4xl md:block">ply</span>
    </div>
  );
}
