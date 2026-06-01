import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BuilderShip — Countdown to June 12, finals on the bay",
    template: "%s — BuilderShip",
  },
  description:
    "BuilderShip: build an OpenClaw agent, get on the boat. Remote AI hackathon with daily office hours, counting down to June 12. Top 30 builders earn a boat day on the bay, June 14. Compete for $50K credits and a DGX Spark. Hosted by Composio, Nebius, Tavily, and OpenClaw.",
  metadataBase: new URL("https://ship.builders"),
  openGraph: {
    title: "BuilderShip — Countdown to June 12, finals on the bay",
    description:
      "Build an OpenClaw agent. 30 hand-picked builders board the yacht June 14. $50K credits and a DGX Spark for the winner. Hosted by Composio, Nebius, Tavily, and OpenClaw.",
    url: "https://ship.builders",
    siteName: "BuilderShip",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ship_builders",
    creator: "@ship_builders",
    title: "BuilderShip — Countdown to June 12, finals on the bay",
    description:
      "Build an OpenClaw agent. 30 hand-picked builders board the yacht June 14. $50K credits and a DGX Spark for the winner. Hosted by Composio, Nebius, Tavily, and OpenClaw.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const themeScript = `(function(){try{var t=localStorage.getItem('nb-theme');var dark=t==='dark'||((!t||t==='system')&&window.matchMedia('(prefers-color-scheme:dark)').matches);var url=new URL(window.location.href);var qp=url.searchParams.get('theme');if(qp==='orange'||qp==='composio'){localStorage.removeItem('bs-theme-green');}else if(qp==='green'||qp==='nebius'||qp==='default'){localStorage.setItem('bs-theme-green','1');}if(localStorage.getItem('bs-theme-nebius')==='1'||localStorage.getItem('bs-theme-default')==='1'){localStorage.setItem('bs-theme-green','1');}localStorage.removeItem('bs-theme-nebius');localStorage.removeItem('bs-theme-default');localStorage.removeItem('bs-theme-composio');var orange=localStorage.getItem('bs-theme-green')!=='1';var html=document.documentElement;if(orange){html.setAttribute('data-theme','orange');dark=true;}if(dark){html.classList.add('dark');}html.style.colorScheme=dark?'dark':'light';}catch(e){}})();`;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Trade+Winds&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
