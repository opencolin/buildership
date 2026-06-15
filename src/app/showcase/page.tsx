import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

// The showcase has been merged into /projects.
export default function ShowcaseRedirect() {
  redirect("/projects");
}
