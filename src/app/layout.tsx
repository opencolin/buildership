import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nebius Builders — The operating layer for AI builder events on Nebius",
  description:
    "Hackathons, hack nights, demo nights, and workshops for AI builders — powered by Nebius Token Factory, Contree workspaces, and Nebius Serverless deploys.",
  metadataBase: new URL("https://builders.nebius.com"),
  openGraph: {
    title: "Nebius Builders",
    description: "The operating layer for AI builder events on Nebius.",
    url: "https://builders.nebius.com",
    siteName: "Nebius Builders",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
