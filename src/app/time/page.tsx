import { redirect } from "next/navigation";

/** Legacy leadership URL — About Us is at /sobre. */
export default function TimeRedirect() {
  redirect("/sobre");
}
