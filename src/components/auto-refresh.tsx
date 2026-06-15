"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Keeps a force-dynamic page live: re-fetches server data on an interval so a
 * tab left open reflects DB edits without a manual reload. Pauses while the tab
 * is hidden and refreshes immediately when it becomes visible again. Client
 * state (search, filters, in-progress scores) is preserved across refreshes.
 */
export function AutoRefresh({ seconds = 30 }: { seconds?: number }) {
  const router = useRouter();
  useEffect(() => {
    const tick = () => {
      if (document.visibilityState === "visible") router.refresh();
    };
    const id = setInterval(tick, seconds * 1000);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [router, seconds]);
  return null;
}
