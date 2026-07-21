import { redirect } from "next/navigation";

/** Legacy leadership URL — About Us is at /en/about. */
export default function LeadershipRedirect() {
  redirect("/en/about");
}
