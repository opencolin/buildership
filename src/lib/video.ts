export type VideoEmbed = { kind: "iframe" | "video"; src: string };

/**
 * Best-effort: turn a project's demo/video URL into an embeddable player.
 * Handles YouTube, Loom, Vimeo, Google Drive, and direct video files.
 * Returns null for anything not embeddable (live apps, social posts, repos,
 * YouTube channels, …) so the caller can fall back to a plain link.
 */
export function videoEmbed(url: string | null | undefined): VideoEmbed | null {
  if (!url) return null;
  let u: URL;
  try {
    u = new URL(url.trim());
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^www\./, "").toLowerCase();
  const seg = u.pathname.split("/").filter(Boolean);

  // YouTube — youtu.be/<id>, /watch?v=<id>, /embed/<id>, /shorts/<id>
  if (host === "youtu.be") {
    return seg[0] ? { kind: "iframe", src: `https://www.youtube.com/embed/${seg[0]}` } : null;
  }
  if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
    if (u.pathname === "/watch") {
      const id = u.searchParams.get("v");
      return id ? { kind: "iframe", src: `https://www.youtube.com/embed/${id}` } : null;
    }
    if (seg[0] === "embed" && seg[1]) return { kind: "iframe", src: `https://www.youtube.com/embed/${seg[1]}` };
    if (seg[0] === "shorts" && seg[1]) return { kind: "iframe", src: `https://www.youtube.com/embed/${seg[1]}` };
    return null; // channel / @handle / playlist
  }

  // Loom — /share/<id> or /embed/<id>
  if (host === "loom.com") {
    const m = u.pathname.match(/\/(?:share|embed)\/([a-zA-Z0-9]+)/);
    return m ? { kind: "iframe", src: `https://www.loom.com/embed/${m[1]}` } : null;
  }

  // Vimeo — vimeo.com/<numeric id>
  if (host === "vimeo.com" && /^\d+$/.test(seg[0] ?? "")) {
    return { kind: "iframe", src: `https://player.vimeo.com/video/${seg[0]}` };
  }

  // Google Drive — /file/d/<id>/...
  if (host === "drive.google.com") {
    const m = u.pathname.match(/\/file\/d\/([^/]+)/);
    return m ? { kind: "iframe", src: `https://drive.google.com/file/d/${m[1]}/preview` } : null;
  }

  // Direct video file
  if (/\.(mp4|webm|mov|m4v|ogg)$/i.test(u.pathname)) {
    return { kind: "video", src: u.toString() };
  }

  return null;
}
