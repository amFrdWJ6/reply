import { redirect } from "next/navigation";

export default async function LogRedirect() {
  redirect("/log/0");
}
