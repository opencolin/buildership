import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

// /judges has moved to /projects.
export default function JudgesRedirect() {
  redirect("/projects");
}
