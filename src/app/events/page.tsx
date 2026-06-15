import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

// The schedule page has been removed.
export default function EventsRedirect() {
  redirect("/");
}
