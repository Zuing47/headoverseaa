import { redirect } from "next/navigation";

/** Legacy EN home — English is now at `/`. */
export default function EnHomeRedirect() {
  redirect("/");
}
