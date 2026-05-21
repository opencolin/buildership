"use client";

import { useState } from "react";

const SHARE_TITLE = "BuilderShip — Countdown to June 12, finals on the bay";
const SHARE_TEXT =
  "Remote AI hackathon with daily office hours, counting down to June 12. Top 40 builders win a boat day on the bay, June 14. Compete for $50K credits and a DGX Spark.";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    const url = typeof window !== "undefined" ? window.location.origin : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url });
        return;
      } catch {
        // user cancelled or share failed; fall through to clipboard
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // ignore
      }
    }
  }

  return (
    <button type="button" onClick={handleClick} className="btn-outline text-sm">
      {copied ? "Link copied" : "Invite / Share"}
    </button>
  );
}
