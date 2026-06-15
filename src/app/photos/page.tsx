import type { Metadata } from "next";
import { AppHeader } from "@/components/app-chrome";
import { PhotoGallery } from "./gallery";
import photos from "./photos.json";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Photos — BuilderShip",
  description: "Photos from BuilderShip · Nebius & Composio, June 14, 2026.",
};

const ALBUM_URL =
  "https://photos.google.com/share/AF1QipP5XF-YG8aPeY1fiZ5hOIWfuvpwYXH-jSKhCgxlUMwanUQ_IjxYxv-ne9aZTwpjOg?key=NF9RLUFOOWZZa1A4SUV6NjlONzMwMUxSOXFKWG1B";

export default function PhotosPage() {
  return (
    <>
      <AppHeader links={[]} />
      <main className="bg-ink-50 dark:bg-ink-800">
        <section className="border-b border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
          <div className="container-page py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
              Gallery
            </p>
            <h1 className="h-display mt-1 text-3xl font-bold tracking-tight text-ink-900 dark:text-ink-50">
              Photos
            </h1>
            <p className="mt-2 max-w-2xl text-ink-600 dark:text-ink-300">
              Builder Ship · Nebius &amp; Composio — June 14, 2026. {photos.length}{" "}
              moments from the day on the boat. Tap any photo to view it larger.
            </p>
            <a
              href={ALBUM_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-navy mt-5 inline-flex"
            >
              View full album on Google Photos →
            </a>
          </div>
        </section>

        <section className="section">
          <div className="container-page">
            <PhotoGallery photos={photos} />
          </div>
        </section>
      </main>
    </>
  );
}
